const cp = require('child_process');

const worker = cp.fork('./app.js', [], { stdio: 'inherit' });

// console.log(worker.env.NODE_CHANNEL_FD);

console.log(worker.NODE_CHANNEL_FD);

