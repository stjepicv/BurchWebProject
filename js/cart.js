var cartItems = []

function addToCart(item) {
    cartItems.push(item)
    reloadCartHtml()
}

function reloadCartHtml() {
    $('#cart-panel .panel-body').empty()
    $.each(cartItems, function(index, item) {
        var par = $('<p>' + item.name + '</p>')
        $('#cart-panel .panel-body').append(par)
    })
}