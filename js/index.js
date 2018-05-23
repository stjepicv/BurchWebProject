var apiUrl = 'api'

$(document).ready(function () {
    var app = $.spapp({
        templateDir: "./views/"
    })

    app.route({
        view : "view-items",
        load : "items.html",
        onCreate: function() {  },
        onReady: function() {
            loadItems()
        }
      })

    app.run()
})