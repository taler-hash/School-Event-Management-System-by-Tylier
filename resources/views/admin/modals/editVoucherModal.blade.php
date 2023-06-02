<div id="editVoucherModal" tabindex="-1" aria-hidden="true" class="fixed invisible transition opacity-0 bg-gray-600/50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-hidden md:inset-0 h-screen md:h-full flex items-center justify-center">
    <div class="relative w-full h-screen max-w-sm md:h-auto">
        <!-- Modal content -->
        <div id="editVoucherModalContent" class="relative bg-white rounded-lg shadow transition scale-0 duration-500 h-auto border border-gray-400 shadow-md shadow-gray-400">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                    Edit Voucher
                </h3>
                <button id="editVoucherClose" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <!-- Modal body -->
            <div class="p-6 h-80 overflow-y-auto">
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Event ID</label>
                    <input type="text" id="editVoucherEventId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readonly>
                </div>
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Student ID</label>
                    <input type="text" id="editVoucherStudentId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readonly>
                </div>
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Fullname</label>
                    <input type="text" id="editVoucherFullname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readonly>
                </div>
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Course</label>
                    <input type="text" id="editVoucherCourse" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readonly>
                </div>
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Entrance Voucher</label>
                    <select id="editVoucherEntrance" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="Vouched">Vouched</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900">Exit Voucher</label>
                    <select id="editVoucherExit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Not Vouched</option>
                        <option value="Vouched">Vouched</option>
                    </select>
                </div>
            </div>
            <div class="flex items-center justify-center w-full p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button id="editVoucherButtonsubmit" data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
            </div>
        </div>
    </div>
</div>