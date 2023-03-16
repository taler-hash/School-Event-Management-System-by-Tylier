<div id="announcementModal" tabindex="-1" aria-hidden="true" class="fixed invisible transition opacity-0 bg-gray-100/50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-screen md:h-full flex items-center justify-center">
    <div class="relative w-full h-auto max-w-6xl md:h-auto">
        <!-- Modal content -->
        <div id="announcementModalContent" class="relative bg-white rounded-lg shadow transition scale-0 duration-500 h-auto">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                    Announcement Info
                </h3>
                <button id="announcementClose" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-4">
                <div class="">
                    <div class="flex justify-end">
                        <div class="relative w-72 mb-2">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" class="searchInputAnnouncements block w-full p-4 pl-10 pr-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." required>
                            <button type="submit" class="searchBarAnnouncements text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                        </div>
                    </div>
                    <div class="relative overflow-x-auto min-h-fit max-h-[70vh]">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Header
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Created By
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Courses
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center">
                                        Date Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="tableDataAnnouncements">
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-end mt-2">
                        
                        <div class="paginationContainer">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>