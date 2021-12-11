(context => {
    console.log('dataLogger.js')

    const onData = (type, data) => {
        context.storage.store({
            type,
            data
        }, 'data')
    }

    context.modules.add('data logger', {
        capabilities: [
            context.capabilities.onData,
        ],
        onData
    })   

})(window.__abc)