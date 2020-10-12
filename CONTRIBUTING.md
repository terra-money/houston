# Introduction and prerequisites

Truffle uses lerna to manage multi-package repositories. Each Truffle module is defined in its own npm package in the `packages/` directory.

The entry point of these modules is `@terra-money/houston`. This is where the command line parser is setup.

Install lerna:

```shell
$ npm install -g lerna
$ npm install -g yarn
```

# The command flow

The heart of Houston lies in the `@terra-money/houston-core` package. Whenever a command
is run, `packages/core/commands` gets run with everything following `houston`
(on the command line) being passed in as arguments. In other words, if you run
`houston init --force myDir`, then `packages/core/src/commands/houston.js` gets run and routes to the separate binary with subcommand
"init" and "--force myDir" as arguments.

Throughout the course of running `packages/core/src/commands/houston.js`, Houston parses out what
commands and options the user has provided, routes to the subcommand binary, and the subcommand binary parses the argument. You can find all of the
specific subcommand files (one file for each command) at
`packages/core/src/commands`. From the each command file you should be
able to trace the command lifecycle to libraries and modules in `@terra-money/houston-core`
as well as other packages in the monorepo.

# Add a new command in houston

### Create a new lerna package

```shell
$ lerna create mycmd
```

### Add the package to `@terra-money/houston-core`

```shell
$ lerna add mycmd --scope=@terra-money/houston-core
```

### Create a new command in `@terra-money/houston-core`

Create a new file in `packages/core/src/commands/`, let's call it `houston-mycmd.ts`.

```javascript
#!/usr/bin/env node
const commander = require("commander");
const program = new commander.Command();
import myCmd from "@terra-money/houston-myCmd";

program
  .command("compile [contracts]")
  .name("myCmd")
  .description("myCmd's description")
  .action(myCmd)
  .parse(process.argv);
```

### Link it from the commands/index.js file

```typescript
const commander = require("commander");
const program = new commander.Command();
import { showError, suggestCommand } from "../utils/logger.util";

export const houston = program
  .version("0.0.1")
  .description(
    "A world-class development framework for cosmwasm smart contracts"
  )
  .name("houston")
  .usage("<command> [arguments]")
  .command("init [options]", "create a Houston project", {
    executableFile: "./commands/houston-init",
  })
  .command("compile [contracts]", "compile smart contract", {
    executableFile: "./commands/houston-compile",
  })
  .command("migrate [scripts]", "run migration scripts", {
    executableFile: "./commands/houston-migrate",
  })
  .command("myCmd", "myCmd's description", {
    executableFile: "./commands/houston-myCmd",
  })
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    const availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name()
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });
```

From there, you should see it in the help screen:

```shell
$ cd packages/core/lib
$ node index.js
Houston v0.2.0-beta.1 - a development framework for Terra

Usage: houston <command> [options]

Commands:
  mycmd     Run mycmd
[...]
```

### Write your module/command

The setup is done, you can now write your command and organize your module as you want in: `packages/houston-mycmd/`. You can have a look at `packages/add/` which is a good starting example to follow.
