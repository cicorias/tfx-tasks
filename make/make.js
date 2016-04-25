var path = require('path');
var tl = require('vsts-task-lib');

var make = new tl.ToolRunner(tl.which('make', true));

var target = tl.getInput('target', true);
make.arg(target);

var cwd = tl.getPathInput('cwd', false);

// will error and fail task if it doesn't exist
tl.checkPath(cwd, 'cwd');
tl.cd(cwd);

make.exec({ failOnStdErr: false})
.then(function(code) {
    tl.setVariable('build.status', 'success');
    tl.setVariable('build.step.code', code);
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.setVariable('build.status', 'failure');
    tl.setVariable('build.step.code', 1);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
