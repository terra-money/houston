# Houston 🚀

<br>
<p align="center">

<img src="https://github.com/terra-project/houston/blob/master/assets/logo.png" width="800">
<br><br>
<a href="https://www.npmjs.org/package/@terra-money/houston"><img src="https://img.shields.io/npm/v/@terra-money/houston?style=flat-square&logo=npm&label=npm"></a>
<a href="https://www.npmjs.org/package/@terra-money/houston"><img alt="npm" src="https://img.shields.io/npm/dw/@terra-money/houston?color=orange&label=npm%20downloads"></a>
<a href="https://www.npmjs.org/package/@terra-money/houston"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@terra-money/houston?label=package%20size"></a>
<br>
<a href="https://www.npmjs.org/package/@terra-money/houston"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square&logo=github"></a>
<a href="https://www.npmjs.org/package/@terra-money/houston"><img src="https://img.shields.io/npm/l/@terra-money/houston"></a>

<br>
<a href="https://npmjs.com/package/@terra-money/houston"><img src="https://github.com/terra-project/houston/blob/master/assets/nodeico.svg"></a>

</p>

<p align="center"><strong>Houston is a development environment, testing framework and smart contract pipeline for Terra, aiming to make life as a Terra developer easier.</strong>
</p>

<p align="center"><strong>
** 🚨 Houston is now currently in Beta version. Completed version is not ready yet. use it with your own caution. **</strong>
</p>

## Features

- Built-in smart contract compilation, linking, deployment and wasm binary management.
- Configurable build pipeline with support for custom build processes.
- Scriptable deployment & migrations framework.
- Network management for deploying to Terra's public & private networks.
- Instant rebuilding of webassembly binaries during development.

<br>

## Installation

_Houston will gracefully setup **a stable version of rust compiler** and **wasm target** to develop smart contracts on Terra blockchain._

Grab the latest version of [NPM](https://www.npmjs.com/package/@terra-money/houston):

```sh
npm install -g @terra-money/houston
```

## Documentation

To get more information on Houston, check out the documentation.

<a href="https://terraform-labs.gitbook.io/houston/"><img src="https://github.com/terra-project/houston/blob/master/assets/gitbook.png" width="300"></a>

## Kickstart

**Houston has five commands to help smart contract development:**

`init`: for project initialization

`compile`: for compiling contracts

`migrate`: for deploying contracts to blockchain

`add`: for adding or downloading contract cargo projects

To get help on each command, run `houston help <command>`.

### Initialize project

```bash
mkdir myProject
cd myProject
houston init
```

Once this operation is completed, you'll now have a project structure with the following items:

```
myProject/
  |- contracts
  | |- starter
  |- wasm
  |- schema
  |- migrations
  | |- 0_deploy_starter.ts 
  |- package.json
  |- tsconfig.json
```

`contracts`: directory for cosmwasm contracts

`wasm`: wasm binaries of compiled contracts

`schema`: generated schema of compiled contracts

`test`: test script directory for contract interaction

`starter`: a starter cosmwasm contract cargo

`package.json`: package manager for migration scripts

`tsconfig.json`: Typscript configuration file for migration scripts

### Compile contracts

Set current working directory inside of the project directory

```shell
houston compile [contractName]
```

All contract cargos in the `contracts` directory will be compiled as default.

`[contractName]` is an optional parameter to specify which cargo to compile with the command.

Once this operation is initiated, you'll see the event in the console as below:

```shell
🛠 Compiling your contracts...
===========================
```

After comilation of each contract, you'll get the directories for compiled results as below:

```shell
> WASM written to /Users/.../<project folder>/wasm
> Schemas written to /Users/.../<project folder>/schemas/<contract name>_schema
```

Compiled WASM binaries will be placed in `wasm` directory as `<contract name>`.wasm.
Generated collection of schema json files will be placed as a directory with the name `<contract name>-schema` in `schemas` directory.

You will have the new project structure with the following items:

```
myProject/
  |- contracts
  | |- starter
  |- wasm
  | |- starter.wasm
  |- schema
  | |- starter-schema
  |   |- config.json
  |   |- ....
  | migrations
  | |- 0_deploy_starter.ts
  | package.json
  | tsconfig.json
```

### Running migrations

run your migraion scripts in `migrations` folder after installing packages with the following command:

```shell
npm install
houston migrate 
```

## Contributions

<a href="https://github.com/terra-project/houston/graphs/contributors"><img src="https://img.shields.io/github/contributors/terra-project/houston"></a>

Contributions are welcome to this project for helping Terra developers to build their dapps.
To contribute to this project, you can check [CONTRIBUTING.md](https://github.com/terra-project/houston/blob/master/CONTRIBUTING.md) for the detail.

Or you can join the Terra's official discord channel and discuss new ideas or addition.

<a href="https://discord.com/channels/464241079042965516/752962496113147995"><img src="https://img.shields.io/discord/464241079042965516?color=blue&logo=discord"></a>
<br>

## License

This software is licensed under the Apache 2.0 license. See [LICENSE](https://github.com/terra-project/houston/blob/master/LICENSE) for full disclosure.

© 2020 Terraform Labs, PTE.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://terra.money/"><img src="http://terra.money/logos/terra_logo.svg" align="center" width=200/></a>
</p>
<div align="center">
  <sub><em>Powering the innovation of money.</em></sub>
</div>


