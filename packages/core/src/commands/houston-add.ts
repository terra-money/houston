#!/usr/bin/env node
const commander = require("commander");
const program = new commander.Command();
import addProject from "@terra-money/houston-add";

program
  .command("<name> [options]")
  .name("init")
  .usage("[options]")
  .option("--force <dir>", "overwrite forcefully in the directory")
  .description("create a Houston project")
  .action(addProject)
  .parse(process.argv);
