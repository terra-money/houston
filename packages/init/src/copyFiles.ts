const path = require("path");
const fse = require("fs-extra");
const { promptOverwrites } = require("./promptOverwrites");

export const copyFiles = async (
  destination: any,
  options: { force: any; logger: any; events: any }
) => {
  fse.ensureDirSync(destination);
  const { force, logger, events } = options;
  const sourcePath = path.join(__dirname, "../initSource");
  const projectFiles = fse.readdirSync(sourcePath);
  const destinationContents = fse.readdirSync(destination);
  const newContents = projectFiles.filter(
    (filename: any) => !destinationContents.includes(filename)
  );

  const contentCollisions = projectFiles.filter((filename: any) =>
    destinationContents.includes(filename)
  );

  let shouldCopy: any[];

  if (force) {
    shouldCopy = [];
  } else {
    const overwriteContents = await promptOverwrites(contentCollisions, logger);
    shouldCopy = [...newContents, ...overwriteContents];
  }

  await events.emit("init:copyingProjectFiles", {
    destinationPath: destination,
  });

  fse.copySync(sourcePath, destination);
};
