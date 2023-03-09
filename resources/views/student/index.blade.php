<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include('../header/header')
    <script src={{ asset('./js/logout.js') }}></script>
    <title>Dashboard</title>
</head>
<body>
    <main class="w-full h-screen bg-gray-100 text-gray-700">
        <nav class="w-full h-fit px-6 py-2  shadow-md">
            <div class="flex justify-between">
                <div class="flex items-center space-x-4 h-full">
                    <img src={{asset("/assets/login/ctulogo.png")}} alt="" class="h-16">
                    <div class="font-bold text-xl">CTU Consolacion</div>
                </div>
                
                <div class="flex items-center">
                    <ul class="flex space-x-4">
                        <li class="text-black text-rose-600">Dashboard</li>
                        <li class="">Announcement</li>
                    </ul>
                    <button class=" w-fit px-6 h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 transition hover:scale-105">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                          </svg>                          
                    </button>                     
                </div>
            </div>
        </nav>
    </main>
</body>
</html>