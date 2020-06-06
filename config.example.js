const targetFolder = 'Path to save folder',

config = {
    watchFolder:  'Path to folder to follow',
    saveTo: {
        jpg:   `${targetFolder}\\img`,
        djvu:  `${targetFolder}\\djvu`,
        pdf:   `${targetFolder}\\pdf`,
        txt:   `${targetFolder}\\txt`,
        zip:   `${targetFolder}\\zip`,
        others:`${targetFolder}\\others`
    }
}

module.exports = config;