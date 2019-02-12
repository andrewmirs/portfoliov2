
$(document).ready(function(){
    $('#send-message').click( sendMessage );
    $('#clear-form').click( clearErrors );
});

function sendMessage(){
    let errors = 0;

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
            regex: /^.{2,}$/,
            message: 'Needs to be at least 2 characters.'
        }
    ]

    for(let i=0; i<testValues.length; i++){
        var value = $(testValues[i].field).val();
        if (testValues[i].regex.test(value)){
            displayError(testValues[i].err, '');
        } else {
            displayError(testValues[i].err, testValues[i].message);
            errors++;
        }
    }

    if( errors > 0 ){
        return
    }

    disableButtons();

    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val();

    $.ajax({
        type: "POST",
        url: "assets/server/mail_handler.php",
        data: {
            name, 
            email,
            message,
        },
        success: function(result){
            clearForm();
            enableButtons();
        },
        error: function(error){
            alert('Error attempting to send message.');
            enableButtons();
        }
    });

}

function displayError( input, message ){
    $(input).text( message );
}

function clearErrors(){
    $('.error-name').text('');
    $('.error-email').text('');
    $('.error-message').text('');
}

function clearForm(){
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
}

function disableButtons(){
    $('#send-message').val('Sending Message');
    $('#send-message').attr('disabled','disabled');
    $('#clear-form').attr('disabled','disabled');
}

function enableButtons(){
    $('#send-message').val('Send Message');
    $('#send-message').removeAttr('disabled');
    $('#clear-form').removeAttr('disabled');
}