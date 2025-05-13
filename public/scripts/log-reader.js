var basePath = 'https://api.masjidnear.me/v1/masjids'
$(document).ready(() => {
    $('#btnGetLogs').click(() => {
        getLogs();
    });
});
function getLogs() {
    token = sessionStorage.getItem('token')
    $.ajax({
        type: 'GET',
        url: `${basePath}logs`,
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'x-auth-token': `Bearer ${token}`
        },
        success: function (data, status) {
            if (status != 'success') {
                alert('Couldnt fetch logs')
                return;
            }
            showLogs(data);
        },
        error: function (errordata) {
            alert('Error: ' + errordata.statusText);
        }
    });
}

function showLogs(data) {
    $('#logTableBody').empty();
    if (data) {
        data.forEach(log => {
            log = JSON.parse(log);
            $('#logTableBody').append(`
                <tr>
                    <td>${log.timestamp}</td>
                    <td>${log.level}</td>
                    <td><div class="msg">${log.message}</div></td>
                </tr>
            `);
        });
    } else {
        $('#logTable').append(`
            <tr>
                <td colspan="3">No logs available</td>
            </tr>
        `);
    }
}