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
    let gridData = [];
    if (Array.isArray(data)) {
        try {
            data.forEach(log => {
                log = JSON.parse(log);
                ///build jggrid table
                gridData.push({ id: log.timestamp, timestamp: log.timestamp, level: log.level, message: log.message });
            });
        }
        catch (e) {
            console.error(e)
        }

        const $logTable = $('#logTable');
        if ($logTable[0].grid) {
            $logTable.jqGrid('clearGridData')
                .jqGrid('setGridParam', { data: gridData, page: 1 })
                .trigger('reloadGrid');
            return;
        }

        $logTable.jqGrid({
            datatype: "local",
            data: gridData,
            colNames: ['Timestamp', 'Level', 'Message'],
            colModel: [
                { name: 'timestamp', index: 'timestamp', width: 60, formatter: formatTimestamp },
                { name: 'level', index: 'level', width: 25 },
                { name: 'message', index: 'message', width: 460 }
            ],
            height: 250,
            autowidth: true,
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

    } else {
        $('#logTable').append(`
            <tr>
                <td colspan="3">No logs available</td>
            </tr>
        `);
    }
}

function formatTimestamp(value) {
    const date = new Date(Date(value));
    if (Number.isNaN(new Date(date).getTime())) {
        return value == null ? '' : value;
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pad = part => String(part).padStart(2, '0');
    return `${pad(date.getDate())} ${months[date.getMonth()]} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}