(context => {
    console.log('chatBox.js')

    const log = message => {
        context.log(message, 'CB')
    }

    const onStart = () => {
        log('onStart')
        let n = document.createElement("script")
        n.setAttribute("language", "JavaScript")
        n.setAttribute("crossorigin", "anonymous")
        n.setAttribute("src", "https://lalabcpurple.github.io/chatbox/chatbox.js?_="+Date.now())
        n.onload = () => n.remove()
        document.head.appendChild(n) 
    }

    const onRoomEnter = () => {
        setTimeout(() => new ChatBox('InputChat'), 1000)
    }

    const onRoomLeave = () => {
        // todo
    }

    context.modules.add('chatBox', {
        capabilities: [ 
            context.capabilities.onStart,
            context.capabilities.onRoomEnter,
            context.capabilities.onRoomLeave
        ], 
        onRoomEnter,
        onRoomLeave,
        onStart
    })  

})(window.__abc)