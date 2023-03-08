<!DOCTYPE html>
<html lang="en">
<head>
    @include('./header/header')
    <script src={{asset('./js/login.js')}}></script>
    <title>Dashboard</title>
    
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-500">
                                            <path fill-rule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clip-rule="evenodd" />
                                        </svg>                          
                                    </div>
                                    <input id="loginUsername" type="text" id="input-group-1" class="bg-gray-50 py-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Input Username">
                                    <span clas></span>
                                </div>
                                <div class="relative mb-4">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-500">
                                            <path fill-rule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clip-rule="evenodd" />
                                        </svg>                          
                                    </div>
                                    <input id="loginPassword" type="password" id="input-group-1" class="bg-gray-50 py-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Input Password">
                                    <span clas></span>
                                </div>
                                <div class="w-full mt-6">
                                    <button id="loginButton" class="w-full py-4 bg-red-600 rounded-lg font-bold text-amber-400 text-xl drop-shadow-md transition hover:scale-105">Log In</button>
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