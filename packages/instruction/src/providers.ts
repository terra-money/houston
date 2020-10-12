import { LCDClient } from "@terra-money/terra.js";

export function getProvider(network: string) {
  if (network == "localterra") {
  }
  return new LCDClient({
    URL: "http://localhost:1317",
    chainID: "localterra",
  });
}
