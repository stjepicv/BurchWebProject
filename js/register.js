$('#register-form').on('submit', function(e) {
    e.preventDefault()

    $.post({
        url: apiUrl + '/user/register',
        data: $(this).serialize(),
        success: function(response) {
        },
        error: function(error) {
        }
    })
})

$('#register-form').validate({
})