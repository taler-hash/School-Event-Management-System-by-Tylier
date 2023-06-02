$(document).ready(function(){

    let courses = []
    let results = []
    let students = []
    let events = []
    let announcement = []
    let searchString = ""
    let eventId = ""
    let sortBy = 'desc'
    let rows = 10
    let total = 0
    //Fetch Course
    function fetchCourse()
    {
        $.ajax({
            headers:header,
            url:'/api/course',
            method:'get',
            success:function(res){
                courses = res.map((e, i)=>{
                    return {course: e.course, isDefault: true}
                })
            },
            error:function(){
            }
        })
    }
    
    //Fetch Students
    function fetchStudents()
    {
        $.ajax({
            headers:header,
            url:'/api/students',
            method:'get',
            success:function(res){
                students = res;
            }
        })
    }

    //Fetch Events
    async function fetchEvents(){
        let  result = await $.ajax({
            headers:header,
            url:'/api/events',
            data:
            {
                createdBy:$("#managerName").text()
            },
            method:'post',
            success:function(res)
            {
                events = res.map(e=>( {...e, courses:e.courses.split(",")}))
                return res
            },
            error:function(err)
            {
                console.log(err)
            }
        })
        return result
    }
    
    
    //Fetch Announcement
    async function fetchAnnouncement(){
        let result = await $.ajax({
            headers:header,
            url:'/api/announcement',
            method:'post',
            data:
            {
                createdBy:$("#managerName").text()
            },
            success:function(res)
            {
                announcement = res.map(e=>( {...e, courses:e.courses.split(",")}))
                return res
            },
            error:function(err)
            {
                console.log(err)
            }
            
        })
        return result
    }

    //Refresh Announcement
    function refreshAnnouncement(){
        fetchAnnouncement().then(()=>{

            announcement.length !== 0 
            ?
                $("#managerAnnouncementContainer").html(
                    announcement.map(e=>{
                        return `<div class="w-full h-fit p-6 m-4 bg-white border border-gray-200 rounded-lg shadow">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                ${e.header}
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            ${e.description}
                        </p>
                        <button id="deleteAnnouncement" data-announcementid="${e.announcement_id}"  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-red-600 rounded-lg hover:bg-green-600 transition">
                            Delete
                        </button>
                    </div>`
                    })
                )
            :
            $("#managerAnnouncementContainer").html(
                `<div class="font-bold flex items-center">
                    No New Announcement    
                </div>`)
        })
    }

    //RefreshEvents
    function refreshEvents()
    {
        fetchEvents().then(data=>{
            data.length !== 0 ? 
            $("#managerEventsContainer").html(
                data.map(e=>{
                    return `<div class="eventModal max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow  m-4">
                    <a href="#">
                        <img src="http://${window.location.host}/images/${$("#managerName").text()}/${e.picture}" alt="Event Picture" class="rounded-t-md">
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class=" text-2xl font-bold tracking-tight text-gray-900">${e.header}</h5>
                        </a>
                        <p class="text-gray-500 text-xs italic">Created: ${e.created_date}</p>
                        <p class="text-gray-500 text-xs mb-2 italic">Students: ${e.total_students}</p>
                        <p class="mb-3 font-normal text-gray-700 ">${e.description}</p>
                        <div class="w-full flex justify-between">
                        <button id="showInfoButton" data-eventid="${e.event_id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-lime-600 rounded-lg hover:bg-green-600 transition">
                            Show Info
                        </button>
                        <button id="deleteEvent" data-eventid="${e.event_id}" data-img="${e.picture}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-red-600 rounded-lg hover:bg-green-600 transition">
                            Delete
                        </button>
                        </div>
                    </div>
                </div>`
                })
            )
            :
            $("#managerEventsContainer").html(
            `<div class="font-bold flex items-center">
                No New Events    
            </div>`
            )
        })
    }
    $.when(refreshEvents(), refreshAnnouncement(),fetchCourse(),fetchStudents())
    //EVENTS Functions-----------------------------------------

    //Convert Time Function
    function convertTime(data)
    {
        let time = data.split(':');// here the time is like "16:14"
        let meridiemTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
        return meridiemTime
    }

    //SHOW INFO Function ---------------------------------------


    //loadingButton Show Info
    function loadingButtonShowInfo(buttonType, buttonLabel)
        {

            $(`#showInfo${buttonType}`).attr("disabled", "true")
            $(`#showInfo${buttonType}`).html(`
            <div class="">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-6 h-6 text-transparent animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </div>
            `)
            $(`.${buttonType}Errors`).remove()
            $(document).ajaxSuccess(function(){
                $(`#showInfo${buttonType}`).removeAttr("disabled")
                $(`#showInfo${buttonType}`).html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                $(`#showInfo${buttonType}`).removeAttr("disabled")
                $(`#showInfo${buttonType}`).html(`<p>${buttonLabel}</p>`)
            })
    }

    //Show Info Event Modal
    $(document).on('click','#showInfoButton',function(){

        let filteredEvent = events.filter(e=> {return e.event_id === $(this).data('eventid')})
        eventId = filteredEvent[0].event_id
        refreshShowInfoTable()
        $("#showInfoEvent").removeClass('opacity-0').removeClass('invisible')
        $("#showInfoModalContent").removeClass('scale-0')
        $("#showInfoEventId").val(filteredEvent[0].event_id)
        $("#showInfoHeader").val(filteredEvent[0].header)
        $("#showInfoDescription").val(filteredEvent[0].description)
        $("#showInfoDate").val(filteredEvent[0].start_date)
        $("#showInfoFrom").text(convertTime(filteredEvent[0].start_time))
        $("#showInfoTo").text(convertTime(filteredEvent[0].end_time))
        $("#showInfoCourses").html(filteredEvent[0].courses.map(e=>{
            return `<button class="choicesNewEvent px-2 p-1 border rounded bg-white  mr-0.5 my-0.5 cursor-pointer transition hover:bg-red-600 hover:text-white">${e}</button>`
        }))
        $("#showInfoTotal").text(filteredEvent[0].total_students)
    })
    
    //Fetch Vouched Students
    async function fetchVouchedStudents(){
        let result = await $.ajax({
            headers:header,
            url:'/api/fetchVouchedStudents',
            method:'get',
            data:
            {
                eventId:eventId,
                sortBy:sortBy,
                searchString:searchString
            },
            success:function(res)
            {
                console.log(res)
                vouchedStudents = res
            },
            error:function(err)
            {
                console.log(err)
            }
        })
        return result;
    }

    //Refresh Show Info Table
    function refreshShowInfoTable(){
        fetchVouchedStudents().then(res=>{
            $(".showInfoTable").html(
                res.length != 0 ?
                res.map((e,i)=>{
                        return `<tr class="bg-white border-b">
                                    <td class="px-6 py-4">${i+1}</td>
                                    <td class="px-6 py-4">${e.student_id}</td>
                                    <td class="px-6 py-4">${e.students.fullname}</td>
                                    <td class="px-6 py-4">${e.students.course}</td>
                                    <td class="px-6 py-4">${e.entrance_voucher != null ? 'Vouched' : 'not Vouched'}</td>
                                    <td class="px-6 py-4">${e.exit_voucher == null ? `not Vouched` : e.exit_voucher}</td>
                                </tr>`
                    })
                :
                `<tr
                class="border-b bg-neutral-100 ">
                <td
                  colspan="6"
                  class="whitespace-nowrap px-6 py-4 text-center">
                  No Data Found
                </td>
              </tr>`
                    
            )
        })
    }

    //Filter Entries Show Info Table
    $(document).on('change','#showInfoSortCourse', function(){
        sortBy = $(this).val()
        refreshShowInfoTable()
    })
    
    //Search Bar in Show Info Table
    $(document).on('click','#searchButtonShowInfoTable',function(){
        searchString = $("#searchInputShowInfoTable").val()
        refreshShowInfoTable()
    })

    //Refresh Show Info Table
    $(document).on('click','.refreshShowInfoTable',function(){
        refreshShowInfoTable()
    })

    //Print Present Student Show Info Table
    $(document).on('click','#printPresentStudentInfoTable', function(){
        var divToPrint = document.getElementById("showInfoTable");
        var newWin = window.open("");
        newWin.document.write(`<html><head><title>${events[0].event_id} ${events[0].header} / ${events[0].start_date} ${convertTime(events[0].start_time)} - ${convertTime(events[0].end_time)}</title>`);
        newWin.document.write('<link rel="stylesheet" href="https://cdn.tailwindcss.com" />');
        newWin.document.write('<style>@media print { * { color: inherit !important; background: transparent !important; box-shadow: none !important; } table { border-collapse: collapse !important; width: 100% !important; margin-bottom: 1rem !important; color: #1a202c !important; font-size: 1rem !important; font-weight: 400 !important; line-height: 1.5 !important; border: 1px solid #e2e8f0 !important; } th, td { padding: 0.5rem !important; text-align: left !important; border-bottom-width: 1px !important; border-bottom-color: #e2e8f0 !important; border-top: 1px solid #e2e8f0 !important; border-left: 1px solid #e2e8f0 !important; } }</style>');
        newWin.document.write('</head><body>');
        newWin.document.write(divToPrint.outerHTML);
        newWin.document.write('</body></html>');
        newWin.print();
        newWin.close();
    })

    //Close Show Info Modal
    $(document).on('click','#showInfoClose',function(){
        $('#showInfoSortCourse').val('asc')
        sortBy = 'asc'
        $(".showInfoModal").empty()
        let modal = $(this).parent().parent().parent().parent()
        $("#showInfoEvent").addClass('opacity-0')
        $("#showInfoModalContent").addClass('scale-0')
        setTimeout(() => {
            modal.addClass("invisible")
            $(".newEventErrors ").remove()
            $("#newEventPicture, #newEventHeader, #newEventDescription, #newEventDate, #newEventStartTime, #newEventEndTime").val("")
        }, 200)
    })

    //loadingButton Show Info
    function loadingButtonDelete(buttonType, buttonLabel)
        {

            buttonType.attr("disabled", "true")
            buttonType.html(`
            <div class="">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-6 h-6 text-transparent animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </div>
            `)
            $(document).ajaxSuccess(function(){
                buttonType.removeAttr("disabled")
                buttonType.html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                buttonType.removeAttr("disabled")
                buttonType.html(`<p>${buttonLabel}</p>`)
            })
    }

    //Delete Event
    $(document).on('click',"#deleteEvent", function(){
        loadingButtonDelete($(this), 'Delete')
        $.ajax({
            headers:header,
            url:'/api/deleteEvent',
            data:{
                creator:$("#managerName").text(),
                eventId:$(this).data('eventid'),
                image:$(this).data('img')
            },
            method:'post',
            success:function(res)
            {
                refreshEvents()
                toastr.success("Successfully Deleted","Success")
            },
            error:function(err)
            {
                console.log(err)
            }
        })
    })

    //Delete Announcement
    $(document).on("click","#deleteAnnouncement",function(){
        loadingButtonDelete($(this), 'Delete')
        $.ajax({
            headers:header,
            url:'/api/deleteAnnouncement',
            data:
            {
                creator:$("#managerName").text(),
                announcementId:$(this).data('announcementid'),
            },
            method:'post',
            success:function(res)
            {
                refreshAnnouncement()
                toastr.success("Successfully Deleted", "Success")
            },
            error:function(err)
            {
                console.log(res)
            }
        })
        
    })

    //Create Voucher
    $(document).on('click','#showInfoCreateVoucher', function() { 
        let vouchers = []
        let voucherIn = []
        let voucherOut = []
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }
        for(let i = 0; i < $("#showInfoTotal").text(); i++ )
        {
            voucherIn.push({voucher:`${$("#showInfoEventId").val()}-${makeid(5)}`, isUsed:false})
        }
        for(let i = 0; i < $("#showInfoTotal").text(); i++ )
        {
            voucherOut.push({voucher:`${$("#showInfoEventId").val()}-${makeid(5)}`, isUsed:false})
        }
        vouchers.push({voucherIn:voucherIn, voucherOut:voucherOut})
        console.log(vouchers)
        loadingButtonShowInfo("CreateVoucher", "Create Voucher")
        $.ajax({
            headers:header,
            url:'/api/storeVouchers',
            data:
            {
                vouchers:vouchers,
                creator:$("#managerName").text(),
                eventId:$("#showInfoEventId").val()
            },
            method:'post',
            success:function (res) { 
                if(res === 'success')
                {
                    toastr.success("Vouchers Created Successfully","Success")
                }
                else
                {
                    toastr.warning("Vouchers already Created ","Warning")
                }
                
            },
            error:function (err) {  
                console.log(err)
            }
        })
     })

    //Print Voucher
    $(document).on('click','#showInfoPrintVoucher',function () {  
        loadingButtonShowInfo("PrintVoucher", "Print Voucher")
        $.ajax({
            headers:header,
            url:'/api/fetchVouchers',
            data:
            {
                eventId:$("#showInfoEventId").val(),
                creator:$("#managerName").text()
            },
            method:'post',
            success:function(res)
            {
                if(res == "missing")
                {
                    toastr.info("Generate A voucher first","info")
                }   
                else
                {       
                    if(res.length === undefined)
                    {
                        toastr.info("No student are registered")
                    }
                    else
                    {
                        // Create a new div to hold the vouchers
                        var vouchersDiv = $("<div>");

                        // Loop through the vouchers array and create a div for each voucher
                        for (var i = 0; i < res[0].voucherIn.length; i++) {
                        var voucherDivIn = $(`<div style="padding:10px; border: 1px solid; margin-right: 0.25rem;margin-top: 0.25rem;height: min-content;page-break-inside: avoid;">`)
                            .html(
                                `<div style="text-align: center;font-size:0.5rem;line-height:1rem">Entrance Code</div>
                                <div style="text-align: center;font-size: 1.5rem;line-height: 2rem; font-weight: 900">
                                    ${res[0].voucherIn[i].voucher}
                                </div>
                                <div style="text-align: center;font-size: 0.875rem;line-height: 1.75rem;">
                                    ${$("#showInfoHeader").val()}
                                </div>
                                <div style="text-align: center;font-size: 0.600rem;line-height: 0.5rem;">
                                    ${$("#showInfoDate").val()}
                                </div>`);
                        vouchersDiv.append(voucherDivIn);
                        }

                        for (var i = 0; i < res[0].voucherOut.length; i++) {
                            var voucherDivOut = $(`<div style="padding:10px; border: 1px solid; margin-right: 0.25rem;margin-top: 0.25rem;height: min-content;page-break-inside: avoid;">`)
                            .html(
                                `<div style="text-align: center;font-size:0.5rem;line-height:1rem">Exit Code</div>
                                <div style="text-align: center;font-size: 1.5rem;line-height: 2rem; font-weight: 900">
                                    ${res[0].voucherOut[i].voucher}
                                </div>
                                <div style="text-align: center;font-size: 0.875rem;line-height: 1.75rem;">
                                    ${$("#showInfoHeader").val()}
                                </div>
                                <div style="text-align: center;font-size: 0.600rem;line-height: 0.5rem;">
                                    ${$("#showInfoDate").val()}
                                </div>`);
                            vouchersDiv.append(voucherDivOut);
                            
                        }

                        vouchersDiv.children().last().css('page-break-after', 'auto');
                        var popupWin = window.open('', '_blank', 'fullscreen=yes');
                        popupWin.document.open();
                        popupWin.document.write(
                            `<html>
                                <head>
                                    <title>
                                        ${$("#showInfoHeader").val()}  / ${$("#showInfoDate").val()} ${$("#showInfoFrom").text()} - ${$("#showInfoTo").text()}
                                    </title>
                                </head>
                                <body style="display: flex;flex-wrap: wrap;height:min-content;justify-content: center">
                                    ${vouchersDiv.html()}
                                </body>
                            </html>`);
                        popupWin.document.close();
                        popupWin.print();
                    }
                    
                }
                
            },
            error:function(err)
            {
                console.log(err)
            }
        })
    })

    //MultiSelect----------------------------------------------

    //Refresh Multi Select
    function RefreshMultiSelectNewEvent()
    {
        $(".multiSelectResultsNewEvent").html(results.map(e=>{
            if(e.isDefault)
            {
                return `<div class="p-2 resultsNewEvent border-b-[1px] transition hover:bg-red-600 hover:text-white cursor-pointer">${e.course}</div>`
            }
        }))
        $(".choiceswrapperNewEvent").html(results.map(e=>{
            if(!e.isDefault)
            {
                return `<button class="choicesNewEvent px-2 p-1 border rounded bg-white  mr-0.5 my-0.5 cursor-pointer transition hover:bg-red-600 hover:text-white">${e.course}</button>`
            }
        }))
        if(results.filter((e,i) => { return e.isDefault; }).length === 0)
        {
            $(".multiSelectResultsNewEvent").html(`<div class=" w-full h-full flex items-center justify-center "><span class="px-2 p-1 text-sm bg-red-600 text-white rounded">No Courses Available</span></div>`)
        }
        if(results.filter((e,i) => { return !e.isDefault; }).length === 0)
        {
            $(".choiceswrapperNewEvent").html(`<p class=" text-center flex items-center text-gray-400">Please Select Course</p>`)
        }
        $("#newEventTotalStudents, #newAnnouncementTotalStudents").text(total)
    }

    //Click Results in Multi Select
    $(document).on('click',".resultsNewEvent",function(){
        let newArray = results.map(e=>{
            if(e.course == $(this).text())
            {
                return {...e, isDefault:false}
            }
            else
            {
                return e
            }
        })
        results = newArray
        total = total + students.filter(e=>{return e.course == $(this).text()}).length
        RefreshMultiSelectNewEvent()
        
    })

    //Click Choices to Remove in Multi Select
    $(document).on('click', ".choicesNewEvent", function(){
        let newArray = results.map(e=>{
            if(e.course == $(this).text())
            {
                return {...e, isDefault:true}
            }
            else
            {
                return e
            }
        })
        results = newArray
        total = total - students.filter(e=>{return e.course == $(this).text()}).length
        RefreshMultiSelectNewEvent()
    })
    //Select All Choices
    $(document).on("click", ".newEventSelectAllChoices", function(){
        let newArray = results.map(e=>{
                return {...e, isDefault:false}
        })
        results = newArray
        total = students.length
        RefreshMultiSelectNewEvent()
    })
    //Caret
    $(document).on('click','.multiSelectCaretNewEvent', function(){
        closeMultiSelect()
    })
    
    //loadingButton
    function loadingButton(buttonType, buttonLabel)
        {
            $(`.errorusername`).empty()
            $(`.errorpassword`).empty()
            $(`#${buttonType}Buttonsubmit`).attr("disabled", "true")
            $(`#${buttonType}Buttonsubmit`).html(`
            <div class="">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-6 h-6 text-transparent animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </div>
            `)
            $(`.${buttonType}Errors`).remove()
            $(document).ajaxSuccess(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
            })
    }

    //NEW EVENT Function-------------------------------------------------
    let MultiSelectshowNewEvent = false

    //MultiSelect close on Close Modal
    function closeMultiSelect()
    {
        if(!MultiSelectshowNewEvent)
        {
            $(".multiSelectResultsNewEvent").removeClass('scale-0')
            MultiSelectshowNewEvent = !MultiSelectshowNewEvent
        }
        else
        {   
            $(".multiSelectResultsNewEvent").addClass('scale-0')
            MultiSelectshowNewEvent = !MultiSelectshowNewEvent
        }
    }
    //New Event Modal
    $(document).on('click','#newEventButton', function(){
        results = courses
        RefreshMultiSelectNewEvent()
        $("#newEventModal").removeClass('opacity-0').removeClass('invisible')
        $("#newEventModalContent").removeClass('scale-0')
    })

    //Close Modal
    $(document).on('click','#newEventClose',function(){
        let modal = $(this).parent().parent().parent().parent()
        $("#newEventModalContent").addClass('scale-0')
        $("#newEventModal").addClass('opacity-0')
        setTimeout(() => {
            modal.addClass("invisible")
            MultiSelectshowNewEvent = true
            results = courses
            total = 0 
            RefreshMultiSelectNewEvent()
            closeMultiSelect()
            $(".newEventErrors ").remove()
            $("#newEventPicture, #newEventHeader, #newEventDescription, #newEventDate, #newEventStartTime, #newEventEndTime").val("")
        }, 200)
    })

    //New Event Button Submit
    $(document).on("click","#newEventButtonsubmit",function(e){
        loadingButton("newEvent", "Create")
        e.preventDefault()
        $(".newEventErrors ").remove()
        let filteredCourses = results.filter((e,i) => { if(!e.isDefault)return e.course})
        let form = new FormData()
        form.append('Picture', $("#newEventPicture")[0].files[0])
        form.append('Header',$("#newEventHeader").val())
        form.append('Description',$("#newEventDescription").val())
        form.append('TotalStudents',$("#newEventTotalStudents").text())
        form.append('Courses',filteredCourses.map((e,i) => {return e.course}))
        form.append('managerName',$("#managerName").text())
        form.append('Date',$("#newEventDate").val())
        form.append('StartTime',$("#newEventStartTime").val())
        form.append('EndTime',$("#newEventEndTime").val())
        
        $.ajax({
            headers:header,
            url:'/api/newEvent',
            data:form,
            processData: false,
            contentType: false,
            method:'post',
            success:function(res)
            {
                toastr.success("Created New Event ", "Success")
                refreshEvents()
                $("#newEventClose").trigger("click")
            },
            error:function(err)
            {
                
                $.each(err.responseJSON.errors, function(key, value){
                    if(key === "Courses")
                    {
                        value.map(e=>{
                            $(".multiSelectNewEvent").parent().append(
                                `<div class="newEventErrors text-rose-500 text-sm">• ${e}</div>`
                            )
                        })
                    }
                        value.map(e=>{
                            $(`#newEvent${key}`).parent().append(
                            `<div class="newEventErrors text-rose-500 text-sm">• ${e}</div>`
                            )
                        })
                    

                })
            }

        })
    })

    //New Announcement Function---------------------------------------------

    //New Announcement Modal
    $(document).on('click','#newAnnouncementButton', function(){
        results = courses
        RefreshMultiSelectNewEvent()
        $("#newAnnouncementModal").removeClass('opacity-0').removeClass('invisible')
        $("#newAnnouncementModalContent").removeClass('scale-0')
    })

    //Close Modal
    $(document).on('click','#newAnnouncementClose',function(){
        let modal = $(this).parent().parent().parent().parent()
        $("#newAnnouncementModalContent").addClass('scale-0')
        $("#newAnnouncementModal").addClass('opacity-0')
        setTimeout(() => {
            modal.addClass("invisible")
            MultiSelectshowNewEvent = true
            results = courses
            total = 0
            RefreshMultiSelectNewEvent()
            closeMultiSelect()
        }, 200)
    })

    //New Announcement Button Submit
    $(document).on('click','#newAnnouncementButtonsubmit',function(){
        loadingButton("newAnnouncement", "Create")
        let filteredCourses = results.filter((e,i) => { if(!e.isDefault)return e.course})
            filteredCourses = filteredCourses.map(e=>{return e.course})
        $.ajax({
            headers:header,
            url:'/api/newAnnouncement',
            data:
            {
                Header:$("#newAnnouncmentHeader").val(),
                Description:$("#newAnnouncementDescription").val(),
                Creator:$("#managerName").text(),
                courses:filteredCourses,
            },
            method:'post',
            success:function(res)
            {
                toastr.success("Created New Announcement ", "Success")
                refreshAnnouncement()
                $("#newAnnouncementClose").trigger("click")
            },
            error:function(err)
            {
                console.log(err)
            }
        })
    })

    //Show Option---------------------------------------------------------
    let showOption = false
    $(document).on('click', '#managerShowoption', function(){
        if(!showOption)
        {
            $("#managerOption").removeClass('scale-0')
            showOption = !showOption
        }
        else
        {   $("#managerOption").addClass('scale-0')
            showOption = !showOption
        }
    })
    
})