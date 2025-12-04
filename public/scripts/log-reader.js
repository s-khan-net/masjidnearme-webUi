var basePath = 'https://api.masjidnear.me/v1/masjids/'
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
            ///build jggrid table
            let data = [{ id: log.timestamp, cell: [log.timestamp, log.level, log.message] }];
            let count = log.length;
            let total_pages = 0;
            if (count > 0) {
                total_pages = ceil(count / 10);
            } else {
                total_pages = 0;
            }
            $('#logTable').jqGrid({
                datatype: "local",
                data: data,
                colNames: ['Timestamp', 'Level', 'Message'],
                colModel: [
                    { name: 'timestamp', index: 'timestamp', width: 150 },
                    { name: 'level', index: 'level', width: 100 },
                    { name: 'message', index: 'message', width: 300 }
                ],
                height: 250,
                rowNum: 10,
                pager: "#logPager",
                viewrecords: true,
                caption: "Logs"
            });
            // $('#logTableBody').append(`
            //     <tr>
            //         <td>${log.timestamp}</td>
            //         <td>${log.level}</td>
            //         <td><div class="msg">${log.message}</div></td>
            //     </tr>
            // `);
        });
    } else {
        $('#logTable').append(`
            <tr>
                <td colspan="3">No logs available</td>
            </tr>
        `);
    }
}