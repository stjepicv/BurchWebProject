var apiUrl = './api'

$(document).ready(function () {
    
    var app = $.spapp({
        templateDir: "./views/"
    })

    app.route({
        view: "items"
    })

    app.run()



    $('#button-login').on('click', submitLogin)
    $('#button-show-login').on('click', function() {
        if(loginData == null) {
            $('#login-modal').modal('show')
        }
        else {
            loginData = null
            showMessage('You have logged out')
            $('#button-login-text').html('Login')
        }
    })
})




/* login system */
var loginData = null

function submitLogin(event) {
    $.post({
        url: apiUrl + '/user/login',
        data: $('#login-form').serialize(),
        success: function(response) {
            loginData = response
            $('#button-login-text').html('Logout')
            $('#login-modal').modal('hide')
            showMessage('You have logged in successfully')
        },
        error: function(error) {
            console.log(error)
            showMessage('Login was unsuccessfull, please try again')
        }
    })
}






/* message modal */
function showMessage(message) {
    var modal = $('#message-modal')
    modal.find('p').html(message)
    modal.modal('show')
}

function showQuestion(question, callback) {
    var modal = $('#question-modal')
    modal.find('p').html(question)
    var yesCallback = function() {
        callback(true)
        modal.find('#button-question-yes').off('click', yesCallback)
    }
    var noCallback = function() {
        callback(false)
        modal.find('#button-question-no').off('click', noCallback)
    }

    modal.find('#button-question-yes').on('click', yesCallback)
    modal.find('#button-question-no').on('click', noCallback)

    modal.modal('show')
}