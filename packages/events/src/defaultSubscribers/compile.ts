import { runInThisContext } from "vm";

const OS = require("os");
const Ora = require("ora");

export default {
  initialization: function() {
    this.logger = console;
    this.ora = null;
  },
  handlers: {
    "compile:start": [
      function() {
        this.logger.log(OS.EOL + `🛠 Compiling your contracts...`);
        this.logger.log(`===========================`);
      },
    ],
    "compile:fail": [
      function({ contractDirectory, errors }) {
        this.logger.log(
          OS.EOL + `> 😱 Compilation failed at ${contractDirectory}` + OS.EOL
        );
        errors.forEach((err) => {
          this.logger.log(err);
        });
      },
    ],
    "compile:warn": [
      function({ contractDirectory, warnings }) {
        this.logger.log(
          OS.EOL +
            `> ⚠️ Compilation warnings encountered at ${contractDirectory}` +
            OS.EOL
        );
        warnings.forEach((warn) => {
          this.logger.log(warn);
        });
      },
    ],
    "compile:succeed": [
      function({ wasmBuildDirectory, schemaBuildDirectory }) {
        // TODO: add compilers info in event
        if (true /*Object.keys(compilersInfo).length > 0*/) {
          this.logger.log(`> WASM written to ${wasmBuildDirectory}`);
          this.logger.log(`> Schemas written to ${schemaBuildDirectory}`);
        }
      },
    ],
    "compile:sourcesToCompile": [
      function({ sourceDirName }) {
        if (!sourceDirName) return;
        this.logger.log("> 🔨 Compiling " + sourceDirName);
      },
    ],
    "compile:nothingToCompile": [
      function() {
        this.logger.log(
          `> 📭 No contract cargos in contracts folder, there is nothing to compile.`
        );
      },
    ],
  },
};
