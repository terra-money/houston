import { Command } from "commander";
function unbox(program: Command) {
  program
    .command("unbox [cargos]", "download cargo from registry")
    .action((cargos: any) => {
      unboxCargos(cargos);
    });
}

module.exports = unbox;

export const unboxCargos = (cargos: any) => {
  /**
   * Downloads pre-packaged project code from the Houston box registry
   *
   * @param none
   *
   * @returns none
   */
  // check if there is a box in the registry
  // clone houston cargo repo from www.github.com/terra-project/houston-starter
};
