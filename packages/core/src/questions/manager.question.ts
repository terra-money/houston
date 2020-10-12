import inquirer from "inquirer";

import { Project } from "../models/project";
import { settingsPath } from '../utils/manager.util'

export async function managerQuestion(): Promise<Project> {
  const settings:Project[] = require(settingsPath)
  return inquirer.prompt([
    {
      name: "files",
      type: "list",
      message: "Select project to open: ",
      choices: settings,
    },
  ]);
}
