$(document).ready(function(){

    let courses = []
    let results = []
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
                current = []
            },
            error:function(){
            }
        })
    }
    fetchCourse()

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
        RefreshMultiSelectNewEvent()
    })
    //Select All Choices
    $(document).on("click", ".newEventSelectAllChoices", function(){
        let newArray = results.map(e=>{
                return {...e, isDefault:false}
        })
        results = newArray
        RefreshMultiSelectNewEvent()
    })
    
    $(document).on('click','.multiSelectCaretNewEvent', function(){
        closeMultiSelect()
    })
    
    //New Event Function-------------------------------------------------
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
        setTimeout(() => {
            modal.addClass("invisible")
            MultiSelectshowNewEvent = true
            results = courses
            RefreshMultiSelectNewEvent()
            closeMultiSelect()
        }, 100)

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
        setTimeout(() => {
            modal.addClass("invisible")
            MultiSelectshowNewEvent = true
            results = courses
            RefreshMultiSelectNewEvent()
            closeMultiSelect()
        }, 100)
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