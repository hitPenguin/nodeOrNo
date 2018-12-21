const { Console } = require('console'); // const { Console } = console;
const myConsole = new Console(process.stdout, process.stderr); // 等同于全局的 console
// const logger = new Console({ stdout: process.stdout, stderr: process.stderr });
console.clear(); // stdout 是 TTY 时, 等于 shell 的 clear 命令
console.count([label]); // 默认是 default,  调用一次 加 1
console.dir(obj[, options]); // depth 默认为 2, showHidden 默认为 false, colors 默认为 false

