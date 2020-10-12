import { MnemonicKey, Wallet, LCDClient } from "@terra-money/terra.js";

export function getAccounts(chainId: string) {
  if (chainId == "localterra") {
    const mk1 = new MnemonicKey({
      mnemonic:
        "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
    });

    const mk2 = new MnemonicKey({
      mnemonic:
        "quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty",
    });
    let lcd = new LCDClient({
      URL: "http://localhost:1317",
      chainID: "localterra",
    });

    const test1 = new Wallet(lcd, mk1);
    const test2 = new Wallet(lcd, mk2);
    return [test1, test2];
  }
}
