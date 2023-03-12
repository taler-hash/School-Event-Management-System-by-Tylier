<div id="showInfoEvent" tabindex="-1" aria-hidden="true" class="fixed invisible transition h-screen opacity-0 bg-gray-100/50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen md:h-full flex items-center justify-center">
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
                                <input id="showInfoHeader" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " readonly placeholder="Input Header" required>
                            </div>
                            <div class="mt-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                <textarea id="showInfoDescription" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " readonly placeholder="Input Header" required></textarea>
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
                                Create Voucher
                            </button>
                           <button id="showInfoPrintVoucher" class="text-white h-fit bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Print Voucher
                            </button>
                        </div>
                    </div>
                    <div class="p-6">sdasdasdasdasdas</div>
                </div>
            </div>
        </div>
    </div>
</div>