(() => {
    console.log('core.js')
    let configFiles = {}
    let registeredListeners = {}

    const getDateString = () => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', minute: '2-digit', second: '2-digit' }
        const dateStr = `${(new Date()).toLocaleString('nl-NL', options)}`
        return dateStr
    }

    const log = (message, prefix, ...args) => {
        mod = prefix ? ` ${prefix}` : ''
        console.log(`${getDateString()} ABC${mod}: ${message}`, ...args)
    }

    const error = (message, prefix, ...args) => {
        mod = prefix ? ` ${prefix}` : ''
        console.log(`${getDateString()} ABC${mod}: %c${message}`, 'color: red', ...args)
    }

    const setConfigFile = (name, url) => {
        log(`setting config file ${name}`)
        configFiles[name] = url
    }

    const getConfigUrl = name => {
        return configFiles[name]
    }

    const registerListener = (event, handler) => {
        if (registeredListeners[event] !== undefined) {
            throw `Event with name ${event} already registered`
        }
        registeredListeners[event] = true
        ServerSocket.on(event, data => handler(data, event))
        log(`Register handler for event ${event}`)
    }

    const registerAllListener = handler => {
        const event= '*'
        if (registeredListeners[event] !== undefined) {
            throw `Event with name ${event} already registered`
        }
        registeredListeners[event] = true
        ServerSocket.onAny((event, ...args)  => handler(event, { ...args}))
        log(`Register handler for event ${event}`)
    }

    const getScriptParameter = (filename, parameter) => {
        const scripts = document.getElementsByTagName('script')
        for (let i=0; i<scripts.length; i++){
            const src = scripts[i].src
            if (src.indexOf(filename) >= 0){
                const lookup = `&${parameter}=`
                const urlIndex = src.indexOf(lookup)
                if (urlIndex > 0){
                    let result = src.substring(urlIndex + lookup.length)
                    const nextParam = result.indexOf('&')
                    if (nextParam > 0){
                        result = result.substring(0, nextParam - 1)
                    }
                    result = decodeURIComponent(result)
                    return result
                }
            }
        }
        return null
    }

    window.__abc = {
        log,
        error,
        getDateString,
        setConfigFile,
        getConfigUrl,
        registerListener,
        registerAllListener,
        getScriptParameter
    }
})()
