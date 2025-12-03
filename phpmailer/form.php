<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Do something with the data, for example, you can echo it back
    echo "Name: $name\n";
    echo "Last Name: $lastname\n";
    echo "Email: $email\n";
    echo "Message: $message\n";
} else {
    // Handle the case where the request method is not POST
    echo "Invalid request method";
}
?>
