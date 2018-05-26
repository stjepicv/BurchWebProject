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



    $('#button-login').on('click', submitLogin)
})


var loginData = null

function submitLogin(event) {
    $.post({
        url: apiUrl + '/user/login',
        data: $('#login-form').serialize(),
        success: function(response) {
            loginData = response
            $('#login-modal').modal('hide')
        },
        error: function(error) {
            console.log(error)
        }
    })
}