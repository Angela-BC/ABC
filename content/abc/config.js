(() => {
    console.log('config.js')
    let configs = []

    const log = (message, ...args) => window.__abc.log(message, 'CFG', ...args)

    const getConfigUrlByFilename = filename => {
        const scripts = document.getElementsByTagName('script')
        for (let i=0; i<scripts.length; i++){
            const src = scripts[i].src
            if (src.indexOf(filename) >= 0){
                const urlIndex = src.indexOf('&url=')
                if (urlIndex > 0){
                    var result = decodeURIComponent(src.substr(urlIndex + 5))
                    return result
                }
            }
        }
        return null
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