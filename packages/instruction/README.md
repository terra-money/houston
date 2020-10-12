# @terra-money/instruction

The higher order component which returns a component with network option, ABI methods, and default test account wallets to be run in migration scripts

### Usage

#### Instantiate contracts in multiple networks

```javascript
import Instruction from '@terra-money/instruction'

async function migrate() {
    // Terra deployment
    const FLIPPER_TERRA = Instruction.require('flipper', 'localterra', {signer: 'default0'});
    await FLIPPER_TERRA.storeCode();
    await FLIPPER_TERRA.instantiate(true);
    // Secret deployment
    const FLIPPER_SECRET = Instruction.require('flipper', 'secret', {signer: 'default'});
    await FLIPPER_SECRET.storeCode();
    await FLIPPER_SECRET.instantiate(true);
}

migrate()
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
