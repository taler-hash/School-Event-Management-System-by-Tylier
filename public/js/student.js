let events = []
let vouch = []
$(document).ready(function(){

    //Show Options
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
    
    //Convert Time Function
    function convertTime(data)
        {
            let time = data.split(':');// here the time is like "16:14"
            let meridiemTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
            return meridiemTime
        }

    //Fetch Events
    async function fetchEvents(){
        let  result = await $.ajax({
            headers:header,
            url:'/api/students/events',
            method:'get',
            data:
            {
                studentId:$("#studentName").text()
            },
            success:function(res)
            {
                console.log(res)
                vouch = res.vouchers
            },
            error:function(err)
            {
                console.log(err)
            }
        })
        return result.eventData
    }
    //Fetch Announcement
    async function fetchAnnouncements(){
        let result = await $.ajax({
            headers:header,
            url:'/api/students/announcements',
            method:'post',
            data:
            {
                studentId:$("#studentName").text()
            },
            success:function(res)
            {
                console.log(res)
            },
            error:function(err)
            {
                console.log(err)
            }
            
        })
        return result
    }
    //RefreshEvents
    function refreshEvents()
    {
        function compareTime(time)
        {
            const targetTimeString = time;
            const [targetHours, targetMinutes] = targetTimeString.split(":");
            const targetDateObj = new Date();
            targetDateObj.setHours(targetHours);
            targetDateObj.setMinutes(targetMinutes);
            const targetTimeValue = targetDateObj.getTime();

            const currentTimeValue = new Date().getTime();
            if (targetTimeValue < currentTimeValue) {
                return true;
            } 
            else {
                return false;
            }
        }
        function compareDate(date)
        {
            const targetDateString = date
            const [targetYear, targetMonth, targetDay] = targetDateString.split("-")

            const targetDateObj = new Date(targetYear, targetMonth - 1, targetDay)
            const currentDateObj = new Date()

            const isSameDate = targetDateObj.getFullYear() === currentDateObj.getFullYear() &&
                            targetDateObj.getMonth() === currentDateObj.getMonth() &&
                            targetDateObj.getDate() === currentDateObj.getDate()

            if (isSameDate) {
                return true
            } else {
                return false
            }
        }
        fetchEvents().then(data=>{
            data.length !== 0 ? 
            $("#managerEventsContainer").html(
                data.map(e=>{
                    return `<div class="eventModal max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow  m-4">
                    <a href="#">
                        <img src="http://${window.location.host}/images/${e.created_by}/${e.picture}" alt="Event Picture" class="rounded-t-md">
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class=" text-2xl font-bold tracking-tight text-gray-900">${e.header}</h5>
                        </a>
                        <p class="text-gray-500 text-xs italic">Date: ${e.start_date}</p>
                        <p class="text-gray-500 text-xs  italic">From ${convertTime(e.start_time)} to ${convertTime(e.end_time)}</p>
                        <p class="text-xs ">Entrance: ${vouch.filter(x=> {return x.student_id == $("#studentName").text() && x.event_id == e.event_id }).length == 1 ? `Vouched`: `Not Yet Vouched`}</p>
                        <p class="text-xs mb-2">Exit: ${vouch.filter(x=> {return x.student_id == $("#studentName").text() && x.event_id == e.event_id && x.exit_voucher !== null }).length == 1 ? `Vouched`: `Not Yet Vouched`}</p>
                        <p class="mb-3 font-normal text-gray-700 ">${e.description}</p>
                        <div class="w-full flex justify-between">
                        
                        ${compareDate(e.start_date) ?
                            
                            `${vouch.filter(x=> {return x.student_id == $("#studentName").text() && x.event_id == e.event_id}).length == 0 ?
                                `<button data-eventid="${e.event_id}" data-createdby="${e.created_by}" data-eventHeader="${e.header}" class="entranceVoucher inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-lime-600 rounded-lg hover:bg-green-600 transition">
                                    Entrance Voucher
                                </button> `
                                :
                                ``
                            } 
                              
                            ${compareTime(e.end_time) ? 
                                `${vouch.filter(x=>{return x.event_id == e.event_id && x.exit_voucher == null}).length == 1 ?
                                    `<button data-eventid="${e.event_id}" data-createdby="${e.created_by}" data-eventHeader="${e.header}"  class="exitVoucher inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-red-600 rounded-lg hover:bg-green-600 transition">
                                        Exit Voucher
                                    </button>`
                                    :
                                    ``
                                }`
                                :
                                ``
                            }
                            `
                            :
                            
                            ``
                        }
                       
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
    //Refresh Announcement
    function refreshAnnouncements(){
        fetchAnnouncements().then((data)=>{
            console.log(data)
            data.length !== 0 
            ?
                $("#managerAnnouncementContainer").html(
                    data.map(e=>{
                        return `<div class="w-full h-fit p-6 m-4 bg-white border border-gray-200 rounded-lg shadow">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                ${e.header}
                            </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            ${e.description}
                        </p>
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
    $.when(refreshEvents(),refreshAnnouncements())

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
            $(document).ajaxSuccess(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
            })
    }

    //Entrance Voucher 
    $(document).on("click", ".entranceVoucher",function(){
        $("#entranceVoucherModalContent").attr('data-eventid',$(this).data("eventid"))
        $("#entranceVoucherModalContent").attr('data-createdby',$(this).data("createdby"))
        $("#entranceVoucherHeader").text($(this).data("eventheader"))
        $("#entranceVoucherModal").removeClass('opacity-0').removeClass('invisible')
        $("#entranceVoucherModalContent").removeClass('scale-0')
    })
    //Close Entrance Voucher Modal
    $(document).on("click","#entranceVoucherClose",function(){
        let modal = $(this).parent().parent().parent().parent()
        $("#entranceVoucherModalContent").addClass('scale-0')
        $("#entranceVoucherModal").addClass('opacity-0')
        setTimeout(() => {
            modal.addClass("invisible")
            $(".newEventErrors ").remove()
            $("#entranceVoucherInput").val("")
        }, 200)
    })
    
    //Entrance Voucher Button Submit
    $(document).on("click","#entranceVoucherButtonsubmit",function(){
        loadingButton("entranceVoucher","Submit")
        $.ajax({
            headers:header,
            url:'/api/students/entranceVoucher',
            method:'post',
            data:
            {
                entranceVoucher:$("#entranceVoucherInput").val(),
                createdBy:$("#entranceVoucherModalContent").attr("data-createdby"),
                eventId:$("#entranceVoucherModalContent").attr("data-eventid"),
                studentId:$("#studentName").text()
            },
            success:function(res)
            {
                if(res == "already used")
                {
                    toastr.warning("Voucher already Used","Warning")
                }
                else if(res == "not found")
                {
                    toastr.warning("Voucher Not Found","Warning")
                }
                else
                {
                    $("#entranceVoucherClose").trigger("click")
                    refreshEvents()
                    toastr.success("Vouched in Entrance","Success")
                }
            },
            error:function(err)
            {
                console.log(err)
            }
        })
        
    })

    //Exit Voucher
    $(document).on("click", ".exitVoucher",function(){
        $("#exitVoucherModalContent").attr('data-eventid',$(this).data("eventid"))
        $("#exitVoucherModalContent").attr('data-createdby',$(this).data("createdby"))
        $("#exitVoucherHeader").text($(this).data("eventheader"))
        $("#exitVoucherModal").removeClass('opacity-0').removeClass('invisible')
        $("#exitVoucherModalContent").removeClass('scale-0')
    })

    //Close Entrance Voucher Modal
    $(document).on("click","#exitVoucherClose",function(){
        let modal = $(this).parent().parent().parent().parent()
        $("#exitVoucherModalContent").addClass('scale-0')
        $("#exitVoucherModal").addClass('opacity-0')
        setTimeout(() => {
            modal.addClass("invisible")
            $(".newEventErrors ").remove()
            $("#exitVoucherInput").val("")
        }, 200)
    })

    //Exit Voucher Button Submit
    $(document).on("click","#exitVoucherButtonsubmit",function(){
        loadingButton("exitVoucher","Submit")
        $.ajax({
            headers:header,
            url:'/api/students/exitVoucher',
            method:'post',
            data:
            {
                exitVoucher:$("#exitVoucherInput").val(),
                createdBy:$("#exitVoucherModalContent").attr("data-createdby"),
                eventId:$("#exitVoucherModalContent").attr("data-eventid"),
                studentId:$("#studentName").text()
            },
            success:function(res)
            {
                if(res == "already used")
                {
                    toastr.warning("Voucher already Used","Warning")
                }
                else if(res == "not found")
                {
                    toastr.warning("Voucher Not Found","Warning")
                }
                else
                {
                    $("#exitVoucherClose").trigger("click")
                    refreshEvents()
                    toastr.success("Vouched in Exit","Success")
                }
            },
            error:function(err)
            {
                console.log(err)
            }
        })
        
    })
})