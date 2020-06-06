const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const config = require('./config');

const watchFolder = config.watchFolder;

fs.watch(watchFolder, '', cb);

outputInfoText(`Start watch for "${watchFolder}".`);

function cb (eventType, filename)  {
    if (eventType === 'change') {
        fs.readdir(watchFolder, (err, files) => {
            for (let file of files) {
                const fileExtension = getFileType(file);
                if (fileExtension) {
                    const targetFolder = road(fileExtension);
                    if (targetFolder) {
                        move(file, targetFolder);
                    }
                }
            }
        });
    }
}

function getFileType (file) {
    return path.extname(file);
}

function move (what, where) {
    exec(`move "${path.join(watchFolder, what)}" "${where}"`, () => {
        outputInfoText(`${what}`);
    });
}

function outputInfoText (text) {
    console.log(text);
}

function road (ext) {
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