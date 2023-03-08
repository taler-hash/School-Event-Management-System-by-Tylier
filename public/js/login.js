$(document).ready(function(){
    //Create Function-----------------------------------------------------
    
    $(document).on('click','#createButton', function(){
        $("#createModal").removeClass('opacity-0').removeClass('invisible')
        $("#createModalContent").removeClass('scale-0')
    })

    $(document).on('click','#createClose',function(){
        let modal = $(this).parent().parent().parent().parent()
        $("#createModalContent").addClass('scale-0')
        setTimeout(() => {
            modal.addClass("invisible")
            $(".errorUsername").empty();
            $("#usernameEdit").val("")
        }, 100);

        modal.removeClass("opacity-100").addClass("opacity-0")
        $("#createStudentid, #createUsername, #createEmail, #createPassword, #createRetypepassword").each(function(){
            $(this).val("");
        })
    })

    //Login Button onClick --------------------------------------------------
    $(document).on('click','#loginButton',function(){
        console.log($("#username").val())
    })
})