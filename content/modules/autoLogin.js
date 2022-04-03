(context => {
    console.log('autoLogin.js')
    let lastKnownPlayerName = null

    const log = message => {
        context.log(message, 'AL')
    }

    const error = message => {
        context.error(message, 'AL')
    }

    function getPlayerName() {
        let name = Player?.AccountName.toLowerCase()
        if (name === '' || name === undefined || name === null) {
            name = lastKnownPlayerName
        } else {
            lastKnownPlayerName = name
        }
        return name
    }

    const onStart = () => {
        log('onStart')
        context.config.register('autoLogin', 'autoLogin.js')
        log('Setting up auto login')
        
        ServerSocket.on('connect', function () {
            setTimeout(function() {
                const name = getPlayerName()
                if (name === '' || name === undefined || name === null) {
                    error('No username set')
                    return
                }
                context.config.getValue('autoLogin', name).then(value => {
                    if (value === undefined || value === null || value === ''){
                        error(`No config for name ${name}`)
                        return
                    }
                    const password = LZString.decompressFromBase64(value)
                    if (password === '' || password === undefined || password === null) {
                        error('No password set')
                        return
                    }
                    ElementValue('InputPassword',password)
                    RelogSend()
                })
            }, 3000 + Math.floor(Math.random() * 10000))
        })    
    }

    context.modules.add('auto login', {
        capabilities: [context.capabilities.onStart],
        onStart
    })
    
})(window.__abc)
