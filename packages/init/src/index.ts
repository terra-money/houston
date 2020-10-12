import HoustonConfig from "@terra-money/houston-config";

export const initProject = (option: any) => {
  /**
   * Initializes starter project for cosmwasm development
   *
   * @param option
   *
   * @returns none
   */
  const { copyFiles } = require("./copyFiles");
  let fse = require("fs-extra");
  const config = HoustonConfig.default();

  let destinationPath;
  if (option.force && option.force.length > 0) {
    destinationPath = option.force;
    fse.ensureDirSync(destinationPath);
  } else {
    destinationPath = config.working_directory;
  }

  const { events } = config;
  events.emit("init:start");
  copyFiles(destinationPath, config)
    .then(async () => {
      await events.emit("init:succeed");
    })
    .catch(async (error: any) => {
      await events.emit("init:fail", { error });
    });
};

export default initProject;
