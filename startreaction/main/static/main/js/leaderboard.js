$(document).ready( function () {
    moment.locale('ru')
    $('#leaderboard').dataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/ru.json',
        },
        "ordering": false,
        "info": false,
        "rowCallback": function(row, data, index) {
            if (data[0] === '1') {
              $(row).css('background-color', '#ffda07ad');
            } else if (data[0] === '2') {
              $(row).css('background-color', '#c0c0c0ad');
            } else if (data[0] === '3'){
              $(row).css('background-color', '#cd8032ad');
            }
          },
          responsive: true,
          "pageLength": 10,
          "lengthChange": false,
          "columns": [
            { "searchable": false },
            null,
            { "searchable": false },
            { "searchable": false },
          ]
    });
} );
