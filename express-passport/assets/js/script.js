$(document).ready(function(){
    console.log('ok')
        $('#signup-form').on('submit',function(e){
            e.preventDefault();

            var firstname = $('#firstname').val();
            var lastname = $('#lastname').val();
            var email = $('#email').val();
            var password = $('#password').val();


            $.ajax({
                url: '/signup',
                method: 'POST',
                data: {
                    firstname,
                    lastname,
                    email,
                    password
                }
            }).done(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
        })


      
})