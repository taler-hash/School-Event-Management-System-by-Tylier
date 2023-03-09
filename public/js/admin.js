let header = {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')};
$(document).ready(function(){
    $(document).on('click', '#logoutButton',function(){
        $.ajax({
            headers:header,
            url:'/api/logout',
            method:'post',
            success:function(res){
                window.location = '/login'
            }
        })
    })
})