const debug = require("debug")("provider");
const wrapper = require("./wrapper");
const DEFAULT_NETWORK_CHECK_TIMEOUT = 5000;
import { LCDClient } from "@terra-money/terra.js";

export default {
  wrap: function (provider, options) {
    return wrapper.wrap(provider, options);
  },

  create: function (options) {
    const provider = this.getProvider(options);
    return this.wrap(provider, options);
  },

  getProvider: function (options): LCDClient {
    let provider;
    if (options.provider && typeof options.provider === "function") {
      provider = options.provider();
    } else if (options.provider) {
      provider = options.provider;
    } else if (options.websockets || /^wss?:\/\//.test(options.url)) {
      provider = new LCDClient(
        options.url || "ws://" + options.host + ":" + options.port
      );
    } else {
      provider = new LCDClient(
        options.url || `http://${options.host}:${options.port}`
      );
    }
    return provider;
  },

  testConnection: function (options) {
    let networkCheckTimeout, networkType;
    const { networks, network } = options;
    if (networks && networks[network]) {
      networkCheckTimeout =
        networks[network].networkCheckTimeout || DEFAULT_NETWORK_CHECK_TIMEOUT;
      networkType = networks[network].type;
    } else {
      networkCheckTimeout = DEFAULT_NETWORK_CHECK_TIMEOUT;
    }
    const provider: LCDClient = this.getProvider(options);
    return new Promise((resolve, reject) => {
      const noResponseFromNetworkCall = setTimeout(() => {
        const errorMessage =
          "There was a timeout while attempting to connect to the network." +
          "\n       Check to see that your provider is valid.\n       If you " +
          "have a slow internet connection, try configuring a longer " +
          "timeout in your Houston config. Use the " +
          "networks[networkName].networkCheckTimeout property to do this.";
        throw new Error(errorMessage);
      }, networkCheckTimeout);

      let networkCheckDelay = 1;
      const networkCheck = setTimeout(() => {
        setTimeout(async () => {
          try {
            await provider.apiRequester.get("1");
            clearTimeout(noResponseFromNetworkCall);
            clearTimeout(networkCheck);
            return resolve(true);
          } catch (error) {
            console.log(
              "> Something went wrong while attempting to connect " +
                "to the network. Check your network configuration."
            );
            clearTimeout(noResponseFromNetworkCall);
            clearTimeout(networkCheck);
            return reject(error);
          }
        }, networkCheckDelay);
      }, networkCheckDelay);
    });
  },
};
