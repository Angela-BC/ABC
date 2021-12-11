(context => {
    console.log('chatLogger.js')

    const log = (message, ...args) => window.__abc.log(message, 'CL', ...args)
    const error = (message, ...args) => window.__abc.error(message, 'CL', ...args)

    const onChat = data => {
        log(`%c${data.Sender} %c${data.Content}`, 'color: blue', 'color: blue')
    }

    const onWhisper = data => {
        log(`%c${data.Sender} %c${data.Content}`, 'color: blue', 'color: grey')
    }

    const onEmote = data => {
        log(`%c${data.Sender} %c${data.Content}`, 'color: blue', 'color: red')
    }

    const onHidden = () => {}

    const onAction = data => {
        log(`%c${data.Sender} %c${data.Content}`, 'color: blue', 'color: green')
        if (data.Dictionary){
            let line = ''
            for (let i=0; i<data.Dictionary.length; i++){
                if (line !== '') {
                    line = line + ', '
                }
                const row = data.Dictionary[i]
                Object.keys(row).forEach(key => line = `${line} ${row[key]}`)
            }
            log(line)
        }
    }

    context.modules.add('chat logger', {
        capabilities: [
            context.capabilities.onChat,
            context.capabilities.onWhisper, 
            context.capabilities.onEmote, 
            context.capabilities.onAction,
            context.capabilities.onActivity,
            context.capabilities.onHidden
        ],
        onChat,
        onWhisper,
        onEmote,
        onAction,
        onActivity: onAction,
        onHidden
    })   

})(window.__abc)