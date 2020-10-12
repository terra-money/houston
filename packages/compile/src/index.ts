import HoustonConfig from "@terra-money/houston-config";
import { runCommand } from "./compile";

export const compile = (option: any) => {
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
  const contracts_directory = path.join(config.working_directory, "contracts");

  if (option === undefined) {
    contracts = fse.readdirSync(contracts_directory);
    if (contracts.length === 0) {
      events.emit("compile:nothingToCompile");
    }
  }

  events.emit("compile:start");
  contracts.map(async (subDir: string) => {
    // Compile with cargo in current working directory
    let targetDir = `${contracts_directory}/${subDir}`;
    try {
      events.emit("compile:sourcesToCompile", { sourceDirName: subDir });
      await runCommand("cargo build --release", {
        cwd: targetDir,
        events,
      });
    } catch (error) {
      events.emit("compile:fail", { contractDirectory: targetDir });
      return;
    }
    events.emit("compile:succeed", {
      wasmBuildDirectory: `${config.working_directory}/wasm`,
      schemaBuildDirectory: `${
        config.working_directory
      }/schemas/${subDir}_schemas`,
    });
  });
};

export default compile;
