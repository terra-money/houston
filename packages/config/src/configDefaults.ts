import * as path from "path";
import HoustonConfig from "./";
import assignIn from "lodash.assignin";
import { config } from "process";
const Provider = require("@terra-money/houston-provider");

export const getInitialConfig = ({
  houstonDirectory,
  workingDirectory,
  network,
}: {
  houstonDirectory?: string;
  workingDirectory?: string;
  network?: string;
}) => {
  const houston_directory =
    houstonDirectory || path.resolve(path.join(__dirname, "../"));
  const working_directory = workingDirectory || process.cwd();

  return {
    houston_directory,
    working_directory,
    network,
    networks: {},
    verboseRpc: false,
    build: null,
    logger: console,
    artifactor: null,
    from: null,
  };
};

export const configProps = ({
  configObject,
}: {
  configObject: HoustonConfig;
}) => {
  const resolveDirectory = (value: string): string =>
    path.resolve(configObject.working_directory, value);

  const defaultTXValues = { from: null }; // 20 gwei,

  return {
    // These are already set.
    truffle_directory() {},
    working_directory() {},
    network() {},
    networks() {},
    verboseRpc() {},
    build() {},
    artifactor() {},
    logger() {},
    contracts_build_directory: {
      default: () => path.join(configObject.working_directory, "wasm"),
      transform: resolveDirectory,
    },
    schemas_directory: {
      default: () => path.join(configObject.working_directory, "schemas"),
    },
    contracts_directory: {
      default: () => path.join(configObject.working_directory, "contracts"),
      transform: resolveDirectory,
    },
    migrations_directory: {
      default: () => path.join(configObject.working_directory, "migrations"),
      transform: resolveDirectory,
    },
    migrations_file_extension_regexp() {
      return /^\.(js|ts|es6?)$/;
    },
    test_directory: {
      default: () => path.join(configObject.working_directory, "test"),
      transform: resolveDirectory,
    },
    test_file_extension_regexp() {
      return /.*\.(js|ts|es|es6|jsx|sol)$/;
    },
    network_id: {
      get() {
        try {
          return configObject.network_config.network_id;
        } catch (e) {
          return null;
        }
      },
      set() {
        throw new Error(
          "Do not set config.network_id. Instead, set config.networks and then config.networks[<network name>].network_id"
        );
      },
    },
    network_config: {
      get() {
        const network = configObject.network;

        if (network === null || network === undefined) {
          throw new Error("Network not set. Cannot determine network to use.");
        }

        let config = configObject.networks[network];

        if (config === null || config === undefined) {
          config = {};
        }

        config = assignIn({}, config);

        return config;
      },
    },
    from: {
      get() {
        try {
          return configObject.network_config.from;
        } catch (e) {
          return defaultTXValues.from;
        }
      },
      set() {
        throw new Error(
          "Don't set config.from directly. Instead, set config.networks and then config.networks[<network name>].from"
        );
      },
    },
    provider: {
      get() {
        if (!configObject.network) {
          return null;
        }

        const options = configObject.network_config;
        options.verboseRpc = configObject.verboseRpc;

        return Provider.create(options);
      },
      set() {
        throw new Error(
          "Don't set config.provider directly. Instead, set config.networks and then set config.networks[<network name>].provider"
        );
      },
    },
  };
};
