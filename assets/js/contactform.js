
$(document).ready(function(){
    $('#send-message').click( sendMessage );
    $('#clear-form').click( clearErrors );
});

function sendMessage(){
    const email = $("#email").val();

    const testValues = [
        {
            field: '#name',
            err: '.error-name',
            regex: /^[A-Za-z ]{2,25}$/,
            message: 'Needs to be at least 2 characters. Letters only.'
        },
        {
            field: '#email',
            err: '.error-email',
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Needs to be proper email format. Example: test@mail.com'
        },
        {
            field: '#message',
            err: '.error-message',
            regex: /^[A-Za-z ]{2,}$/,
            message: 'Needs to be at least 2 characters. Letters and punctuation characters only.'
        }
    ]

    for(let i=0; i<testValues.length; i++){
        var value = $(testValues[i].field).val();
        if (testValues[i].regex.test(value)){
            displayError(testValues[i].err, '');
        } else {
            displayError(testValues[i].err, testValues[i].message);
        }
    }
}

function displayError( input, message ){
    $(input).text( message );
}

function clearErrors(){
    $('.error-name').text('');
    $('.error-email').text('');
    $('.error-message').text('');
}