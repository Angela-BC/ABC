(context => {
    console.log('bcx.js')

    const log = message => {
        context.log(message, 'BCX')
    }

    const onStart = () => {
        log('onStart')

        if (window.BCX_Loaded === undefined) { 
            log('Adding bcx bootstrapper')

            let n = document.createElement("script")
            n.setAttribute("language", "JavaScript")
            n.setAttribute("crossorigin", "anonymous")
            n.setAttribute("src", "https://jomshir98.github.io/bondage-club-extended/bcx.js?_="+Date.now())
            n.onload = () => n.remove()
            document.head.appendChild(n) 
        } else {
            log('BCX already loaded')
        }
    }

    context.modules.add('bcx', {
        capabilities: [context.capabilities.onStart],
        onStart
    })  

})(window.__abc)