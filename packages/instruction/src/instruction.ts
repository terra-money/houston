import HoustonConfig from "@terra-money/houston-config";
import fse from "fs-extra";
import { getInterface } from "./schema";
import { getProvider } from "./providers";
import { getAccounts } from "./accounts";

class Instruction {
  public wasm: any;
  public provider: any;
  public accounts: any;
  public sender: any;
  require = (chainId: string, contractName: string) => {
    // load wasm
    let config = HoustonConfig.detect();
    this.wasm = fse.readFileSync(
      `${config.contract_builds_directory}/${contractName}`
    );
    // find schema and generate interface
    getInterface(contractName);
    // Set network configuration
    this.provider = getProvider(chainId);
    this.accounts = getAccounts(chainId);
    return this;
  };

  setProvider(chainId: string) {
    this.provider = getProvider(chainId);
  }

  setSender(account: any) {
    this.sender = account;
  }
}

export default Instruction;
