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
    $('#button-cart-clear').on('click', clearCart)
    $('#button-cart-order').on('click', makeOrder)
})




/* login system */
var loginData = null

function submitLogin(event) {
    $.post({
        url: apiUrl + '/user/login',
        data: $('#login-form').serialize(),
        success: function(response) {
            loginData = response
        },
        error: function(error) {
            console.log(error)
        }
    })
}


/* cart */
var cartItems = []

function addToCart(item) {
    cartItems.push(item)
    reloadCartHtml()
}

function clearCart() {
    cartItems = []
    reloadCartHtml()
}

function reloadCartHtml() {
    $('#list-cart').empty()
    $.each(cartItems, function(index, item) {
        var par = $('<li>' + item.name + '</li>')
        $('#list-cart').append(par)
    })
}

function makeOrder() {
    showQuestion('Are you sure?', function(answer) {
        if(answer === true) {
            showMessage('Not yet implemented')
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