
$(document).ready(function(){
    let Events = []
    let Announcements = []
    let Rawlogs = []
    let Admin = []
    let Students = []
    let Courses = []
    let searchString = []
    let page = 1;
    let Type = "";

    async function fetchAll()
    {
        let result = await $.ajax({
            headers:header,
            url:'/api/admin/fetchAll',
            method:'get',
            success:function(res)
            {
                console.log(res)
                Events = res.Events
                Announcements = res.Announcement
                Rawlogs = res.RawLog
                Admin = res.Admin
                Students = res.Students
                Courses = res.Courses
            },
            error:function(err)
            {
                console.log(err)
            }
           
        })
        return result
    }

    fetchAll().then((res)=>{   
        $(".eventCount").text(Events.total)
        $(".announcementCount").text(Announcements.total)
        $(".rawlogsCount").text(Rawlogs.total)
        $(".adminCount").text(Admin.total)
        $(".studentCount").text(Students.total)
        $(".coursesCount").text(Courses.total)
        
    })
    //Functions----------------------------------------------------------

    //Open Modal Function
    function OpenModal(modalType)
    {
        $(`#${modalType}Modal`).removeClass('opacity-0').removeClass('invisible')
        $(`#${modalType}ModalContent`).removeClass('scale-0')
    }

    //Close Modal Animation
    function ModalCloseTransition(modal, modalType)
    {
        $(`#${modalType}ModalContent`).addClass('scale-0')
        $(`#${modalType}Modal`).addClass('opacity-0')
        setTimeout(() => {
            modal.addClass("invisible")
        }, 200)
        searchString = ""
        page = 1
    }

    //Search Function
    async function search()
    {
        await $.ajax({
            headers:header,
            url:'/api/admin/searchData',
            method:'GET',
            data:
            {
                page:page,
                Type:Type,
                searchString: searchString
            },
            success:function(res)
            {
                res.type === "Events" ?
                Events = res.data :
                res.type === "Announcement"?
                Announcements = res.data :
                res.type === "Rawlogs" ?
                Rawlogs = res.data :
                res.type === "Admin" ?
                Admin = res.data :
                res.type === "Students" ?
                Students = res.data :
                Courses = res.data
            },
            error:function(err)
            {
                console.log(err)
            }

        })
    }
    
    //Loading Button
    
    function loadingButton(buttonType, buttonLabel)
        {
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
            $(`.${buttonType}Errors`).empty()
            $(document).ajaxSuccess(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
            })
    }
    
    //Convert Time Function
    function convertTime(data)
    {
        let time = data.split(':');// here the time is like "16:14"
        let meridiemTime = time[0] >= 12 && (time[0]-12 || 12) + ':' + time[1] + ' PM' || (Number(time[0]) || 12) + ':' + time[1] + ' AM';
        return meridiemTime
    }

    //EVENTS Function----------------------------------------------------------------

    function ShowEventData()
    {
        $(".tableData").html(
            Events.data.length != 0 ?
            Events.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.event_id}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.header}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.created_by}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.courses}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">${e.total_students}</td>
                    <td class="px-6 py-4">${e.created_date}</td>
                    <td class="px-6 py-4">${e.start_date}</td>
                    <td class="px-6 py-4">${convertTime(e.start_time)}</td>
                    <td class="px-6 py-4">${convertTime(e.end_time)}</td>
                    <td class="px-6 py-4">
                        <button eventid="${e.event_id}" startdate="${e.start_date}" starttime="${e.start_time}" endtime="${e.end_time}" header="${e.header}" class="buttonEditTime text-green-500 p-2 transition hover:text-red-600" title="Edit Time">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </td>
                </tr>`
            })
            :
            `<tr
                class="border-b bg-neutral-100 ">
                <td
                colspan="11"
                class="whitespace-nowrap px-6 py-4 text-center">
                No Data Found
                </td>
            </tr>`
        )
        //Pagination 
        function paginationEvents()
        {
            $(".paginationContainer").html(
                (Events.links).map(e=>{
                    return `<button ${e.url == null ? `disabled="true"` : e.active? `disabled="true"` : "" }
                        links="${ e.url != null && new URL(e.url).searchParams.get("page")}"
                        class="paginationLinks text-xs lg:text-base px-2 py-1 text-sm rounded border 
                        ${e.url == null ? `bg-gray-100 cursor-default` : e.active? `bg-lime-500 cursor-default text-white `:
                        `bg-white cursor-pointer transition hover:scale-125 focus:text-white hover:bg-lime-500 hover:text-white `}">${e.label}</button> `
                })
            )
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    $(this).addClass("bg-lime-500")
                    $(".paginationLinks").not(this).removeClass("bg-lime-500 text-white")
                }
            })
        
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    page = $(this).attr("links")
                    search().then(()=>{
                        ShowEventData()
                        paginationEvents()
                    })
                }
            })
        }
        paginationEvents()
    }

    //Open Modal
    $(document).on('click', '.showEvents', function(){
        Type = "Events"
        ShowEventData()
        OpenModal("event")
    })

    //Close Modal
    $(document).on('click',`#eventClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'event')
        search().then(()=>{
            ShowEventData()
        })
    })

    //Search Button
    $(document).on("click",'.searchBarEvents',function(){
        searchString = $('.searchInputEvents').val()
        Type = "Events"
        search().then(()=>{
            ShowEventData()
            
        })
    })

    //Open Modal Edit Time
    $(document).on('click','.buttonEditTime',function(){
        OpenModal("editTime")
        $("#editTimeEventid").val($(this).attr("eventid"))
        $("#editTimeHeader").val($(this).attr("header"))
        $("#editTimeStartTime").val($(this).attr("starttime"))
        $("#editTimeEndTime").val($(this).attr("endtime"))
        $("#editTimeStartDate").val($(this).attr("startdate"))
        console.log($(this).attr('eventid'))
    })

    //Close Modal Edit Time
    $(document).on('click','#editTimeClose',function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'editTime')
    })

    //Submit Button Edit Time
    $(document).on('click','#editTimeButtonsubmit',function(){
        loadingButton('editTime','Update')
        $.ajax({
            headers:header,
            url:'/api/admin/editTime',
            method:'post',
            data:
            {
                EventId:$("#editTimeEventid").val(),
                StartDate:$("#editTimeStartDate").val(),
                StartTime:$("#editTimeStartTime").val(),              
                EndTime:$("#editTimeEndTime").val()
            },
            success:function(res)
            {
                toastr.success("Successfully Updated", "Success")
                search().then(()=>{
                    ShowEventData()
                })
                $("#editTimeClose").trigger("click")
                console.log(res);
            },
            error:function(err)
            {
                $.each(err.responseJSON.errors, function(key, value){
                    value.map(e=>{
                        console.log(key)
                        $(`#editTime${key}`).parent().append(
                            `<div class="editTimeErrors text-rose-500 text-sm">• ${e}</div>`
                        )
                    })
                })
            }
        })
    })

    //ANNOUNCEMENTS Function-----------------------------------------------------------

    function ShowAnnouncementData()
    {
        
        $(".tableDataAnnouncements").html(
            Announcements.data.length != 0 ?
            Announcements.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.header}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.created_by}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.courses}</td>
                    <td class="px-6 py-4">${e.date_created}</td>
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
        //Pagination 
        function paginationAnnouncements()
        {
            $(".paginationContainer").html(
                (Announcements.links).map(e=>{
                    return `<button ${e.url == null ? `disabled="true"` : e.active? `disabled="true"` : "" }
                        links="${ e.url != null && new URL(e.url).searchParams.get("page")}"
                        class="paginationLinks text-xs lg:text-base px-2 py-1 text-sm rounded border 
                        ${e.url == null ? `bg-gray-100 cursor-default` : e.active? `bg-lime-500 cursor-default text-white `:
                        `bg-white cursor-pointer transition hover:scale-125 focus:text-white hover:bg-lime-500 hover:text-white `}">${e.label}</button> `
                })
            )
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    $(this).addClass("bg-lime-500")
                    $(".paginationLinks").not(this).removeClass("bg-lime-500 text-white")
                }
            })
        
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    page = $(this).attr("links")
                    search().then(()=>{
                        ShowAnnouncementData()
                        paginationAnnouncements()
                    })
                }
            })
        }
        paginationAnnouncements()
    }
    
    //Open Modal
    $(document).on('click', '.showAnnouncements', function(){
        Type = "Announcements"
        OpenModal("announcement")
        ShowAnnouncementData()
    })

    //Close Modal
    $(document).on('click',`#announcementClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'announcement')
        search().then(()=>{
            ShowAnnouncementData()
        })
        
    })

    //Search Button
    $(document).on("click",'.searchBarAnnouncements',function(){
        searchString = $('.searchInputAnnouncements').val()
        Type = "Announcement"
        search().then(()=>{
            ShowAnnouncementData()
        })
    })

    
    //RAWLOGS Function--------------------------------------------------------------------

    function ShowRawlogsData()
    {
        console.log(Rawlogs.data)
        $(".tableDataRawlogs").html(
            
            Rawlogs.data.length != 0 ?
            Rawlogs.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.event_id}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.student_id}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.students.fullname}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.students.course}</td>
                    <td class="px-6 py-4">${e.entrance_voucher ? "Vouched" : "Not Vouched"}</td>
                    <td class="px-6 py-4 font-medium  whitespace-nowrap">${e.exit_voucher ? "Vouched" : "Not Vouched"}</td>
                    <td class="px-6 py-4 flex justify-center">
                        <button eventid="${e.event_id}" studentid="${e.student_id}" entrance="${e.entrance_voucher}" exit="${e.exit_voucher}" course="${e.students.course}" fullname="${e.students.fullname}" class="buttonEditVouchers text-lime-500 hover:text-red-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                        </button>
                    </td>
                </tr>`
            })
            :
            `<tr
                class="border-b bg-neutral-100 ">
                <td
                colspan="8"
                class="whitespace-nowrap px-6 py-4 text-center">
                No Data Found
                </td>
            </tr>`
        )
        //Pagination 
        function paginationRawlogs()
        {
            $(".paginationContainer").html(
                (Rawlogs.links).map(e=>{
                    return `<button ${e.url == null ? `disabled="true"` : e.active? `disabled="true"` : "" }
                        links="${ e.url != null && new URL(e.url).searchParams.get("page")}"
                        class="paginationLinks text-xs lg:text-base px-2 py-1 text-sm rounded border 
                        ${e.url == null ? `bg-gray-100 cursor-default` : e.active? `bg-lime-500 cursor-default text-white `:
                        `bg-white cursor-pointer transition hover:scale-125 focus:text-white hover:bg-lime-500 hover:text-white `}">${e.label}</button> `
                })
            )
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    $(this).addClass("bg-lime-500")
                    $(".paginationLinks").not(this).removeClass("bg-lime-500 text-white")
                }
            })
        
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    page = $(this).attr("links")
                    console.log(page)
                    search().then(()=>{
                        ShowRawlogsData()
                        paginationRawlogs()
                    })
                }
            })
        }
        paginationRawlogs()
    }

    //Open Modal
    $(document).on('click', '.showRawlogs', function(){
        Type = "Rawlogs"
        OpenModal("rawlog")
        ShowRawlogsData()
    })

    //Close Modal
    $(document).on('click',`#rawlogClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'rawlog')
        search().then(()=>{
            ShowRawlogsData()
        })
    })

    //Search Button
    $(document).on("click",'.searchBarRawlogs',function(){
        searchString = $('.searchInputRawlogs').val()
        Type = "Rawlogs"
        search().then(()=>{
            ShowRawlogsData()
        })
    })

    //Edit Voucher Open Modal
    $(document).on('click', '.buttonEditVouchers', function(){
        $("#editVoucherEventId").val($(this).attr("eventid"))
        $("#editVoucherStudentId").val($(this).attr("studentid"))
        $("#editVoucherFullname").val($(this).attr("fullname"))
        $("#editVoucherCourse").val($(this).attr("course"))

        $(this).attr("entrance") == "null" ? 
            $("#editVoucherEntrance").removeAttr('disabled').val('notVouched'):
            $("#editVoucherEntrance").val('Vouched').attr('disabled', true)

        $(this).attr("exit") == "null" ? 
            $("#editVoucherExit").removeAttr('disabled').val('notVouched') : 
            $$("#editVoucherExit").val('Vouched').attr('disabled', true)

        OpenModal("editVoucher")
    })

    //Edit Voucher Close Modal
    $(document).on('click',`#editVoucherClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'editVoucher')
    })

    //Edit Voucher Submit Button
    $(document).on('click','#editVoucherButtonsubmit',function(){

    })

    //Add Voucher Open Modal
    $(document).on('click','.buttonAddVoucher',function(){
        OpenModal("addVoucher")
    })

    //Add Voucher Close Modal
    $(document).on('click',`#addVoucherClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'addVoucher')
        $(".addVoucherErrors ").remove()
        $("#addVoucherEventId").val('')
        $("#addVoucherStudentId").val('')
        $("#addVoucherEntrance").val('')
    })

    //Add Voucher Submit Button 
    $(document).on('click','#addVoucherButtonsubmit',function(){
        loadingButton("addVoucher", "Add")
        $.ajax({
            headers:header,
            url:'/api/admin/addStudentToVouch',
            method:'post',
            data:
            {
                EventId:$("#addVoucherEventId").val(),
                StudentId: $("#addVoucherStudentId").val(),
                Entrance:$("#addVoucherEntrance").val(),
                exitVoucher:$("#addVoucherExit").val()
            },
            success:function(res){
                console.log(res)
                if(res === 'existed in Rawlog')
                {
                    toastr.warning("Data is Already Existed", "Warning")
                }
                else
                {
                    toastr.success("Successfully Created Student To Vouch", "Success")
                    $("#addAdminClose").trigger("click")
                    search().then(()=>{
                        ShowRawlogsData()
                    })
                }
                
            },
            error:function(err){
                $.each(err.responseJSON.errors, function(key, value){
                    $(`#addVoucher${key}`).parent().append(
                        value.map(e=>{
                            return `<small class="addVoucherErrors text-rose-500">• ${value}</small>`
                        })
                    )
                })
            }
        })
    })

    //ADMIN Function----------------------------------------------------------------------

    function ShowAdminData()
    {
        $(".tableDataAdmin").html(
            Admin.data.length != 0 ?
            Admin.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.username}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.type}</td>
                    <td class="px-6 py-4">${e.position}</td>
                    <td class="px-6 py-4 flex space-x-2">
                        <button username="${e.username}" type="${e.type}" position="${e.position}" adminid="${e.admin_id}" class="buttonEditAdmin text-green-500 transition hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button adminid="${e.admin_id}" class="buttonDelete Admin text-green-500 transition hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </button>
                    </td>
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
        //Pagination 
        function paginationAdmin()
        {
            $(".paginationContainer").html(
                (Admin.links).map(e=>{
                    return `<button ${e.url == null ? `disabled="true"` : e.active? `disabled="true"` : "" }
                        links="${ e.url != null && new URL(e.url).searchParams.get("page")}"
                        class="paginationLinks text-xs lg:text-base px-2 py-1 text-sm rounded border 
                        ${e.url == null ? `bg-gray-100 cursor-default` : e.active? `bg-lime-500 cursor-default text-white `:
                        `bg-white cursor-pointer transition hover:scale-125 focus:text-white hover:bg-lime-500 hover:text-white `}">${e.label}</button> `
                })
            )
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    $(this).addClass("bg-lime-500")
                    $(".paginationLinks").not(this).removeClass("bg-lime-500 text-white")
                }
            })
        
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    page = $(this).attr("links")
                    console.log(page)
                    search().then(()=>{
                        ShowAdminData()
                        paginationAdmin()
                    })
                }
            })
        }
        paginationAdmin()
    }

    //Open Modal
    $(document).on('click', '.showAdmin', function(){
        Type = "Admin"
        OpenModal("admin")
        ShowAdminData()
    })

    //Close Modal
    $(document).on('click',`#adminClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'admin')
    })

    //Delete User Button Submit
    $(document).on("click",".buttonDelete",function(){
        $.ajax({
            headers:header,
            url:'/api/admin/deleteUser',
            method:'post',
            data:
            {
                adminId:$(this).attr('adminid')
            },
            success:function(res)
            {
                toastr.success("User Deleted Successfully", "Success")
                search().then(()=>{
                    ShowAdminData()
                    $(".adminCount").text(Admin.data.length != 0 ? Admin.data.length : 0)
                })
            },
            error:function(err){
                console.log(err)
            }
        })
    })

    let editAdminUsername = ""
    let editAdminType = ""
    let editAdminPosition = ""
    let editAdminid = ""
    //Open Modal Edit Admin
    $(document).on('click','.buttonEditAdmin',function(){
        OpenModal("editAdmin")
        editAdminid = $(this).attr('adminid')
        editAdminUsername = $(this).attr('username')
        editAdminType = $(this).attr('type')
        editAdminPosition = $(this).attr('position')
        $("#editAdminUsername").val($(this).attr('username'))
        $("#editAdminType").val($(this).attr('type'))
        $("#editAdminPosition").val($(this).attr('position'))
    })

    //Close Modal Edit Admin
    $(document).on('click',`#editAdminClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'editAdmin')
    })

    //Submit Button Edit Admin
    $(document).on('click','#editAdminButtonsubmit',function () {
        
        if($("#editAdminUsername").val() === editAdminUsername 
            && $("#editAdminType").val() === editAdminType
            && $("#editAdminPosition").val() === editAdminPosition)
        {
            toastr.info("No Changes Were Made", "Info")
        }
        else
        {
            loadingButton("editAdmin", "Update")
            $.ajax({
                headers:header,
                url:'/api/admin/editAdmin',
                method:'post',
                data:
                {
                    adminId:editAdminid,
                    Username:$("#editAdminUsername").val() != editAdminUsername ? 
                            $("#editAdminUsername").val() : null,
                    Type:$("#editAdminType").val() != editAdminType ?
                            $("#editAdminType").val() : null,
                    Position:$("#editAdminPosition").val() != editAdminPosition ?
                            $("#editAdminPosition").val() : null,
                    Password:$("#editAdminPassword").val(),
                },
                success:function(res)
                {
                    toastr.success("Successfully Updated", "Success")
                    search().then(()=>{
                        ShowAdminData()
                    })
                    $("#editAdminClose").trigger("click")
                },
                error:function(err)
                { 
                    console.log(err)
                }
            })
        }    
    })

    //Search Button
    $(document).on("click",'.searchBarAdmin',function(){
        searchString = $('.searchInputAdmin').val()
        Type = "Admin"
        console.log(Type)
        search().then(()=>{
            ShowAdminData()
        })
    })

    //Open Modal Add Admin
    $(document).on('click','.buttonAddAdmin',function(){
        OpenModal("addAdmin")
    })

    //Close Modal Edit Admin
    $(document).on('click',`#addAdminClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'addAdmin')
        $(".addAdminErrors").remove()
    })

    //Submit Button Add Modal
    $(document).on('click','#addAdminButtonsubmit',function () {
        $(".addAdminErrors").remove()
        loadingButton("addAdmin", "Submit")
        $.ajax({
            headers:header,
            url:'/api/admin/addUser',
            method:'post',
            data:
            {
                Username:$("#addAdminUsername").val(),
                Type: $("#addAdminType").val(),
                Position:$("#addAdminPosition").val(),
                Password:$("#addAdminPassword").val()
            },
            success:function(res){
                toastr.success("Successfully Created", "Success")
                $("#addAdminClose").trigger("click")
                search().then(()=>{
                    ShowAdminData()
                    $(".adminCount").text(Admin.total)
                })
            },
            error:function(err){
                $.each(err.responseJSON.errors, function(key, value){
                    $(`#addAdmin${key}`).parent().append(
                        value.map(e=>{
                            return `<small class="addAdminErrors text-rose-500">• ${value}</small>`
                        })
                    )
                })
            }
        })    
    })

    //STUDENTS Function--------------------------------------------------------------------

    function ShowStudentData()
    {
        $(".tableDatastudent").html(
            Students.data.length != 0 ?
            Students.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.student_id}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.fullname}</td>
                    <td class="px-6 py-4">${e.course}</td>
                    <td class="px-6 py-4">${e.year}</td>
                    <td class="px-6 py-4">${e.email}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 ${e.status == "active" ? `bg-green-500` :`bg-red-500`} text-sm font-bold py-1 rounded-full text-white">
                            ${e.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 flex space-x-2">
                        <button studentid="${e.student_id}" fullname="${e.fullname}" course="${e.course}" year="${e.year}" email="${e.email}" status="${e.status}" class="buttonEditStudent text-green-500 transition hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button studentid="${e.student_id}" class="buttonDeleteStudent text-green-500 transition hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </button>
                    </td>
                </tr>`
            })
            :
            `<tr
                class="border-b bg-neutral-100 ">
                <td
                colspan="8"
                class="whitespace-nowrap px-6 py-4 text-center">
                No Data Found
                </td>
            </tr>`
        )
        //Pagination 
        function paginationAdmin()
        {
            $(".paginationContainer").html(
                (Admin.links).map(e=>{
                    return `<button ${e.url == null ? `disabled="true"` : e.active? `disabled="true"` : "" }
                        links="${ e.url != null && new URL(e.url).searchParams.get("page")}"
                        class="paginationLinks text-xs lg:text-base px-2 py-1 text-sm rounded border 
                        ${e.url == null ? `bg-gray-100 cursor-default` : e.active? `bg-lime-500 cursor-default text-white `:
                        `bg-white cursor-pointer transition hover:scale-125 focus:text-white hover:bg-lime-500 hover:text-white `}">${e.label}</button> `
                })
            )
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    $(this).addClass("bg-lime-500")
                    $(".paginationLinks").not(this).removeClass("bg-lime-500 text-white")
                }
            })
        
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    page = $(this).attr("links")
                    search().then(()=>{
                        ShowStudentData()
                        paginationAdmin()
                    })
                }
            })
        }
        paginationAdmin()
    }

     //Search Button
     $(document).on("click",'.searchBarstudent',function(){
        searchString = $('.searchInputstudent').val()
        Type = "Students"
        console.log(Type)
        search().then(()=>{
            ShowStudentData()
        })
    })

    //Open Modal
    $(document).on('click', '.showStudents', function(){
        Type = "Students"
        OpenModal("student")
        ShowStudentData()
    })

    //Close Modal
    $(document).on('click',`#studentClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'student')
    })

    let editStudentid = ''
    let editStudentFullname = ''
    let editStudentCourse = ''
    let editStudentYear = ''
    let editStudentEmail = ''
    let editStudentStatus = ''
    //Open Edit Student Modal
    $(document).on('click', '.buttonEditStudent', function(){
        OpenModal("editStudent")
        $("#editStudentCourse").html(
            Courses.data.map(e=>{
                return `<option value="${e.course}">${e.course}</option>`
            })
        )
        editStudentid = $(this).attr('studentid')
        editStudentFullname = $(this).attr('fullname')
        editStudentCourse = $(this).attr('course')
        editStudentYear = $(this).attr('year')
        editStudentEmail = $(this).attr('email')
        editStudentStatus = $(this).attr('status')

        $("#editStudentid").val($(this).attr('studentid'))
        $("#editStudentFullname").val($(this).attr('fullname'))
        $("#editStudentCourse").val($(this).attr('course'))
        $("#editStudentYear").val($(this).attr('year'))
        $("#editStudentEmail").val($(this).attr('email'))
        $("#editStudentStatus").val($(this).attr('status'))
        $("#editStudentPassword").val("")

    })

    //Close Edit Student Modal
    $(document).on('click',`#editStudentClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        $(".editStudentErrors").remove()
        ModalCloseTransition(modal, 'editStudent')
    })
    
    //Submit Button Edit Modal
    $(document).on('click','#editStudentButtonsubmit',function () {
        
        if($("#editStudentid").val() == editStudentid &&
            $("#editStudentFullname").val() == editStudentFullname &&
            $("#editStudentCourse").val() == editStudentCourse &&
            $("#editStudentYear").val() == editStudentYear &&
            $("#editStudentEmail").val() == editStudentEmail &&
            $("#editStudentStatus").val() == editStudentStatus &&
            $("#editStudentPassword").val().length == 0

        )
        {
            toastr.info("No Changes Were Made", "Info")
        }
        else
        {
            loadingButton("editStudent", "Update")
            $(".editAdminErrors").remove()
            $.ajax({
                headers:header,
                url:'/api/admin/editStudent',
                method:'post',
                data:
                {
                    id:$("#editStudentid").val(),
                    Fullname:$("#editStudentFullname").val(),
                    Course:$("#editStudentCourse").val(),
                    Year:$("#editStudentYear").val(),
                    Email:$("#editStudentEmail").val(),
                    Status:$("#editStudentStatus").val(),
                    Password:$("#editStudentPassword").val()

                },
                success:function(res)
                {
                    toastr.success("Successfully Updated", "Success")
                    search().then(()=>{
                        ShowStudentData()
                    })
                    $("#editStudentClose").trigger("click")
                },
                error:function(err)
                { 
                    $.each(err.responseJSON.errors, function(key, value){
                        $(`#editStudent${key}`).parent().append(
                            value.map(e=>{
                                return `<small class="editStudentErrors text-rose-500">• ${value}</small>`
                            })
                        )
                    })
                }
            })
        }    
    })

    //Delete Student Submit Button
    $(document).on("click",".buttonDeleteStudent",function(){
        $.ajax({
            headers:header,
            url:'/api/admin/deleteStudent',
            method:'post',
            data:
            {
                studentId:$(this).attr('studentid')
            },
            success:function(res)
            {
                toastr.success("User Deleted Successfully", "Success")

                search().then(()=>{
                    ShowStudentData()
                    $(".studentCount").text(Students.data.length != 0 ? Students.data.length : 0)
                })
            },
            error:function(err){
            }
        })
    })

    //COURSES Function

    function ShowCoursesData()
    {
        $(".tableDatacourse").html(
            Courses.data.length != 0 ?
            Courses.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.course}</td>
                    <td class="px-6 py-4 flex space-x-2">
                        <button courseid="${e.course_id}" class="buttonDeleteCourse text-green-500 transition hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </td>
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
        //Pagination 
        function paginationAdmin()
        {
            $(".paginationContainer").html(
                (Courses.links).map(e=>{
                    return `<button ${e.url == null ? `disabled="true"` : e.active? `disabled="true"` : "" }
                        links="${ e.url != null && new URL(e.url).searchParams.get("page")}"
                        class="paginationLinks text-xs lg:text-base px-2 py-1 text-sm rounded border 
                        ${e.url == null ? `bg-gray-100 cursor-default` : e.active? `bg-lime-500 cursor-default text-white `:
                        `bg-white cursor-pointer transition hover:scale-125 focus:text-white hover:bg-lime-500 hover:text-white `}">${e.label}</button> `
                })
            )
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    $(this).addClass("bg-lime-500")
                    $(".paginationLinks").not(this).removeClass("bg-lime-500 text-white")
                }
            })
        
            $(".paginationLinks").click(function(){
                if($(this).attr("links") != "false")
                {
                    page = $(this).attr("links")
                    search().then(()=>{
                        ShowCoursesData()
                        paginationAdmin()
                    })
                }
            })
        }
        paginationAdmin()
    }

    //Open Modal
    $(document).on('click', '.showCourses', function(){
        Type = "Course"
        OpenModal("course")
        ShowCoursesData()
    })

    //Close Modal
    $(document).on('click',`#courseClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'course')
    })
    
    //Open Modal Add Course
    $(document).on('click', '.buttonAddCourse ', function(){
        OpenModal("addCourse")
    })

    //Close Modal Add Course
    $(document).on('click',`#addCourseClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'addCourse')
        $("#addCourse").val("")
        $(".courseErrors").remove()
    })

    //Add Course Modal Submit
    $(document).on("click","#addCourseButtonsubmit",function(){
        loadingButton("addCourse", "Submit")
        $(".courseErrors").remove()
        $.ajax({
            headers:header,
            url:'/api/admin/addCourse',
            method:'post',
            data:
            {
                Course:$("#addCourse").val()
            },
            success:function(res)
            {
                toastr.success("Course Added Successfully", "Success")
                $("#addCourseClose").trigger("click")
                search().then(()=>{
                    ShowCoursesData()
                    $(".coursesCount").text(Courses.total)
                })
            },
            error:function(err)
            {
                $.each(err.responseJSON.errors, function(key, value){
                    $(`#addCourse`).parent().append(
                        value.map(e=>{
                            return `<small class="courseErrors text-rose-500">• ${value}</small>`
                        })
                    )
                })
            }
        })
    })

    //Delete Button Course
    $(document).on('click','.buttonDeleteCourse',function(){
        $.ajax({
            headers:header,
            url:'/api/admin/deleteCourse',
            method:'post',
            data:
            {
                courseId:$(this).attr('courseid')
            },
            success:function()
            {
                toastr.success("Course Deleted Successfully", "Success")
                search().then(()=>{
                    ShowCoursesData()
                    $(".coursesCount").text(Courses.total)
                })
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
    