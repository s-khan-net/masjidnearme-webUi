$(document).ready(() => {
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('code');
    var basePath = 'https://api.masjidnear.me/v1/users/'
    var u = '';
    if (!code || code.length == 0) {
        showErrorState()
    }
    else {
        u = `${basePath}verify`;
    }
    let obj = { "verificationCode": code };
    $.ajax({
        type: 'POST',
        url: u,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
        success: function (data, status) {
            if (status != 'success') {
                showErrorState()
                return;
            }
            if (data && data.error) {
                showErrorState()
                return;
            }
            showSuccessState(data.user);
            loginUser(data.user);
        },
        error: function (errordata) {
            showErrorState()
        }
    });
});
function showSuccessState(user) {
    $('#notok').prop('hidden', true);
    $('#verifying').prop('hidden', true);
    $('#ok').prop('hidden', false);

    if (user && user.userEmail)
        $('#useremail').html(user.userEmail)
    redirect();
}
function showErrorState() {
    $('#ok').prop('hidden', true);
    $('#verifying').prop('hidden', true);
    $('#notok').prop('hidden', false);

    redirect();
}
function loginUser(user) {
    let token = request.getResponseHeader('x-auth-token')
    if (token) {
        //store the token in cookie
        $.cookie('token', token);
        //store the token in session
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userEmail', data.user.userEmail)
        sessionStorage.setItem('userSettings', btoa(JSON.stringify(data.user.settings)))
        sessionStorage.setItem('userProfile', btoa(JSON.stringify(data.user.userprofile)))
        checkUserLoggedIn(data.user);
        clearMarkers(true);
    }
}
function redirect() {
    setTimeout(() => {
        window.location.href = 'https://masjidnear.me'
    }, 5000);
}