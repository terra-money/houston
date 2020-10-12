import HoustonConfig from "@terra-money/houston-config";

export const addProject = (name: any, options: any) => {
  /**
   * Initializes starter project for cosmwasm development
   *
   * @param options options for the command
   *
   * @returns none
   */
  if (name === undefined) {
    Error("Name of the new contract to add is not specified");
  }
  const { copyFiles, changeName } = require("./processes");
  let fse = require("fs-extra");
  const config = HoustonConfig.default();

  let destinationPath;
  if (options.force && options.force.length > 0) {
    destinationPath = options.force;
    fse.ensureDirSync(destinationPath);
  } else {
    destinationPath = config.contracts_directory;
  }

  const { events } = config;
  events.emit("add:start");
  copyFiles(destinationPath, config)
    .then(async () => {
      if (name != undefined) {
        changeName(destinationPath, name);
      }
      await events.emit("add:succeed");
    })
    .catch(async (error: any) => {
      await events.emit("add:fail", { error });
    });
};

export default addProject;
