(() => {
    let configFiles = {}

    const getDateString = () => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', minute: '2-digit', second: '2-digit' }
        const dateStr = `${(new Date()).toLocaleString('nl-NL', options)}`
        return dateStr
    }

    const log = (message, prefix) => {
        mod = prefix ? ` ${prefix}` : ''
        console.log(`${getDateString()} ABC${mod}: ${message}`)
    }

    const error = (message, prefix) => {
        mod = prefix ? ` ${prefix}` : ''
        console.log(`${getDateString()} ABC${mod}: %c${message}`, 'color: red')
    }

    const setConfigFile = (name, url) => {
        log(`setting config file ${name}`)
        configFiles[name] = url
    }

    const getConfigUrl = name => {
        return configFiles[name]
    }

    window.__abc = {
        log,
        error,
        getDateString,
        setConfigFile,
        getConfigUrl
    }
})()
