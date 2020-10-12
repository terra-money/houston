import HoustonConfig from "@terra-money/houston-config";
import { time } from "console";
import { runCommand } from "./compile";
const Ora = require("ora");

export const compile = async (name: any) => {
  /**
   * Initializes starter project for cosmwasm development
   *
   * @param option
   *
   * @returns none
   */
  let path = require("path");
  let fse = require("fs-extra");
  const config = HoustonConfig.detect();
  let contracts = [];
  const { events } = config;
  // get contract directory
  fse.ensureDirSync(config.working_directory);
  const contracts_directory = `${config.working_directory}/contracts`;

  if (name === undefined) {
    contracts = fse.readdirSync(contracts_directory);
    if (contracts.length === 0) {
      events.emit("compile:nothingToCompile");
    }
  } else {
    contracts.push(name);
  }

  events.emit("compile:start");
  const promises = contracts.map((subDir: string) => {
    return async () => {
      const config = HoustonConfig.detect();
      const { events } = config;
      // Compile with cargo in current working directory
      const contracts_directory = `${config.working_directory}/contracts`;
      let targetDir = `${contracts_directory}/${subDir}`;
      try {
        events.emit("compile:sourcesToCompile", {
          sourceDirName: subDir,
        });
        await runCommand("RUSTFLAGS='-C link-arg=-s' cargo wasm", {
          cwd: targetDir,
          events,
          reason: "compile",
        });
      } catch (error) {
        // Somehow all cargo outputs come out as errors.
        // Smart contract compilation errors are handled with stdout datas
        if (error.compile_error) {
          let { errors } = error;
          events.emit("compile:fail", { contractDirectory: targetDir, errors });
          return;
        }
        let { warnings } = error;
        events.emit("compile:warn", { contractDirectory: targetDir, warnings });
        let spinner = new Ora({
          text: `Generating schemas...`,
          color: "blue",
        });
        spinner.start();
        await runCommand("cargo schema", {
          cwd: targetDir,
          events,
          reason: "schema",
          compile_error: error.compile_error,
        }).catch((error) => {
          spinner.text = "Successfully generated schemas";
          spinner.succeed();
          spinner = null;
          events.emit("compile:succeed", {
            wasmBuildDirectory: `${config.working_directory}/wasm`,
            schemaBuildDirectory: `${
              config.working_directory
            }/schemas/${subDir}_schema`,
          });

          return;
        });
      }
    };
  });
  promises.reduce((t: any, f: any) => t.then(f), Promise.resolve()).then(() => {
    process.exit(0);
  });
};

export default compile;
