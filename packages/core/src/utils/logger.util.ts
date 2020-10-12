import { red, green, cyan, yellow } from "kleur";
import * as similiarity from "string-similarity";

export enum ConsoleMessage {
  TITLE = "Houston",
  BANNER = "Smart contract tool for cosmwasm",
  ERROR = "ERROR: ",
  SUCCESS = "SUCCESS: ",
  INFO = "INFO: ",
  GENERATE = "GENERATE: ",
  CREATE = "CREATE: ",
  UPDATE = "UPDATE: ",
  START_GENERATING = "Start generating contract boilerplate...",
}

const newLine = "\n";

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
  const matches = similiarity.findBestMatch(cmd, cmds);
  console.log(
    yellow(`Invalid command. Did you mean ${matches.bestMatch.target}?`)
  );
};
