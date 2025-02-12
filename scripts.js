$(document).ready(function () {
    // Populate Regions and Districts using AJAX
    const regionsData = {
        "Arusha": ["Arusha City", "Meru", "Ngorongoro", "Karatu"],
        "Dar es Salaam": ["Ilala", "Kinondoni", "Temeke", "Ubungo"],
        "Dodoma": ["Dodoma Urban", "Bahi", "Chamwino", "Kondoa"],
        // Add more regions and districts as needed
    };

    $.each(Object.keys(regionsData), function (index, region) {
        $('#region').append(new Option(region, region));
    });

    $('#region').change(function () {
        const selectedRegion = $(this).val();
        const districts = regionsData[selectedRegion];

        $('#district').empty().append(new Option('Select District', ''));

        $.each(districts, function (index, district) {
            $('#district').append(new Option(district, district));
        });
    });

    // Form Validation
    $("#registrationForm").submit(function (event) {
        event.preventDefault();

        let isValid = true;
        let message = "";

        // Full Name Validation
        if ($("#fullName").val().trim() === "") {
            message += "<p class='error'>Full Name is required</p>";
            isValid = false;
        }

        // Registration Number Validation
        const regNumberPattern = /^BCS-\d{2}-\d{4}-\d{4}$/;
        if (!regNumberPattern.test($("#regNumber").val().trim())) {
            message += "<p class='error'>Invalid Registration Number format</p>";
            isValid = false;
        }

        // Email Validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test($("#email").val().trim())) {
            message += "<p class='error'>Invalid Email format</p>";
            isValid = false;
        }

        // Password Validation
        const password = $("#password").val().trim();
        const confirmPassword = $("#confirmPassword").val().trim();
        if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
            message += "<p class='error'>Password must be at least 8 characters long and include a special character</p>";
            isValid = false;
        }
        if (password !== confirmPassword) {
            message += "<p class='error'>Passwords do not match</p>";
            isValid = false;
        }

        if (isValid) {
           $.ajax({
            url: '../inludes/signin.inc.php',
            type: 'POST',
            data: $("#registrationForm").serialize(),
            sucess: function (response){
                $("#message").html("<p class='success'>" + response + "</p>")
            },
        error: function() {
            $("#message").html("<p class='error'> error while processing</p>")
        }
            
           });
        } else{
            $("#message").html(message);
        }

       
    });

    // jQuery Animations and Carousel
    $('#carousel').html('<div><img src="image1.jpg" alt="Image 1"></div><div><img src="image2.jpg" alt="Image 2"></div>'); // Add your images here

    // Smooth Scrolling
    $('nav a').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });

    // Dropdown Menu Animation (example)
    $('nav ul li').hover(function() {
        $(this).find('ul').slideDown();
    }, function() {
        $(this).find('ul').slideUp();
    });
});
