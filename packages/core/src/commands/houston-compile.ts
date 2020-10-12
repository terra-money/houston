#!/usr/bin/env node
const commander = require("commander");
const program = new commander.Command();
import compile from "@terra-money/houston-compile";

program
  .command("compile [name]")
  .name("compile")
  .usage("[name]")
  .description("create a Houston project")
  .action(compile)
  .parse(process.argv);
