const {
  MnemonicKey,
  LCDClient,
  MsgStoreCode,
  MsgInstantiateContract,
  Coins,
  MsgExecuteContract,
  Coin,
  MsgSend,
} = require("@terra-money/terra.js");

async function deploy() {
  console.log("Setting up accounts and contracts...");
  // Setup an account with key from mnemonic phrases
  const mk1 = new MnemonicKey({
    mnemonic:
      "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
  });
  // Setup a network provider to connect
  const terra = new LCDClient({
    URL: "http://localhost:1317",
    chainID: "localterra",
  });

  // Create a wallet which points to the network provider
  const test1 = terra.wallet(mk1);

  const fs = require("fs");
  // To deploy a contract, you must get an wasm file.
  const starterCode = fs.readFileSync("../wasm/starter.wasm");

  // Create tx to sign and send to the blockchain
  const storeStarter = new MsgStoreCode(
    test1.key.accAddress,
    starterCode.toString("base64")
  );

  // Create a batch of txs to send to the blockchain
  const storeCodeTx = await test1
    .createAndSignTx({
      msgs: [storeStarter],
    })
    .catch((error: any) => {
      console.log(error);
    });

  // Get results with codeId
  const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);
  const starterId = storeCodeTxResult.logs[0].events[1].attributes[1].value;

  console.log("Starter code id", starterId);

  // Cosmwasm smart contracts need to instantiate from the uploaded wasmer executable binary.
  const instantiateStarter = new MsgInstantiateContract(
    test1.key.accAddress,
    +starterId,
    {
      default_name: "Hyungsuk",
    },
    new Coins({}),
    false
  );

  // Create tx batch again
  const instantiateTx = await test1.createAndSignTx({
    msgs: [instantiateStarter],
  });

  // Get address from executing tx
  const instantiateTxResult = await terra.tx.broadcast(instantiateTx);

  const starterAddress =
    instantiateTxResult.logs[0].events[0].attributes[2].value;

  console.log("Starter address", starterAddress);

  // To interact with smart contract, check generated contract's schemas in the schemas/ folder.
  // For example, to set name in starter contract

  const setName = new MsgExecuteContract(
    test1.key.accAddress,
    starterAddress,
    {
      set_name: {
        name: "hello world",
      },
    },
    new Coins({})
  );

  const interactTx = await test1.createAndSignTx({
    msgs: [setName],
  });

  const interactTxResult = await terra.tx.broadcast(interactTx);

  console.log(interactTxResult);
}

deploy();
