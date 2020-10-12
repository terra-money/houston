import HoustonConfig from "@terra-money/houston-config";
import { runCommand } from "./migrate";

export const migrate = async (option: any) => {
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
  let migrations = [];
  const { events } = config;
  // get contract directory
  fse.ensureDirSync(config.working_directory);
  const migrations_directory = path.join(
    config.working_directory,
    "migrations"
  );

  if (option === undefined) {
    migrations = fse.readdirSync(migrations_directory);
    if (migrations.length === 0) {
      events.emit("migrate:nothingToMigrate");
    }
  }

  events.emit("migrate:start");
  const promises = migrations.sort().map((migrationFile: string) => {
    return async () => {
      const config = HoustonConfig.detect();
      const { events } = config;
      // Compile with cargo in current working directory
      const migrations_directory = `${config.working_directory}/migrations`;
      try {
        events.emit("migrate:sourceToMigrate", {
          sourceToMigrate: migrationFile,
        });
        await runCommand(`ts-node ${migrationFile}`, {
          cwd: migrations_directory,
          events,
        });
      } catch (error) {
        let { compile_error } = error;
        if (compile_error) {
          process.exit(1);
        }
        return;
      }
    };
  });
  promises.reduce((t: any, f: any) => t.then(f), Promise.resolve()).then(() => {
    const config = HoustonConfig.detect();
    const { events } = config;
    events.emit("migrate:succeed").then(() => {
      process.exit(0);
    });
  });
};

export default migrate;
