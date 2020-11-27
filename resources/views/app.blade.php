<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="base-url" content="{{ url('/') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <link rel='stylesheet' href="{{asset('css/semantic.css')}}" type='text/css' />
    <link rel='stylesheet' href="{{asset('css/bootstrap.css')}}" type='text/css' />
    <link rel='stylesheet' href="{{asset('css/swiper.css')}}" type='text/css' />
    <link rel='stylesheet' href="{{asset('css/style.css')}}" type='text/css' />
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
    <script
    src="https://www.paypal.com/sdk/js?client-id=AdP_dAB-OdjBrjW82kPIZBlFcL7t-vBlYKyQw1hl6WgHVrb55QLRnCD9ntzT-ekfjiKfOvYCrCLRVHLt"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
  </script>
</head>
<body>
        <div id="root"></div>
        <script src="{{asset('/js/app.js')}}"></script>
        {{--  <script src="{{asset('js/bootstrap.js')}}"></script>  --}}
</body>
</html>