let header = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
$(document).ready(function(){
    let course = []
    //Fetch Course
    $.ajax({
        headers:header,
        url:'/api/course',
        method:'get',
        success:function(res)
        {
            course = res
            $('#createCourse').append(
                res.map(e=>{
                    return `<option value="${e.course}">${e.course}</option>`
                })
            )
        },
        error:function(err)
        {
            console.log(err)
        }
    })
    //Functions----------------------------------------------------------
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
            $(`.error${buttonType}`).empty()
            $(document).ajaxSuccess(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
                
            })
            $(document).ajaxError(function(){
                $(`#${buttonType}Buttonsubmit`).removeAttr("disabled")
                $(`#${buttonType}Buttonsubmit`).html(`<p>${buttonLabel}</p>`)
            })
    }

    //Login Function-----------------------------------------------------

    //Login Button submit -----------------------------------------------
    $(document).on('click','#loginButtonsubmit',function(){
        $(".loginErrors").remove();
        loadingButton('login', 'Login')
        $.ajax({
            headers: header,
                url: `/api/login`,
                method: 'post',
                data:{
                    Username: $('#loginUsername').val(),
                    Password: $('#loginPassword').val()
                },
                success:function(res)
                {
                    if(res === 'admin')
                    window.location = '/admin/dashboard'
                    if(res === 'manager')
                    window.location = '/manager/dashboard'
                    if(res === 'student')
                    window.location = '/student/dashboard'
                    if(res === 'fail')
                    toastr.error(`No Account Found`, "Error")
                },
                error:function(err)
                {
                    $.each(err.responseJSON.errors, function(key, value){
                        value.map(e=>{
                            $(`#login${key}`).parent().parent().append(
                                `<div class="loginErrors text-rose-500 text-sm">• ${e}</div>`
                            )
                        })
                    })
                }
            })
        
    })

    //See Password function
    let loginCansee = true;
    $(document).on('click','#loginSeepassword',function(){
        if(loginCansee)
        {
            $("#loginPassword").attr("type", "text")
            $(this).html(`<div class=" text-2xl">
                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </div>`)
            loginCansee = false
        }
        else
        {
            $("#loginPassword").attr("type", "password")
            $(this).html(`<div class=" text-2xl">
                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        </div>
          `)
          loginCansee = true
        }
    })

    //Create Function-----------------------------------------------------

    //Modal---------------------------------------------------------------
    $(document).on('click','#createButton', function(){
        $("#createModal").removeClass('opacity-0').removeClass('invisible')
        $("#createModalContent").removeClass('scale-0')
    })
    //Close Modal
    $(document).on('click','#createClose',function(){
        let modal = $(this).parent().parent().parent().parent()
        $("#createModalContent").addClass('scale-0')
        setTimeout(() => {
            modal.addClass("invisible")
            $(".errorUsername").empty();
            $("#createStudentid, #createUsername, #createEmail, #createPassword, #createRetypepassword").each(function(){
                $(this).val("");
            })
            $("#createCourse option, #createYear option").prop("selected", false);
        }, 100);

        modal.removeClass("opacity-100").addClass("opacity-0")

    })

    //Form-------------------------------------------------------------------
    let createCansee = true;

    //See Password function
    $(document).on('click','#createSeepassword',function(){
        if(createCansee)
        {
            $("#createPassword").attr("type", "text")
            $("#createRetypepassword").attr("type", "text")
            $(this).html(`<div class=" text-2xl">
                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </div>`)
            createCansee = false
        }
        else
        {
            $("#createPassword").attr("type", "password")
            $("#createRetypepassword").attr("type", "password")
            $(this).html(`<div class=" text-2xl">
                        <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        </div>
          `)
          createCansee = true
        }
    })

    //Create Button submit --------------------------------------------------
    $(document).on('click','#createButtonsubmit',function(){
        $(".createErrors").remove()
        loadingButton('create', 'Register')
        $.ajax({
            headers:header,
            url:'/api/create',
            method:'post',
            data:{
                Studentid:$('#createStudentid').val(),
                Username:$('#createUsername').val(),
                Course:$("#createCourse").find(':selected').val(),
                Year:$("#createYear").find(':selected').val(),
                Email:$('#createEmail').val(),
                Password:$('#createPassword').val(),
                Retypepassword:$('#createRetypepassword').val()
            },
            success:function(res)
            {
                toastr.success(`Successfully Registered`, "Success")
                $("#createClose").trigger("click")
            },
            error:function(err)
            {
                $.each(err.responseJSON.errors, function(key, value){
                    $(`#create${key}`).parent().parent().append(
                        value.map(e=>{
                            return `<small class="createErrors text-rose-500">• ${value}</small>`
                        })
                    )
                })
            }
        })
    })

})