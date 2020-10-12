const OS = require("os");

export default {
  initialization: function() {
    this.logger = console;
  },
  handlers: {
    "add:start": [
      function() {
        this.logger.log(`${OS.EOL}🎅 Delivering Cargo from your request...`);
        this.logger.log(`================`);
      },
    ],
    "add:smartContractCargo": [
      function({ destinationPath }) {
        this.logger.log(
          `${OS.EOL}> 🛷 Placing smart contract cargo to ${destinationPath}`
        );
      },
    ],
    "add:succeed": [
      function() {
        this.logger.log(
          `${OS.EOL} 🏠 Cargo is delivered to your project, Ready to launch!${
            OS.EOL
          }`
        );
      },
    ],
    "add:fail": [
      function({ error }) {
        this.logger.log(
          `${OS.EOL} 🌪 Something went wrong while getting files!`
        );
        this.logger.log(`${error}${OS.EOL}`);
      },
    ],
  },
};
