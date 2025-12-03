<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <form id="contactform" class="contact-form" method="post">
        <div id="success" class="successform"></div>

        <div class="form-group">
            <input type="text" required="" class="form-control input-custom input-full" name="name" placeholder="First Name">
        </div>
        <div class="form-group">
            <input type="text" required="" class="form-control input-custom input-full" name="lastname" placeholder="Last Name">
        </div>
        <div class="form-group">
            <input type="email" class="form-control input-custom input-full" name="email" placeholder="Email" required>
        </div>
        <div class="form-group">
            <textarea class="form-control textarea-custom input-full" id="ccomment" name="message" required="" rows="8" placeholder="Message"></textarea>
        </div>
        <div class="box bg-3">
            <button type="submit" id="submit-contact" class="button button--wayra button--border-thick button--text-upper button--size-s">
                Submit
            </button>
        </div>
    </form>

    <script>
        $(document).ready(function(){
            $('#contactform').submit(function(e){
            	e.preventDefault();
            	$('#submit-contact').prop('disabled', true).text('please wait...');
            	
                var formData = $('#contactform').serialize();
                $.ajax({
                    type: 'POST',
                    url: 'function.php',
                    data: formData,
                    success: function(response){
                        alert(response);
                        $('#contactform')[0].reset();
                        $('#submit-contact').prop('disabled', false).text('Submit');
                    },
                    error: function(xhr, status, error){
                        alert("error, please try again later");
                        console.error(xhr.responseText);
                    }
                });
            });
        });
    </script>
</body>
</html>
