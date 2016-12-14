/**
 * Created by diego on 13/12/16.
 */
"use strict";

var chokidar = require("chokidar");
var fs = require("fs");

var watcher = chokidar.watch('/home/diego/Music/*.txt', {
    ignored: /(^|[\/\\])\../,
    ignoreInitial: true,
    persistent: true
});

watcher.on('add', path => {
    console.log(`File ${path} has been added`);

    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(path)
    });

    lineReader.on('line', function (line) {
        console.log("ID: %s, CUIT: %s", line.substr(0,3),line.substr(3,11));
    });

    lineReader.on('close', function () {
        fs.rename(path, path + ".readed", function (err, file) {
            console.log("Terminado");
        });
    });

})
.on('change', path => {
    console.log(`File ${path} has been changed`);
})
.on('unlink', path => {
    console.log(`File ${path} has been removed`);
});

watcher
.on('error', error => {
    console.log(`Watcher error: ${error}`);
})
.on('ready', () => {
    console.log('Initial scan complete. Ready for changes');
});

