<div id="showInfoEvent" tabindex="-1" aria-hidden="true" class="fixed invisible transition h-screen opacity-0 bg-gray-600/50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-full flex items-center justify-center">
    <div class="relative w-full h-full max-w-full md:h-auto">
        <!-- Modal content -->
        <div id="showInfoModalContent" class="relative bg-white xl:min-h-[95vh]  rounded-lg shadow transition scale-0 duration-500">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                    Event Information
                </h3>
                <button id="showInfoClose" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class=" h-[90%] w-full">
                <div class="w-full h-full xl:grid xl:grid-cols-3 gap-y-2">
                    <div class="col-span-1 border-r-[1px] p-6 h-[100%]">
                        <div class="w-full h-[70dvh] overflow-y-auto">
                            <div class="mt-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">Event ID</label>
                                <input id="showInfoEventId" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " readonly placeholder="Input Header" required>
                            </div>
                            <div class="mt-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">Header</label>
                                <input id="showInfoHeader" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " readonly placeholder="Input Header" >
                            </div>
                            <div class="mt-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                <textarea id="showInfoDescription" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " readonly placeholder="Input Header"></textarea>
                            </div>
                            <div class="mt-2">
                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                                    Courses to See
                                </label>
                                <div id="showInfoCourses"class="min-h-[2.4rem] relative flex flex-wrap bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-10"></div>
                                <div class="text-xs mt-1 text-gray-500 italic">Total Students to See:<span id="showInfoTotal"></span></div>
                            </div>
                            <div class="mt-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">Date</label>
                                <input id="showInfoDate" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "readonly placeholder="Input Header" required>
                                <div class="text-xs mt-1 text-gray-500 italic">From <span id="showInfoFrom" class=""></span> to <span id="showInfoTo" class=""></span></div>
                            </div>
                        </div>
                        <div class="h-[10%] flex justify-between items-center">
                            <button id="showInfoCreateVoucher" class="text-white h-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Generate Voucher
                            </button>
                           <button id="showInfoPrintVoucher" class="text-white h-fit bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Print Voucher
                            </button>
                        </div>
                    </div>
                    <div class="p-6 col-span-2">
                        <div class="w-full h-full">
                            <div class="w-full max-h-[31.5rem] overflow-x-auto overflow-y-auto">
                                <div class="w-full flex justify-between mb-1 items-center">
                                    <button class="refreshShowInfoTable w-6 h-6 group hover:scale-105 transition hover:text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 group-hover:text-red-600 transition">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                          </svg>
                                          
                                        </button>
                                    <div class="flex">
                                        <div class="mr-2 flex space-x-2 items-center justify-center">                                              
                                            <label for="countries" class="block text-sm font-medium text-gray-900">Sort Course</label>
                                            <select id="showInfoSortCourse" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 ">
                                                <option value="asc">ASC</option>
                                                <option value="desc">DESC</option>
                                            </select>
                                        </div>
                                        <div class="flex items-center w-64">   
                                            <label for="simple-search" class="sr-only">Search</label>
                                            <div class="relative w-full">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                                </div>
                                                <input type="text" id="searchInputShowInfoTable" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search" required>
                                            </div>
                                            <button type="submit" id="searchButtonShowInfoTable" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                <span class="sr-only">Search</span>
                                            </button>
                                            <div class="">
                                                <button id="printPresentStudentInfoTable" class="p-2.5 ml-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                                  </svg>  
                                                </button>                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <table id="showInfoTable" class=" w-full text-sm text-left text-gray-500">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                #
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Student ID
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Name
                                            </th>
                                             <th scope="col" class="px-6 py-3">
                                                Course
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                In
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Out
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="showInfoTable">
                                        
                                    </tbody>
                                </table>
                                <div class="paginationContainer flex w-full justify-end mt-2">

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>