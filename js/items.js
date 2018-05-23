var imagesUrl = '/data/item-images/'

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
            currentRow.append(itemElement)
        })

        $.each(itemRows, function(rowIndex, row) {
            itemsContainer.append(row)
        })
    })
}