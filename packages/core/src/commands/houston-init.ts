#!/usr/bin/env node
const commander = require("commander");
const program = new commander.Command();
import initProject from "@terra-money/houston-init";

program
  .command("[options]")
  .name("init")
  .usage("[options]")
  .option("--force <dir>", "overwrite forcefully in the directory")
  .description("create a Houston project")
  .action(initProject)
  .parse(process.argv);
