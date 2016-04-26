var path = require('path');
var tl = require('vso-task-lib');

var sleep = new tl.ToolRunner(tl.which('sleep', true));

var sleeptime = tl.getInput('seconds', true);
sleep.arg(sleeptime);


sleep.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
