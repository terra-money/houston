import { red, green, cyan, yellow } from "kleur";
import * as figlet from "figlet";
import * as similiarity from 'string-similarity';

import { ConsoleMessage } from "../models/console-message";

const newLine = "\n";

export const showBanner = (): void => {
  const chalk = require("chalk");
  console.log(
    chalk.hex("#026DD9").bold(
      figlet.textSync("houston", {
        horizontalLayout: "full",
        font: "Sub-Zero",
      })
    )
  );
};

export const showError = (message: string | Error): void => {
  console.error(red(ConsoleMessage.ERROR) + message);
};

export const showSuccess = (message: string): void => {
  console.log(green(ConsoleMessage.SUCCESS) + message + newLine);
};

export const showInfo = (message: string): void => {
  console.info(cyan(ConsoleMessage.INFO) + message + newLine);
};

export const showGenerate = (fileName: string): void => {
  console.log(cyan(ConsoleMessage.GENERATE) + `${fileName}...`);
};

export const showCreate = (fileName: string, filePath: string): void => {
  filePath
    ? console.log(green(ConsoleMessage.CREATE) + `${fileName} in ${filePath}`)
    : console.log(green(ConsoleMessage.CREATE) + `${fileName}`);
};

export const showUpdate = (fileName: string, filePath: string): void => {
  filePath
    ? console.log(green(ConsoleMessage.UPDATE) + `${fileName} in ${filePath}`)
    : console.log(green(ConsoleMessage.UPDATE) + `${fileName}`);
};

export const suggestCommand = (cmd: string, cmds: any) => {
  const matches = similiarity.findBestMatch(cmd, cmds)
  console.log(yellow(`Invalid command. Did you mean ${matches.bestMatch.target}?`))
}
