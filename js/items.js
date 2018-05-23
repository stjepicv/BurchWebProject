var imagesUrl = './data/item-images/'

function loadItems() {
    $.get(apiUrl + '/items', function(items) {
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
            
            if(item.images.length > 0) {
                itemElement.find('.item-image').attr('src', imagesUrl + item.images[0].filename)
            } else {
                itemElement.find('.item-image').parent().remove()
            }

            currentRow.append(itemElement)
        })

        $.each(itemRows, function(rowIndex, row) {
            itemsContainer.append(row)
        })
    })
}