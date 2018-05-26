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