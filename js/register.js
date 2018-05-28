
$('#register-form').on('submit', function(e) {
    e.preventDefault()

    $.post({
        url: apiUrl + '/user/register',
        data: $(this).serialize(),
        success: function(response) {
            showMessage('You have registered successfully')
        },
        error: function(error) {
            showMessage('Something went wrong')
            console.log(error)
        }
    })
})
/*
$('#register-form').validate({
    rules: {
        email: {
            email: true
        },
        username: {
            minlength: 5,
            maxlenght: 30
        },
        password: {
            minlength: 6,
            maxlenght: 50
        },
        password2: {
            minlength: 6,
            maxlenght: 50
        }
    },
    submitHandler: function(form) {
        console.log(form)
    }
})
*/