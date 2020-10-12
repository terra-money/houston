
import * as util from 'util'
import * as os from 'os'
import * as path from 'path'
import { red, green, yellow } from "kleur";
import fs from "fs";
import { showError, showSuccess } from './logger.util';
const exec = util.promisify(require('child_process').exec);

export const settingsPath = path.join(os.homedir(), '.projectman', 'settings.json')
export const settingsDir = path.join(os.homedir(), '.projectman')

export const writeSettings = (data: Object, command = '<command>', successMessage = "Settings updated :D !") => {
  fs.writeFile(settingsPath, JSON.stringify(data, null, 4), err => {
      if (err) {
          if (err.code === 'EACCES') {
              const errCmd = (process.platform == 'win32') ? `an admin` : `a super user ${yellow(`sudo houston ${command}`)}`;
              showError(`Access Denied! please try again as ${errCmd}`)
              return;
          }
          return;
      }
      console.log(">>> " + successMessage + green(" ✔"))
  })
}

export const openUrl = async (url: string) => {
    let stderr;
    switch (process.platform) {
        case "darwin":
            ({stderr} =  await exec(`open ${url}`));
            break;
        case "win32":
            ({stderr} =  await exec(`start ${url}`));
            break;
        default:
            ({stderr} =  await exec(`xdg-open ${url}`));
            break;
    }
    console.log('here ',stderr)
    return stderr;
}

export const isURL = (str: string) => {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}