<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include('../header/header')
    <script src={{ asset('./js/logout.js') }}></script>
    <title>Manager Dashboard</title>
</head>
<body>
    <main>Manager Dashboard</main>
    {{ session('name')}}
    <button id="logoutButton">logout</button>
</body>
</html>