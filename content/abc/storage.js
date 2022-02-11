(()=>{
    let maxKeyCount = 100
    let checkCount = 10
    let counter = 1000000
    let cleanupCounter = 0
    let prefix = ''
    const extensionId = window.__abc.getScriptParameter('storage.js', 'id')

    function createPrefixFromDate(date){
        let result = 0
        result = date.getFullYear()
        result = result * 100 + (date.getMonth()+1) % 100
        result = result * 100 + date.getDate() % 100
        result = result * 100 + date.getHours() % 100
        result = result * 100 + date.getMinutes() % 100
        return result.toString()
    }

    function nextPrefix() {
        var result = prefix + counter.toString()
        counter = counter + 1
        return result
    }

    function createDatePrefix(){
        const now = new Date()
        prefix = createPrefixFromDate(now)
    }

    function cleanup() {       
        if (localStorage.length > maxKeyCount){
            const keys = Object.keys(localStorage).sort()
            let count = keys.length
            let index = 0    
            while(count > maxKeyCount){
                const key = keys[index]
                if (key.charAt(0) !== '_') {
                    localStorage.removeItem(key)
                    count = count - 1
                } 
                index++
                if (index >= keys.length) {
                    break
                }
            }
        }
    }

    createDatePrefix()
    cleanup()
    setInterval(createDatePrefix, 1000 * 60)
    setInterval(cleanup, 1000 * 60 * 60)

    function storeData(data, context){
        const key = `${nextPrefix()}-${context}`
        localStorage.setItem(key, JSON.stringify(data))
        chrome.runtime.sendMessage(extensionId, {
            key,
            data,
            type: 'data'
        });

        cleanupCounter++
        if (cleanupCounter > checkCount) {
            cleanup()
            cleanupCounter = 0
        }
    }

    window.__abc.storage = {
        store: storeData,
        cleanup
    }
})() 

