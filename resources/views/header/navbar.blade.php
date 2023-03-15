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
                    <p class="text-sm">Acc: <span id="studentName">{{session('name')}}</span></p>
                </div>
                <div id="logoutButton" class="px-4 py-2 border-b-[1px] transition hover:bg-amber-400 hover:bg-rose-600 cursor-pointer">
                    <p class="text-center">Log out</p>
                </div>
            </div>                     
        </div>
    </div>
</nav>