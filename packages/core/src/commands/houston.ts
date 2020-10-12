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
  .command("unbox [cargos]", "download cargo from registry", {
    executableFile: "./commands/houston-unbox",
  })
  .command("compile [contracts]", "compile smart contract", {
    executableFile: "./commands/houston-compile",
  })
  .command("deploy [contracts]", "deploy smart contract", {
    executableFile: "./commands/houston-deploy",
  })
  .command("test [scripts]", "execute test scripts", {
    executableFile: "./commands/houston-test",
  })
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    const availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name()
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });
