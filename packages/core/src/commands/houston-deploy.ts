import { Command } from "commander";

function deploy(program: Command) {
  program
    .command("test [scripts]", "execute test scripts")
    .action((scripts: any) => {
      deployContracts(scripts);
    });
}

module.exports = deploy;

export const deployContracts = (contracts: any) => {
  /**
   * Deploys a smart contract cargo in the contracts/ directory
   *
   * @param contract - array of contract names to compile
   *
   * @returns none
   */
  // if contracts is null
  if (contracts === "undefined") {
    // go to contracts/ directory

    // get subdirectory list of contracts/
    // TODO: replace [] with subdirectories
    let smartContracts: any[] = [];
    // compile all of them
    smartContracts.map((contract: any) => {
      // go to wasm/ directory
      // execute docker command to compile to wasm file
      // move compiled wasm fle to wasm/ directory
    });
  } else {
    contracts.map((contract: any) => {
      // go to wasm/ directory
      // execute docker command to compile to wasm file
      // move compiled wasm fle to wasm/ directory
    });
  }
};
