const fs = require('fs')
const { resolve } = require('./util')
const { fork } = require('child_process')
const chalk = require('chalk')
let wp = null
let isRun = false
function run() {
    let wp = fork(resolve('build/run.js'), { cwd: process.cwd() })
    wp.on('close', function() {
        if (isRun) {
            wp = run()
            console.log(chalk.green('rebuild...'))
            isRun = false
        }
    })
    return wp
}

fs.watch(resolve('src/html'), { recursive: true }, function(e, file) {
    if (e === 'rename') {
        let tId = null
        tId && clearTimeout(tId)
        tId = setTimeout(() => {
            isRun = true
            wp.kill()
        }, 500)
    }
})
wp = run()
