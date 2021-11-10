(context => {

    const modules = context.modules.selectAll()
    modules.forEach(module => module?.onStart())

})(window.__abc)
