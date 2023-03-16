<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include('../header/header')
    <script src={{ asset('./js/admin.js') }}></script>
    <script src={{ asset('./js/logout.js') }}></script>
    <title>Admin Dashboard</title>
</head>
<body>
    <main class="w-full xl:h-[100dvh] xl:min-h-[100dvh] bg-gray-100 text-gray-700 ">
        @include('/header/navbar')
        <div class="w-full h-[80%] p-4 flex w-full h-full justify-center">
            <div class="">
                <div class="grid xl:grid-cols-3">
                    <div class="m-2">
                        <div class="showEvents max-w-sm p-6 bg-white rounded-lg shadow group transition hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 bg-red-600" title="Show Events Table">
                            <div class="flex">
                                <div class="grow">
                                    <div>
                                        <h5 class="text-amber-400 transition mb-2 text-2xl font-bold tracking-tight ">Events</h5>
                                    </div>
                                    <p class="eventCount mb-3 font-extrabold text-6xl text-gray-700 transition text-green-500  ">0</p>
                                </div>
                                <div class="shrink flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 transition text-white group-hover:animate-bounce">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-2">
                        <div class="showAnnouncements max-w-sm p-6 bg-white rounded-lg shadow group transition hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 bg-red-600" title="Show Events Table">
                            <div class="flex">
                                <div class="grow">
                                    <div>
                                        <h5 class="text-amber-400 transition mb-2 text-2xl font-bold tracking-tight ">Announcements</h5>
                                    </div>
                                    <p class="announcementCount mb-3 font-extrabold text-6xl text-gray-700 transition text-green-500  ">0</p>
                                </div>
                                <div class="shrink flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 transition text-white group-hover:animate-bounce">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                                      </svg>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-2">
                        <div class="showRawlogs max-w-sm p-6 bg-white rounded-lg shadow group transition hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 bg-red-600" title="Show Events Table">
                            <div class="flex">
                                <div class="grow">
                                    <div>
                                        <h5 class="text-amber-400 transition mb-2 text-2xl font-bold tracking-tight ">Rawlogs</h5>
                                    </div>
                                    <p class="rawlogsCount mb-3 font-extrabold text-6xl text-gray-700 transition text-green-500  ">0</p>
                                </div>
                                <div class="shrink flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 transition text-white group-hover:animate-bounce">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                      </svg>                                                                       
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid xl:grid-cols-3">
                    <div class="m-2">
                        <div class="showAdmin max-w-sm p-6 bg-white rounded-lg shadow group transition hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 bg-red-600" title="Show Events Table">
                            <div class="flex">
                                <div class="grow">
                                    <div>
                                        <h5 class="text-amber-400 transition mb-2 text-2xl font-bold tracking-tight ">Admin</h5>
                                    </div>
                                    <p class="adminCount mb-3 font-extrabold text-6xl text-gray-700 transition text-green-500  ">0</p>
                                </div>
                                <div class="shrink flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 transition text-white group-hover:animate-bounce">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                      </svg>                                 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-2">
                        <div class="showStudents max-w-sm p-6 bg-white rounded-lg shadow group transition hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 bg-red-600" title="Show Events Table">
                            <div class="flex">
                                <div class="grow">
                                    <div>
                                        <h5 class="text-amber-400 transition mb-2 text-2xl font-bold tracking-tight ">Students</h5>
                                    </div>
                                    <p class="studentCount mb-3 font-extrabold text-6xl text-gray-700 transition text-green-500  ">0</p>
                                </div>
                                <div class="shrink flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 transition text-white group-hover:animate-bounce">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                      </svg>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-2">
                        <div class="showCourses max-w-sm p-6 bg-white rounded-lg shadow group transition hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 bg-red-600" title="Show Events Table">
                            <div class="flex">
                                <div class="grow">
                                    <div>
                                        <h5 class="text-amber-400 transition mb-2 text-2xl font-bold tracking-tight ">Courses</h5>
                                    </div>
                                    <p class="coursesCount mb-3 font-extrabold text-6xl text-gray-700 transition text-green-500  ">0</p>
                                </div>
                                <div class="shrink flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 transition text-white group-hover:animate-bounce">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                      </svg>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    @include('/admin/modals/eventModal')
    @include('/admin/modals/announcementModal')
    @include('/admin/modals/rawlogsModal')
    @include('/admin/modals/adminModal')
    @include('/admin/modals/studentModal')
    @include('/admin/modals/coursesModal')
    @include('/admin/modals/editTimeModal')
</body>
</html>