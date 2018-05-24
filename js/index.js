var apiUrl = './api'

$(document).ready(function () {
    
    var app = $.spapp({
        templateDir: "./views/"
    })

    app.route({
        view: "items",
        onReady: function() {
            loadItems()
        }
    })

    app.run()
})