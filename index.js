const fs = require('fs');
const path = require('path');
const {
    exec
} = require('child_process');
const {
    config,
    targetFolder
} = require('./config');
const notifier = require('node-notifier');
const clc = require("cli-color");

const watchFolder = config.watchFolder;

createTargetFolder();

function startWatch() {
    fs.watch(watchFolder, '', cb);
}

function startMessage() {
    console.log(clc.white.bgRed(` Start watch for "${watchFolder}" `));
    notification('Старт', `Слідкую за змінами у папкі: ${watchFolder}.`);
}

function cb(eventType, filename) {
    if (eventType === 'change') {
        fs.readdir(watchFolder, (err, files) => {
            for (let file of files) {
                const fileExtension = getFileType(file);
                if (fileExtension) {
                    const saveFolder = road(fileExtension);
                    if (saveFolder) {
                        move(file, saveFolder);
                    }
                }
            }
        });
    }
}

function getFileType(file) {
    return path.extname(file);
}

function move(what, where) {
    exec(`move "${path.join(watchFolder, what)}" "${where}"`, () => {
        outputInfoText(what);
    });
}

function outputInfoText(text) {
    console.log(clc.green('✓ ') + text);
}

function road(ext) {
    switch (ext) {
        case '.djvu':
            return config.saveTo.djvu;
        case '.pdf':
            return config.saveTo.pdf;
        case '.jpg':
            return config.saveTo.jpg;
        case '.txt':
            return config.saveTo.txt;
        case '.zip':
            return config.saveTo.zip;
        default:
            return config.saveTo.others;
    }
}

function notification(title, message) {
    notifier.notify({
        title,
        message
    });
}

function createTargetFolder() {
    if (fs.existsSync(targetFolder)) {
        createTypeFolders();
    } else {
        fs.mkdir(targetFolder, err => {
            if (err) throw err;
            createTypeFolders();
        });
    }
}

function createTypeFolders() {
    const objectOfFolders = config.saveTo;
    for (let prop in objectOfFolders) {
        if (fs.existsSync(objectOfFolders[prop])) {
            continue;
        }
        fs.mkdir(objectOfFolders[prop], err => {
            if (err) throw err;
        });
    }
    startApp();
}

function startApp() {
    startMessage();
    startWatch();
}
