<!DOCTYPE html>
<html>
<head>
<title>Thank You for connecting with Study Spectrum</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
    body{
        padding: 1em 2em;
    }
    button{
        margin: 1em 0;
        background: #e20574;
        border: none;
        padding: 1em 2em;
        color: #fff;
        border-radius: 5px;
    }
    button a{
        color: #fff;
        text-decoration: none;
    }
    a.ssy{
        color:  #e20574;
    }
    .logo-img{
        max-width: 130px;
        height: auto;
    }
</style>
	
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <h2>Dear {{ $x['name'] }}, </h2>
    <p>Thanks for connecting with us.</p>
    <p>The details provided by you are: </p>
    <p><strong>Email:</strong> {{ $x['email'] }}</p>
    <p><strong>Phone:</strong> {{ $x['phone'] }}</p>
    <p><strong>Message:</strong> {{ $x['message'] }}</p>

    <p>We will reach back to you</p>
    
    <p>You might also want to check and subscribe our <a class="ssy" target="_blank" href="https://www.youtube.com/studyspectrum">Youtube channel<a>.</p><br><br>
    <p>Warm Regards</p>
    <h2>Team Study Spectrum</h2>
    <a  target="_blank" href="htttp://www.studyspectrum.com"><img class="logo-img" src="http://www.studyspectrum.com/images/sslogo.png" alt=""></a>
		
</body>
</html>