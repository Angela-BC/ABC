(context => {

    const log = message => {
        context.log(message, 'AL')
    }

    const error = message => {
        context.error(message, 'AL')
    }


    const onStart = () => {
        log('onStart')
        context.config.register('autoLogin', 'autoLogin.js')
        setTimeout(() => {
            log('Setting up auto login')
            
            ServerSocket.on('connect', function () {
                setTimeout(function() {
                    const name = Player?.AccountName.toLowerCase()
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
                }, 2000)
            })    
        }, 2000)
    }

    context.modules.add('auto login', {
        onStart
    })
})(window.__abc)
