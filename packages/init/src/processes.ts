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

export const changeName = (projectDir: string, name: string) => {
  const newDir = `${projectDir}/contracts/${name}`;
  // Change contract directory name
  const contractDir = `${projectDir}/contracts/starter`;
  fse.rename(contractDir, newDir, function(err) {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const tomlFile = `${newDir}/Cargo.toml`;
  const schemaFile = `${newDir}/examples/schema.rs`;

  // Change contract's Cargo.toml file
  fse.readFile(tomlFile, "utf-8", function(err, data) {
    if (err) throw err;

    var newValue = data.replace("starter", name);

    fse.writeFile(tomlFile, newValue, "utf-8", function(err, data) {
      if (err) throw err;
    });
  });
  // Change contract's schema generation script
  fse.readFile(schemaFile, "utf-8", function(err, data) {
    if (err) throw err;

    var newValue = data.replace("starter", name).replace("starter", name);

    fse.writeFile(schemaFile, newValue, "utf-8", function(err, data) {
      if (err) throw err;
    });
  });
};
