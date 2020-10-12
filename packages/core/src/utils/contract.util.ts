import { MnemonicKey, LCDClient, MsgStoreCode, MsgInstantiateContract, Coins, MsgExecuteContract, Coin, MsgSend } from '@terra-money/terra.js'
import * as fs from "fs";
import { showError } from './logger.util';
import { BlockTxBroadcastResult } from '@terra-money/terra.js/dist/client/lcd/api';


export const compile = async (cargo: any) => {
   /**
    * execute docker command to compile to wasm
    */
    
}


export const deploy = async (wasm: any) => {
    /**
     * deploy wasm contract binary to the network
     */

    const code = fs.readFileSync(wasm);

    // TODO: get network config from houston-config.js
    const lcd = new LCDClient({
        URL: "http://localhost:1317",
        chainID: "localterra"
    });

    const mk1 = new MnemonicKey({
        mnemonic: "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius"
    });    

    // TODO: get config from houston-config.js
    const test1 = lcd.wallet(mk1);

    const storeCode = new MsgStoreCode(
        test1.key.accAddress,
        code.toString('base64')
    )

    const storeCodeTx = await test1.createAndSignTx({
        msgs: [storeCode]
    })
    const storeCodeTxResult: void | BlockTxBroadcastResult = await lcd.tx.broadcast(storeCodeTx);
    
    const codeId = storeCodeTxResult!.logs[0].events[1].attributes[1].value;
    

    // TODO: get instantiate settings in houston-config.js
    const instantiateCode = new MsgInstantiateContract(
        test1.key.accAddress, +codeId, {}, new Coins({}), false
    );
    
    const instantiateTx = await test1.createAndSignTx({
        msgs: [instantiateCode]
    })
    
    const instantiateTxResult = await lcd.tx.broadcast(instantiateTx);
    return instantiateTxResult
}
