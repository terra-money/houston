import {
  MnemonicKey,
  Wallet,
  LCDClient,
  MsgStoreCode,
  MsgInstantiateContract,
  Coins,
  MsgExecuteContract,
  Coin,
  MsgSend,
} from "@terra-money/terra.js";

import Instruction from "./instruction";

class TerraInstruction extends Instruction {
  public wasmCodeId: number;
  storeCode = (account: any) => {
    this.wasmCode = new MsgStoreCode(
      account.key.accAddress,
      this.wasmCode.toString("base64")
    );
  };
}
