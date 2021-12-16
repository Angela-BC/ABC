(context => {
    console.log('dataLogger.js')

    const log = (message, ...args) => window.__abc.log(message, 'DL', ...args)

    const onData = (type, data) => {
        context.storage.store({
            type,
            data
        }, 'data')
        // log(`OnData: ${type} ${data} %O`, data)
    }

    context.modules.add('data logger', {
        capabilities: [
            context.capabilities.onData,
        ],
        onData
    })   

})(window.__abc)