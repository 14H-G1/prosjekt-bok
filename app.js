function Application(environment, args) {
    var spawn = require('child_process').spawn;
    args = args || ['app/logic.js'];
    var opts = {
        cwd: __dirname,
        env: (function() {
            process.env.NODE_PATH = '.';
            process.env.NODE_ENV = environment;
            if (process.env.NODE_ENV == 'debug') {
                process.env.DEBUG = 'app:*';
            }
            return process.env;
        }()),
        stdio: [process.stdin, process.stdout, process.stderr]
    };
    spawn(process.execPath, args, opts);
}

// change debug into production when ready, disables debugging
module.exports = new Application('debug');
