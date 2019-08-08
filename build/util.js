const path = require('path')
const glob = require('glob')

function resolve() {
    return path.resolve(__dirname, '..', ...arguments)
}

function getFileList(pattern) {
    return glob.sync(pattern, { nodir: true })
}

function parseFilePath(filePath) {
    if (typeof filePath === 'string') {
        let arr = filePath.split('/')
        let file = arr[arr.length - 1]
        let lastIndex = file.lastIndexOf('.')
        let ext = file.substr(lastIndex + 1)
        let name = file.substr(0, lastIndex)
        return {
            ext,
            name,
            fullName: file,
            filePath
        }
    }
}

function generateHtmls(list) {
    return list.map(item => {
        return parseFilePath(item)
    })
}

function generateEntries() {
    const list = getFileList('src/entries/**/*.js')
    const ret = {}
    for (let i = 0; i < list.length; i++) {
        const { name } = parseFilePath(list[i])
        ret[name] = resolve(list[i])
    }
    return ret
}

exports.generateHtmls = generateHtmls
exports.getFileList = getFileList
exports.parseFilePath = parseFilePath
exports.resolve = resolve
exports.generateEntries = generateEntries
