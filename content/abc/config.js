(() => {
    console.log('config.js')
    let configs = []

    const log = (message, ...args) => window.__abc.log(message, 'CFG', ...args)

    const getConfigUrlByFilename = filename => {
        return window.__abc.getScriptParameter(filename, 'url')
    }

    const getConfigUrlByName = name => {
        for (let i=0; i<configs.length; i++){
            const config = configs[i]
            if (config.name === name){
                return config.url
            }
        }
        return null
    }

    window.__abc.config = {
        register: (name, filename) => configs.push({
            name,
            url: getConfigUrlByFilename(filename)
        }),
        getValue: (name, key) => {
            const configUrl = getConfigUrlByName(name)
            return fetch(configUrl).then(response => response.json()).then(response => response[key])
        }
    }
})()