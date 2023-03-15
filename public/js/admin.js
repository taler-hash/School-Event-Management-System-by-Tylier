
$(document).ready(function(){
    let Events = []
    let Announcements = []
    let Rawlogs = []
    let Admin = []
    let Students = []
    let Courses = []
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
        $(".eventCount").text(Events.length)
        $(".announcementCount").text(Announcements.length)
        $(".rawlogsCount").text(Rawlogs.length)
        $(".adminCount").text(Admin.length)
        $(".studentCount").text(Students.length)
        $(".courseCount").text(Courses.length)
        
    })
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
    }
    
    //EVENTS Function

    //Open Modal
    $(document).on('click', '.showEvents', function(){
        OpenModal("event")
    })

    //Close Modal
    $(document).on('click',`#eventClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'event')
    })

    //ANNOUNCEMENTS Function
    
    //Open Modal
    $(document).on('click', '.showAnnouncements', function(){
        OpenModal("announcement")
    })

    //Close Modal
    $(document).on('click',`#announcementClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'announcement')
    })

    //RAWLOGS Function

    //Open Modal
    $(document).on('click', '.showRawlogs', function(){
        OpenModal("rawlog")
    })

    //Close Modal
    $(document).on('click',`#rawlogClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'rawlog')
    })

    //ADMIN Function

    //Open Modal
    $(document).on('click', '.showAdmin', function(){
        OpenModal("admin")
    })

    //Close Modal
    $(document).on('click',`#adminClose`,function(){
        let modal = $(this).parent().parent().parent().parent()
        ModalCloseTransition(modal, 'admin')
    })

    //STUDENTS Function

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
    