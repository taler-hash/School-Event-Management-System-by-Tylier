<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include('../header/header')
    <script src={{ asset('./js/logout.js') }}></script>
    <script src={{ asset('./js/manager.js') }}></script>
    <title>Dashboard</title>
</head>
<body>
    <main class="w-full h-screen min-h-screen bg-gray-100 text-gray-700 ">
        <nav class="w-full h-fit sticky top-0 px-2 lg:px-6 py-2  shadow-md bg-white z-50">
            <div class="flex justify-between">
                <div class="flex items-center space-x-4 h-full">
                    <img src={{asset("/assets/login/ctulogo.png")}} alt="" class="h-16">
                    <div class="font-bold text-xl">CTU Consolacion</div>
                </div>
                <div class="relative flex items-center">
                    <button id="managerShowoption" class=" w-fit px-6 h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 transition hover:text-rose-600">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                          </svg>                          
                    </button>
                    <div id="managerOption" class="absolute transition scale-0 top-12 right-8 w-40 h-fit shadow-md bg-white rounded-md border overflow-hidden">
                        <div class="p-4 border-b-[1px]">
                            <p class="text-sm">Acc: {{session('name')}}</p>
                        </div>
                        <div id="logoutButton" class="px-4 py-2 border-b-[1px] transition hover:bg-amber-400 hover:bg-rose-600">
                            <p class="text-center">Log out</p>
                        </div>
                    </div>                     
                </div>
                
            </div>
        </nav>
        <div class="w-full h-[80%] xl:grid xl:grid-cols-3">
            <div class="col-span-2 h-full px-6 p-4 overflow-y-hidden">
                <div class="flex space-x-2 pb-4 sticky top-0  ">
                    <p class="text-2xl font-extrabold">Events</p>
                    <button id="newEventButton" class="transition hover:text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
                          </svg>
                    </button>
                </div>
                <div class=" flex justify-center flex-wrap overflow-y-auto h-[100%] pb-10">
                    <div class="max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow  m-4">
                        <a href="#">
                            <img src={{asset('./assets/login/intrams.jpg')}} alt="" class="">
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-red-600 rounded-lg hover:bg-green-600 transition">
                                Read more
                                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1 h-full px-6 p-4 bg-gray-100 overflow-y-hidden">
                <div class="flex space-x-2 pb-4">
                    <p class="text-2xl font-extrabold">Announcement</p>
                    <button id="newAnnouncementButton" class="transition hover:text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
                          </svg>
                    </button>
                </div>
                <div class=" flex justify-center flex-wrap overflow-y-auto h-[100%] pb-10">
                    
                    <div class="max-w-sm h-fit p-6 m-4 bg-white border border-gray-200 rounded-lg shadow">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-red-600 rounded-lg hover:bg-green-600 transition">
                            Read more
                            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        @include("./manager/modal/newEvent")
        @include("./manager/modal/newAnnouncement")
    </main>
</body>
</html>