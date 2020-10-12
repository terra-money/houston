<img src="https://github.com/hskang9/houston/blob/master/assets/logo.png" width="500">

---

Houston is a development environment, testing framework and asset pipeline for Terra, aiming to make life as an Terra developer easier. With Houston, you get:

- Built-in smart contract compilation, linking, deployment and binary management.
- Automated contract testing with Mocha and Chai.
- Configurable build pipeline with support for custom build processes.
- Scriptable deployment & migrations framework.
- Network management for deploying to many public & private networks.
- Interactive console for direct contract communication.
- Instant rebuilding of assets during development.
- External script runner that executes scripts within a Houston environment.

### Install

```
$ npm install -g houston
```

### Quick Usage

For a default set of contracts and tests, run the following within an empty project directory:

```
$ houston init
```

From there, you can run `houston compile`, `houston deploy`, `houston add` and `houston test` to compile your contracts, deploy those contracts to the network, and run their associated unit tests.

See [the documentation]() for more details.

### Documentation

Please see the [Official Houston Documentation]() for guides, tips, and examples.

### Contributing

There are many ways to contribute!

1. Write issues in the [issues tracker](https://github.com/hskang9/houston/issues). Please include as much information as possible!

Please see the main projects [CONTRIBUTING.md][1] for instructions on how to setup a Development Environment to work on Houston itself.

[1]: https://github.com/hskang9/houston/blob/master/CONTRIBUTING.md#development

### Contributors

A project by Terra and [Hyungsuk](https://github.com/hskang9), and many contributers from truffle and its creator for references.

### License

MIT
