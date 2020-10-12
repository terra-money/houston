import HoustonConfig from "@terra-money/houston-config";

export const initProject = (name: any, options: any) => {
  /**
   * Initializes starter project for cosmwasm development
   *
   * @param options options for the command
   *
   * @returns none
   */
  const { copyFiles, changeName } = require("./processes");
  let fse = require("fs-extra");
  const config = HoustonConfig.default();
  let destinationPath;
  if (options.force && options.force.length > 0) {
    destinationPath = options.force;
    fse.ensureDirSync(destinationPath);
  } else {
    destinationPath = config.working_directory;
  }

  const { events } = config;
  events.emit("init:start");
  copyFiles(destinationPath, config)
    .then(() => {
      if (name) {
        changeName(destinationPath, name);
      }
      events.emit("init:succeed");
    })
    .catch((error: any) => {
      events.emit("init:fail", { error });
    });
};

export default initProject;
