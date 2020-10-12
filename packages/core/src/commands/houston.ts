const commander = require("commander");
const program = new commander.Command();
import { showError, suggestCommand } from "../utils/logger.util";

export const houston = program
  .version("0.0.4")
  .description(
    "A world-class development framework for cosmwasm smart contracts"
  )
  .name("houston")
  .usage("<command> [arguments]")
  .command("init [options]", "create a Houston project", {
    executableFile: "./commands/houston-init",
  })
  .command("add [cargos]", "add a contract cargo to the project", {
    executableFile: "./commands/houston-add",
  })
  .command("compile [contracts]", "compile smart contracts", {
    executableFile: "./commands/houston-compile",
  })
  .command("migrate [scripts]", "run migration scripts", {
    executableFile: "./commands/houston-migrate",
  })
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    const availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name()
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });
