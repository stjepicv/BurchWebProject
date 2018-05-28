var imagesUrl = './data/item-images/'

$.get(apiUrl + '/items', function(items) {
    console.log(items)
    var itemsContainer = $('#items-container')
    var itemTemplate = $('#item-template').html()

    var currentRow = null
    var itemRows = []

    $.each(items, function(itemIndex, item) {
        if(itemIndex % 3 == 0) {
            currentRow = $('<div class="row"></div>')
            itemRows.push(currentRow)
        }

        var itemElement = $(itemTemplate)
        itemElement.find('.item-name').html(item.name)
        itemElement.find('.item-description').html(item.description)
        itemElement.find('.item-price').html(item.price)
        
        if(item.images.length > 0) {
            itemElement.find('.item-image').attr('src', imagesUrl + item.images[0].filename)
        } else {
            itemElement.find('.item-image').parent().remove()
        }

        itemElement.find('.btn-add-cart').data('item', item)
        itemElement.find('.btn-add-cart').on('click', function() {
            var item = $(this).data('item')
            addToCart(item)
        })

        currentRow.append(itemElement)
    })

    itemsContainer.empty()
    $.each(itemRows, function(rowIndex, row) {
        itemsContainer.append(row)
    })
})




/* cart */

$('#button-cart-clear').on('click', clearCart)
$('#button-cart-order').on('click', makeOrder)

var cartItems = []

function addToCart(item) {
    cartItems.push(item)
    reloadCartHtml()
}

function removeFromCart(removeIndex) {
    var newCart = []
    $.each(cartItems, function(index, oldItem) {
        if(index != removeIndex) {
            newCart.push(oldItem)
        }
    })

    cartItems = newCart
    reloadCartHtml()
}

function clearCart() {
    cartItems = []
    reloadCartHtml()
}

function reloadCartHtml() {
    var cart = $('#cart-panel .panel-body')
    cart.empty()
    var itemTemplate = $('#cart-item-template').html()

    $.each(cartItems, function(index, item) {
        var itemElement = $(itemTemplate)
        itemElement.find('.item-name').html(item.name)
        itemElement.find('.button-remove').data('item-index', index)
        itemElement.find('.button-remove').on('click', function() {
            removeFromCart(index)
        })
        cart.append(itemElement)
    })
}

function makeOrder() {
    if(cartItems.length == 0) {
        showMessage('Put some items in your cart first')
    }
    else if(loginData == null) {
        showMessage('You have to log in first')
    }
    else {
        showQuestion('Are you sure you want to make this order?', function(answer) {
            if(answer === true) {
                $.post({
                    url: apiUrl + '/order/create',
                    data: {
                        'token': loginData.token,
                        'itemIds': $.map(cartItems, function(item) {
                            return item.id
                        })
                    },
                    success: function(response) {
                        showMessage('Order created successfully')
                    },
                    error: function(error) {
                        showMessage('There was an error while creating the order')
                    }
                })
            }
        })
    }
}