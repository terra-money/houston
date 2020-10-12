import fs from "fs-extra";
import { yellow } from "kleur";
import { injectable } from "inversify";
import { openUrl, isURL, settingsPath } from '../../utils/manager.util';
import { exec } from 'child_process';
import { showError } from '../../utils/logger.util';
import { checkIfDirExistElseMakeDir } from '../../utils/checker.util';

@injectable()
export class ManagerRequest {
  constructor() {}

  public generateSettings(): void {
    checkIfDirExistElseMakeDir(true, settingsPath)
    this.createFile(settingsPath, 'settings.json', JSON.stringify([{}]));
  }

  public async openProject(projectPath: string, cmdToOpen: string) {
    const commandToOpen = cmdToOpen || projectPath;
    let stderr;
    try {
      if (isURL(projectPath)) {
        ({stderr} = await openUrl(projectPath))
      } else {
        ({stderr} = await exec(`${commandToOpen} ${projectPath}`))
      }

      if(stderr) {
        console.error("Could not open projet. Maybe the project directory has changed");
        showError(stderr);
      }
    } catch(err) {
      console.error("Could not open project, Maybe the editor command is invalid to open")
      console.warn(`If invalid, use ${yellow('houston seteditor')} to set Editor/IDE of your choice`)
      return;
    }
  }

  private createFile(filePath: string, fileName: string, fileContent: Object): void {
    
    fs.writeFile(filePath, fileContent, (error: Error) => {
      if (!error) {
        console.log(`File created: ${fileName}`);
      } else {
        console.error(`File error: ${fileName}`);
      }
    });
  }
}
