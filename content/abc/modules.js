(() => {
    let items = []

    const log = message => window.__abc.log(message)

    window.__abc.modules = {
        add: (name, instance) => {
            log(`Added module ${name}`)
            items.push(instance)
        },
        selectAll: () => items
    }
})()