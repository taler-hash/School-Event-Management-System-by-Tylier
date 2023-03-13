let events = []
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
                        <p class="text-xs ">Entrance: Vouched</p>
                        <p class="text-xs mb-2">Exit: Not yet Vouch</p>
                        <p class="mb-3 font-normal text-gray-700 ">${e.description}</p>
                        <div class="w-full flex justify-between">
                        ${compareDate(e.start_date)?
                            ` <button data-eventid="${e.event_id}" data-createdby="${e.created_by}" data-eventHeader="${e.header}" class="entranceVoucher inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-lime-600 rounded-lg hover:bg-green-600 transition">
                            Entrance Voucher
                        </button>
                        ${compareTime(e.end_time) ? 
                            `<button   class="exitVoucher inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-400 bg-red-600 rounded-lg hover:bg-green-600 transition">
                                Exit Voucher
                            </button>`
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
    refreshEvents()
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
        console.log($("#entranceVoucherInput").val())
        console.log($("#entranceVoucherModalContent").attr("data-eventid"))
        console.log($("#entranceVoucherModalContent").attr("data-createdby"))
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
                console.log(res)
            },
            error:function(err)
            {
                console.log(err)
            }
        })
        
    })
})