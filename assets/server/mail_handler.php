<?php
    require_once('email_config.php');
    require_once('phpmailer/PHPMailer/src/Exception.php');
    require_once('phpmailer/PHPMailer/src/PHPMailer.php');
    require_once('phpmailer/PHPMailer/src/SMTP.php');

    foreach($_POST as $key=>$value){
        $_POST[$key] = htmlentities( addslashes( $value ));
    }

    $mail = new PHPMailer\PHPMailer\PHPMailer;
    $mail->SMTPDebug = 3;           // Enable verbose debug output. Change to 0 to disable debugging output.

    $mail->isSMTP();                // Set mailer to use SMTP.
    $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
    $mail->SMTPAuth = true;         // Enable SMTP authentication


    $mail->Username = EMAIL_USER;   // SMTP username
    $mail->Password = EMAIL_PASS;   // SMTP password
    $mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
    $mail->Port = 587;              // TCP port to connect to
    $options = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->smtpConnect($options);
    $mail->From = 'mirshafiee.server@gmail.com';  // sender's email address (shows in "From" field)
    $mail->FromName = 'Portfolio Mailer';   // sender's name (shows in "From" field)
    $mail->addAddress('andrewmirs@csu.fullerton.edu', 'Andrew');  // Add a recipient (name is optional)
    //$mail->addAddress('ellen@example.com');                        // Add a second recipient
    $mail->addReplyTo($_POST['email']);                          // Add a reply-to address
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML
    
    date_default_timezone_set("America/Los_Angeles");
    $mail->Subject = "Mailer Message from ".$_POST['name'];
    $mail->Body    = "
            time: ".date('m-d-Y h:i:sa')."<br>
            name: {$_POST['name']}<br>
            email: {$_POST['email']}<br>
            message: {$_POST['message']}
    ";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
?>
