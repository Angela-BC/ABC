(() => {
    console.log('modules.js')
    let items = []
    let messageListeners = []
    let dataListeners = []

    const log = (message, ...args) => window.__abc.log(message, 'MOD', ...args)
    const error = (message, ...args) => window.__abc.error(message, 'MOD', ...args)

    const onCapabilities = (moduleCapabilities, action) => {
        items.forEach(module => {
            for(let i=0; i<moduleCapabilities.length;i++){
                const moduleCapability = moduleCapabilities[i]
                if (module.capabilities.indexOf(moduleCapability) >= 0){
                    action(module)
                    break
                }
            }
        })
    }

    const onChatRoomMessage = data => {
        const type = data.Type
        const listeners = messageListeners.filter(listener => listener.type === type)
        if (listeners.length > 0){
            listeners.forEach(listener => {
                const handler = listener.module[`on${listener.type}`]
                if (handler)
                    handler(data)
                else
                    error(`No handler for type ${listener.type}`)
            })
        } else {
            error('Unhandled: %O', data)
        }
    }

    const onDataMessage = (type, data) => {
        dataListeners.forEach(listener => listener.onData(type, data))
    }

    const capabilities = window.__abc.capabilities
    const start = () => {
        setTimeout(function(){
            window.__abc.registerListener('ChatRoomMessage', onChatRoomMessage)
            window.__abc.registerAllListener(onDataMessage)
            onCapabilities([capabilities.onStart], module => module.onStart())
            onCapabilities([capabilities.onChat], module => messageListeners.push({ module, type: 'Chat' }))
            onCapabilities([capabilities.onEmote], module => messageListeners.push({ module, type: 'Emote' }))
            onCapabilities([capabilities.onWhisper], module => messageListeners.push({ module, type: 'Whisper' }))
            onCapabilities([capabilities.onAction], module => messageListeners.push({ module, type: 'Action' }))
            onCapabilities([capabilities.onActivity], module => messageListeners.push({ module, type: 'Activity' }))
            onCapabilities([capabilities.onHidden], module => messageListeners.push({ module, type: 'Hidden' }))
            onCapabilities([capabilities.onData], module => dataListeners.push(module))
        }, 2000)
    }

    window.__abc.modules = {
        add: (name, instance) => {
            log(`Added module ${name}`)
            items.push(instance)
        },
        start
    }
})()