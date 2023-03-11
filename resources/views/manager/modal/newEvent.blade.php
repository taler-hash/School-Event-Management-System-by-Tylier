<div id="newEventModal" tabindex="-1" aria-hidden="true" class="fixed invisible transition opacity-0 bg-gray-100/50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-screen md:h-full flex items-center justify-center">
    <div class="relative w-full h-full max-w-lg md:h-auto">
        <!-- Modal content -->
        <div id="newEventModalContent" class="relative bg-white rounded-lg shadow transition scale-0 duration-500">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                    Create Event
                </h3>
                <button id="newEventClose" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-4 overflow-y-auto h-96">
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 " for="file_input">Header Picture</label>
                    <input id="newEventPicture" class="block py-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" type="file" accept="image/*">
                    <p class=" text-xs text-gray-500 " >SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Text Header</label>
                    <input id="newEventHeader" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Input Header" required>
                </div>
                <div class="">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <input type="text" id="newEventDescription" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Input Description" required>
                </div>
                <div class="">
                    <div class="lg:flex justify-between">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 flex items-center">
                            Choose a Course to See 
                            <button id="" class="newEventSelectAllChoices ml-1 px-1 text-sm bg-lime-500 text-white transition hover:bg-red-600 rounded py-0.5">Select All</button>
                        </label>
                        <div class="text-sm flex items-center space-x-2">
                            <span class="newEventTotalStudents font-bold">0</span> :Total Students 
                        </div>
                    </div>
                    <div id="" class="multiSelectNewEvent relative flex flex-wrap bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-10">
                        <button id="" class="multiSelectCaretNewEvent absolute cursor-pointer top-0 right-0 h-full items-center flex px-2 border-l-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div id="" class="multiSelectResultsNewEvent absolute transition scale-0 top-12 h-48 w-full min-h-fit rounded-md border bg-white left-0 overflow-x-hidden overflow-y-auto">
                        </div>
                        <div id="" class="choiceswrapperNewEvent flex min-h-[2rem] flex-wrap">
                            
                        </div>
                    </div>
                </div>
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Start Date</label>
                    <input type="date" id="newEventDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Input Description" required>
                </div>
                <div class="">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Time</label>
                    <div class="grid grid-cols-2 gap-x-2">
                        <div class="">
                            <label class="block mb-2 text-xs font-medium text-gray-900 ">From</label>
                            <input id="newEventStartTime" type="time" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        </div>
                        <div class="">
                            <label class="block mb-2 text-xs font-medium text-gray-900 ">To</label>
                            <input type="time" id="newEventEndTime" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-center w-full p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button id="newEventButtonsubmit" data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create</button>
            </div>
        </div>
    </div>
</div>