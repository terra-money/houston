import HoustonError from "houston-error";

// HACK: string comparison seems to be only way to identify being unable to
// connect to RPC node.
const NOT_CONNECTED_MESSAGE = 'Invalid JSON RPC response: ""';

class ProviderError extends HoustonError {
  constructor(message: string, options) {
    super(message, options);
    if (message === NOT_CONNECTED_MESSAGE) {
      message = buildMessage(options);
    }
    this.message = message;
  }
}

const buildMessage = (options: { host: any; port: any; network_id: any }) => {
  const { host, port, network_id } = options;
  let message: string;
  if (host) {
    message =
      "\nCould not connect to your Terra client with the following parameters:\n" +
      `    - host       > ${host}\n` +
      `    - port       > ${port}\n` +
      `    - network_id > ${network_id}\n`;
  } else {
    message = "\nCould not connect to your Terra client.\n";
  }

  message +=
    "Please check that your Terra client:\n" +
    "    - is running\n" +
    '    - is accepting RPC connections (i.e., "--rpc" option is used in terrad)\n' +
    "    - is accessible over the network\n" +
    "    - is properly configured in your Houston configuration file (houston-config.js)\n";
  return message;
};

export default ProviderError;
