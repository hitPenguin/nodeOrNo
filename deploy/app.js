const fs = require('fs');
const path = require('path');

const pidfile = path.join(__dirname, 'run/app.pid');
fs.writeFileSync(pidfile, process.pid);