 <?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// Load Composer's autoloader
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Initialize an empty message variable
    $msg = "";

    // Loop through all POST data dynamically
    foreach ($_POST as $key => $value) {
        // Check if the value is an array
        if (is_array($value)) {
            // If it's an array, convert it to a string (e.g., comma-separated)
            $sanitized_values = array_map(function($item) {
                return htmlspecialchars($item, ENT_QUOTES, 'UTF-8');
            }, $value);
            
            // Convert the array to a string for display
            $msg .= ucfirst($key) . ": " . implode(", ", $sanitized_values) . "<br>";
        } else {
            // Sanitize the input to prevent XSS attacks
            $sanitized_value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            
            // Append each form field and its value to the message
            $msg .= ucfirst($key) . ": " . $sanitized_value . "<br>";
        }
    }

    // Do something with the dynamic form data
    // echo $msg;
    sendmail($msg);
} else {
    // Handle the case where the request method is not POST
    echo "Invalid request method";
    exit();
}



function sendmail($msg=""){

    $to = "contact.iconicagency@gmail.com";
    // $to = "kevin@jkmholding.com";
    
    $subject = "ICONIC-CREATIVE-AGENCY";


    $mail = new PHPMailer(true);
    try {
                                                    
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;               
        $mail->isSMTP();                                            
        $mail->Host       = 'email-smtp.eu-central-1.amazonaws.com';                    
        $mail->SMTPAuth   = true;                                   
        $mail->Username   = 'AKIAYS2NWFLGCT2OOEEH';                     
        $mail->Password   = 'BF4O7wvGnCfpyRgrWT9FEmG+rLuI0Sl9mgzoZoN84sPO';  
        $mail->SMTPSecure = 'tls';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        // $mail->Port       = 465;
        $mail->Port       = 587;
        $mail->CharSet = 'UTF-8';
        $mail->setFrom('contact.iconicagency@gmail.com', 'ICONIC-CREATIVE-AGENCY');
        
        //Recipients
        $mail->addAddress($to);     // Add a recipient
        $mail->isHTML(true);                                  // Set email format to
        $mail->Subject = $subject;
        $mail->Body    = $msg;



        $mail->send();
        echo "Your submission was successfully sent, we will contact you soon.";
        
        
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        echo "submission could not be sent, try again later";
    }
    

}



?>
