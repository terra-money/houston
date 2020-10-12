const OS = require("os");

export default {
  initialization: function() {
    this.logger = console;
  },
  handlers: {
    "compile:start": [
      function() {
        this.logger.log(OS.EOL + `Compiling your contracts...`);
        this.logger.log(`===========================`);
      },
    ],
    "compile:fail": [
      function(contractDirectory) {
        this.logger.log(`> Compilation failed at ${contractDirectory}`);
      },
    ],
    "compile:succeed": [
      function({ wasmBuildDirectory, schemaBuildDirectory }) {
        // TODO: add compilers info in event
        if (true /*Object.keys(compilersInfo).length > 0*/) {
          this.logger.log(`> WASM written to ${wasmBuildDirectory}`);
          this.logger.log(`> Schemas written to ${schemaBuildDirectory}`);
          this.logger.log(`> Compiled successfully using:`);
          /*
          const maxLength = Object.keys(compilersInfo)
            .map((name) => name.length)
            .reduce((max, length) => (length > max ? length : max), 0);

          for (const name in compilersInfo) {
            const padding = " ".repeat(maxLength - name.length);

            this.logger.log(
              `   - ${name}:${padding} ${compilersInfo[name].version}`
            );
          }
          */
        }
        this.logger.log();
      },
    ],
    "compile:sourcesToCompile": [
      function({ sourceDirName }) {
        if (!sourceDirName) return;
        this.logger.log("> Compiling " + sourceDirName);
      },
    ],
    // TODO: Aggregate warnings / errors when working with multiple cosmwasm cargos
    "compile:warnings": [
      function({ warnings }) {
        this.logger.log("> Compilation warnings encountered:");
        this.logger.log(`${OS.EOL}    ${warnings.join()}`);
      },
    ],
    "compile:nothingToCompile": [
      function() {
        this.logger.log(
          `> Everything is up to date, there is nothing to compile.`
        );
      },
    ],
  },
};
