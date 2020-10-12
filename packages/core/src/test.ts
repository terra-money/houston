import {
  MnemonicKey,
  LCDClient,
  MsgStoreCode,
  MsgInstantiateContract,
  Coins,
  MsgExecuteContract,
  Coin,
  MsgSend,
} from "@terra-money/terra.js";
import * as fs from "fs";

console.log("Setting up accounts and contracts...");
const mk1 = new MnemonicKey({
  mnemonic:
    "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
});

const mk2 = new MnemonicKey({
  mnemonic:
    "quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty",
});

const terra = new LCDClient({
  URL: "http://localhost:1317",
  chainID: "localterra",
});

const test1 = terra.wallet(mk1);
const test2 = terra.wallet(mk2);

async function hello() {
  const uniswapCode = fs.readFileSync("./contracts/exchange.wasm");
  const erc20Code = fs.readFileSync("./contracts/cw_erc20.wasm");

  const storeUniswap = new MsgStoreCode(
    test1.key.accAddress,
    uniswapCode.toString("base64")
  );

  const storeErc20 = new MsgStoreCode(
    test1.key.accAddress,
    erc20Code.toString("base64")
  );
  const storeCodeTx = await test1.createAndSignTx({
    msgs: [storeUniswap, storeErc20],
  });
  const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);
  const uniswapId = storeCodeTxResult.logs[0].events[1].attributes[1].value;
  const erc20Id = storeCodeTxResult.logs[1].events[1].attributes[1].value;

  const instantiateUniswap = new MsgInstantiateContract(
    test1.key.accAddress,
    +uniswapId,
    { minimum_luna: "0", owner: test1.key.accAddress },
    new Coins({}),
    false
  );

  const instantiateErc20 = new MsgInstantiateContract(
    test1.key.accAddress,
    +erc20Id,
    {
      name: "MyTerraToken",
      symbol: "MTT",
      decimals: 18,
      initial_balances: [
        { address: test1.key.accAddress, amount: "100000000000000000000000" },
        {
          address: test2.key.accAddress,
          amount: "1000000000000000000000000000",
        },
      ],
    },
    new Coins({}),
    false
  );

  const instantiateTx = await test1.createAndSignTx({
    msgs: [instantiateUniswap, instantiateErc20],
  });

  const instantiateTxResult = await terra.tx.broadcast(instantiateTx);
  const uniswapAddress =
    instantiateTxResult.logs[0].events[0].attributes[2].value;
  const erc20Address =
    instantiateTxResult.logs[1].events[0].attributes[2].value;
  console.log("erc20 token address: ", erc20Address);
  console.log("uniswap contract address: ", uniswapAddress);
  console.log("test2 address: ", test2.key.accAddress);
  console.log("test1 address: ", test1.key.accAddress);

  // Approve dex to deposit user's money
  const approveDex = new MsgExecuteContract(
    test1.key.accAddress,
    erc20Address,
    {
      approve: {
        amount: "10000000000000",
        spender: uniswapAddress,
      },
    },
    new Coins({})
  );

  const contractTx = await test1.createAndSignTx({
    msgs: [approveDex],
  });

  const approveDexResult = await terra.tx.broadcast(contractTx);
  console.log(approveDexResult.logs[0].events[0].attributes);

  // Add liquidity to uniswap
  const addLiquidity = new MsgExecuteContract(
    test1.key.accAddress,
    uniswapAddress,
    {
      add_liquidity: {
        luna_amount: "100000000",
        token_address: erc20Address,
        token_amount: "500000000",
        channel_id: "1",
      },
    },
    new Coins([new Coin("uluna", "100000000")])
  );

  const addLiquidityTx = await test1.createAndSignTx({
    msgs: [addLiquidity],
  });

  const addLiquidityTxResult = await terra.tx.broadcast(addLiquidityTx);
  console.log(addLiquidityTxResult.logs[0].events[0].attributes);

  // swap luna to token
  const swapToToken = new MsgExecuteContract(
    test2.key.accAddress,
    uniswapAddress,
    {
      swap_luna_to_token: {
        amount: "9999",
        recipient: test2.key.accAddress,
        channel_id: "1",
      },
    },
    new Coins([new Coin("uluna", "9999")])
  );

  const swapTx = await test2.createAndSignTx({
    msgs: [swapToToken],
  });
  const swapTxResult = await terra.tx.broadcast(swapTx);
  console.log(swapTxResult.logs[0].events[0].attributes);

  // approve test2 to dex
  const approveDex4Test2 = new MsgExecuteContract(
    test2.key.accAddress,
    erc20Address,
    {
      approve: {
        amount: "4000000000",
        spender: uniswapAddress,
      },
    },
    new Coins({})
  );

  const approveTest2Tx = await test2.createAndSignTx({
    msgs: [approveDex4Test2],
  });

  const approveDexTest2Result = await terra.tx.broadcast(approveTest2Tx);
  console.log(approveDexTest2Result.logs[0].events[0].attributes);

  /*
    // Send luna to dex
    const sendLuna = new MsgSend(test1.key.accAddress, uniswapAddress, new Coins([new Coin("uluna", "100000")]))

    const sendLunaTx = await test1.createAndSignTx({
        msgs: [sendLuna]
    })
    const sendLunaTxResult = await terra.tx.broadcast(sendLunaTx);
    console.log(sendLunaTxResult.logs[0].events[0].attributes);
    */
  // swap token to Luna
  const swapToLuna = new MsgExecuteContract(
    test2.key.accAddress,
    uniswapAddress,
    {
      swap_token_to_luna: {
        amount: "400000",
        recipient: test2.key.accAddress,
        channel_id: "1",
      },
    },
    new Coins({})
  );

  const swapLunaTx = await test2.createAndSignTx({
    msgs: [swapToLuna],
  });
  const swapLunaTxResult = await terra.tx.broadcast(swapLunaTx);
  console.log(swapLunaTxResult.logs[0].events[0].attributes);
}

hello();
