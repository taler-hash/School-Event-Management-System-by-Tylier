
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
        $(".eventCount").text(Events.data.length != 0 ? Events.data.length : 0)
        $(".announcementCount").text(Announcements.data.length != 0 ? Announcements.data.length : 0)
        $(".rawlogsCount").text(Rawlogs.data.length != 0 ? Rawlogs.data.length : 0 )
        $(".adminCount").text(Admin.data.length != 0 ? Admin.data.length : 0)
        $(".studentCount").text(Students.data.length != 0 ? Students.data.length : 0)
        $(".courseCount").text(Courses.data.length != 0 ? Courses.data.length : 0)
        
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
                console.log(res)
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
                    console.log(page)
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
        $(".tableDataRawlogs").html(
            Rawlogs.data.length != 0 ?
            Rawlogs.data.map((e, i)=>{
                return  `<tr class="bg-white border-b">
                    <td class="px-6 py-4 ">${i + 1}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.event_id}</td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${e.student_id}</td>
                    <td class="px-6 py-4">${e.entrance_voucher}</td>
                    <td class="px-6 py-4">${e.exit_voucher}</td>
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
                    <td class="px-6 py-4">
                        <button username="${e.username}" type="${e.type}" position="${e.position}" adminid="${e.admin_id}" class="buttonEditAdmin text-green-500 transition hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
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
        Type = "Rawlogs"
        OpenModal("admin")
        ShowAdminData()
    })

    //Close Modal
    $(document).on('click',`#adminClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'admin')
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
                    console.log(res)
                },
                error:function(err)
                { 
                    console.log(err)
                }
            })
        }    
    })

    //STUDENTS Function--------------------------------------------------------------------

    //Open Modal
    $(document).on('click', '.showStudents', function(){
        OpenModal("student")
    })

    //Close Modal
    $(document).on('click',`#studentClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'student')
    })

    //COURSES Function

    //Open Modal
    $(document).on('click', '.showCourses', function(){
        OpenModal("course")
    })

    //Close Modal
    $(document).on('click',`#courseClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'course')
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
    