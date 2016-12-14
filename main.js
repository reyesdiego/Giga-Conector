/**
 * Created by diego on 13/12/16.
 */

var chokidar = require("chokidar");

var watcher = chokidar.watch('/home/diego/Music/*.txt', {
    ignored: /(^|[\/\\])\../,
    ignoreInitial: true,
    persistent: true
});

watcher
.on('add', path => {
    console.log(`File ${path} has been changed`);

    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(path)
    });

    lineReader.on('line', function (line) {
        console.log("ID: %s, CUIT: %s", line.substr(0,3),line.substr(3,11));
    });

})
.on('change', path => {
    console.log(`File ${path} has been changed`);
})
.on('unlink', path => {
    console.log(`File ${path} has been changed`);
});

watcher
.on('error', error => {
    console.log(`Watcher error: ${error}`);
})
.on('ready', () => {
    console.log('Initial scan complete. Ready for changes');
});

