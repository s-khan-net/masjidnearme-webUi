$(document).ready(() => {

});
function verifyEmail() {
    const email = $('#txtEmail').val();
    const pwd = $('#txtPwd').val();
    if (!email || !pwd) {
        alert('Please fill in all fields');
        return;
    }
    $('#txtEmail').prop('disabled', true);
    $('#txtPwd').prop('disabled', true);
    $('#btnVerify').prop('disabled', true);
    $('#verifyBtnLoader').css('display', 'inline-block');
    $.ajax({
        url: '/api/verify',
        type: 'POST',
        data: {
            email: email
        },
        success: function (data) {
            if (data && data.success) {
                showVerifyState(data.user);
            } else {
                showErrorState();
            }
        },
        error: function (err) {
            console.log(err);
            showErrorState();
        }
    });
}
function unsubscribe() {
   
    $('#ok').prop('hidden', true);
    $('#notok').prop('hidden', true);
    $('#verifying').prop('hidden', false);

    $.ajax({
        url: '/api/unsubscribe',
        type: 'POST',
        data: {
            email: email
        },
        success: function (data) {
            if (data && data.success) {
                showSuccessState(data.user);
            } else {
                showErrorState();
            }
        },
        error: function (err) {
            console.log(err);
            showErrorState();
        }
    });
}
function showSuccessState(user) {
    $('#notok').prop('hidden', true);
    $('#verifying').prop('hidden', true);
    $('#ok').prop('hidden', false);

    if (user && user.userEmail)
        $('#useremail').html(user.userEmail)
    redirect();
}
function redirect() {
    setTimeout(() => {
        // window.location.href = 'https://masjidnear.me'
    }, 5000);
}