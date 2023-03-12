$(document).ready(function(){

    let courses = []
    let results = []
    let students = []
    let events = []
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
    $.when(fetchCourse(), fetchStudents())
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
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${e.header}</h5>
                        </a>
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
    refreshEvents()
    //EVENTS Functions-----------------------------------------

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
        $("#showInfoEvent").removeClass('opacity-0').removeClass('invisible')
        $("#showInfoModalContent").removeClass('scale-0')
        let filteredEvent = events.filter(e=> {return e.event_id === $(this).data('eventid')})
        $("#showInfoEventId").val(filteredEvent[0].event_id)
        $("#showInfoHeader").val(filteredEvent[0].header)
        $("#showInfoDescription").val(filteredEvent[0].description)
        $("#showInfoDate").val(filteredEvent[0].start_date)
        $("#showInfoFrom").text(filteredEvent[0].start_time)
        $("#showInfoTo").text(filteredEvent[0].end_time)
        $("#showInfoCourses").html(filteredEvent[0].courses.map(e=>{
            return `<button class="choicesNewEvent px-2 p-1 border rounded bg-white  mr-0.5 my-0.5 cursor-pointer transition hover:bg-red-600 hover:text-white">${e}</button>`
        }))
        $("#showInfoTotal").text(filteredEvent[0].total_students)
    })

    //Close Show Info Modal
    $(document).on('click','#showInfoClose',function(){
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

            $(`#${buttonType}`).attr("disabled", "true")
            $(`#${buttonType}`).html(`
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
                $(`#${buttonType}`).removeAttr("disabled")
                $(`#${buttonType}`).html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                $(`#${buttonType}`).removeAttr("disabled")
                $(`#${buttonType}`).html(`<p>${buttonLabel}</p>`)
            })
    }

    //Delete Event
    $(document).on('click',"#deleteEvent", function(){
        loadingButtonDelete('deleteEvent', 'Delete')
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
            voucherIn.push(`${$("#showInfoEventId").val()}-${makeid(5)}`)
        }
        for(let i = 0; i < $("#showInfoTotal").text(); i++ )
        {
            voucherOut.push(`${$("#showInfoEventId").val()}-${makeid(5)}`)
        }
        vouchers.push({voucherIn:voucherIn, voucherOut:voucherOut})
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
                console.log(res[0].voucherIn)
                // Create a new div to hold the vouchers
                var vouchersDiv = $("<div>");

                // Loop through the vouchers array and create a div for each voucher
                for (var i = 0; i < res[0].voucherIn.length; i++) {
                var voucherDiv = $("<div>").html("Voucher code: " + res[0].voucherIn[i]);
                voucherDiv.css({
                    border: "1px solid black",
                    padding: "10px"
                  });
                vouchersDiv.append(voucherDiv);
                
                }
                $("body").css({
                    display: "flex",
                    "flex-direction": "column"
                  });
                var popupWin = window.open('', '_blank', 'width=300,height=300');
                popupWin.document.open();
                popupWin.document.write('<html><head><title>Vouchers</title></head><body style="display: flex; border: 1px solid black; padding: 10px;">' + vouchersDiv.html() + '</body></html>');
                popupWin.document.close();
                popupWin.print();
                console.log(vouchersDiv)
                
            },
            error:function(err)
            {

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
        $("#newEventTotalStudents").text(total)
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
            RefreshMultiSelectNewEvent()
            closeMultiSelect()
        }, 200)
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