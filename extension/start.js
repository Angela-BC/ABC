const log = (message) => {
    console.log(message)
}

log('Angela BC startup..')

window.addEventListener('load', () => {

    const configFiles = {
        'autoLogin': chrome.runtime.getURL('config/autoLogin.json')
    }

    const scriptFiles = [
        // framework
        'content/abc/core.js',
        'content/abc/capabilities.js',
        'content/abc/modules.js',
        'content/abc/config.js',
        'content/abc/storage.js',

        // modules
        'content/modules/autoLogin.js?url=@@autoLogin@@',
        'content/modules/bcx.js',
        'content/modules/chatLogger.js',
        'content/modules/dataLogger.js',

        // main.js as last
        'content/main.js'
    ]

    const styleFiles = [
        'content/styles/abc.css'
    ]

    getScriptUrl = url => {
        let result = url
        if (result.indexOf('?') > 0){
            result = result.replace('?', `?xx=${Date.now()}&`)                
        } else {
            result = result + `?xx=${Date.now()}`
        }
        var keys = Object.keys(configFiles)
        keys.forEach(key => {
            const lookup = `@@${key}@@`
            if (result.indexOf(lookup) >= 0){
                const configUrl = configFiles[key]
                const replace = encodeURIComponent(configUrl)
                result = result.replace(lookup, replace)
            }
        })
        return chrome.runtime.getURL(result)
    }

    log('style sheet')
    styleFiles.forEach(styleFileName => {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = chrome.runtime.getURL(styleFileName)
        return document.head.appendChild(link)
    })

    log('script files')
    scriptFiles.forEach(scriptFileName => {
        let script = document.createElement('script')
        script.src = getScriptUrl(scriptFileName)
        script.async = false
        return document.head.appendChild(script)
    })

});
