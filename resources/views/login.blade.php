<!DOCTYPE html>
<html lang="en">
<head>
    @include('./header/header')
    <script src={{asset('./js/login.js')}}></script>
    <title>Login</title>
    
</head>
<body>
    <main class=" w-full h-full lg:h-screen  bg-gray-100">
            <section class=" w-full h-full top-0">
                <div class="relative w-full lg:h-full lg:grid lg:grid-cols-2 p-4">
                    <div class="w-full h-full pb-10 flex items-center justify-center">
                        <div class="flex justify-center items-center flex-col ">
                            <img src={{asset('./assets/login/ctulogo.png')}} alt="" class="w-48 h-48">
                            <div class="font-extrabold text-3xl mt-4 text-center">School Event Management System</div>
                        </div>
                    </div>
                    <div class="w-full h-full flex items-center justify-center">
                        <div id="modalBody"class="w-full lg:w-[70%] bg-white rounded-3xl shadow-md p-4 px-8">
                            <div class="">
                                <div class="text-2xl font-extrabold mb-10">Login to your Account</div>
                                <div class="relative mb-4">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"></path>
                                        </svg>                        
                                    </div>
                                    <input id="loginUsername" type="text" id="input-group-1" class="bg-gray-50 py-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Input Username">
                        
                                </div>
                                <div class="relative mb-4">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"></path>
                                        </svg>                       
                                    </div>
                                    <div id="loginSeepassword" class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    </div>
                                    <input id="loginPassword" type="password" id="input-group-1" class="bg-gray-50 py-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Input Password">
                                    
                                </div>
                                <div class="w-full mt-6">
                                    <button id="loginButtonsubmit" class="w-full py-4 bg-red-600 rounded-lg font-bold text-amber-400 text-xl drop-shadow-md transition hover:scale-105">Log In</button>
                                </div>
                                <div class="w-full mt-8 border-t-2 p-4 flex justify-center">
                                    <button id="createButton" class="w-fit bg-lime-500 px-8 py-4 rounded-lg text-white font-bold transition hover:scale-105">Create New Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            @include('./modal/create')
    </main>
</body>
</html>