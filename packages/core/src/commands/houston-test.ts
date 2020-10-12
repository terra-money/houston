function test(program: { command: (arg0: string, arg1: string) => { (): any; new(): any; action: { (arg0: (cargos: any) => void): void; new(): any } }; parse: (arg0: string[]) => void }) {
    program.command('test [scripts]', 'execute test scripts') 
    .action((scripts:any) => {
        testScripts(scripts)
    });

    program.parse(process.argv)
}

module.exports = test;

export const testScripts = (scripts: any) => {
    // if input is null
    if (scripts === "undefined") {
        // go to test/ directory
        
        // get script file list of test/
        // TODO: replace [] with test filenames
        let testScripts: any[] = []
        // run all of them
        testScripts.map((script: any) => {
            // execute ts-node command to execute node.js script
    
            // show aggregate result with console.table
        })
    } else {
        scripts.map((script: any) => {
            // go to test directory 
    
            // execute ts-node command to compile node.js test script
    
            // show aggregated result with console.table
        })
    }  
}

