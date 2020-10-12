#!/usr/bin/env node
const commander = require("commander");
const program = new commander.Command();
import migrate from "@terra-money/houston-migrate";

program
  .command("migrate [name]")
  .name("migrate")
  .usage("[name]")
  .description("run migration scripts")
  .action(migrate)
  .parse(process.argv);
