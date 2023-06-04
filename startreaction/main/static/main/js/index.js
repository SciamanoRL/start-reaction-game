$(document).ready(function() {
    $("#gamestartbutton").on('click tap',function() {
        if (!$('#player_name').val()) {
            var isValid = $('#player_name')[0].reportValidity()
            $('#player_name').attr('aria-invalid', !isValid)
            return
        } else if (!$('#player_phone').val()) {
            var isValid = $('#player_phone')[0].reportValidity()
            $('#player_phone').attr('aria-invalid', !isValid)
            return
        } else {
            var playerName = $("#player_name").val();
            $.ajax({
              url: "",
              type: "POST",
              dataType: "json",
              data: {
                "playerName": playerName,
                "phone_number" : $("#player_phone").val()
            },
              headers: {
                  "X-CSRFToken": $("[name='csrfmiddlewaretoken']").val()
                  },
              }).done(function(data) {
                  window.location.reload()
              })
        } 
      });
    });

    document.getElementById('player_phone').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '')
            .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

        if (!x[1]) {
            e.target.value = '+';

            return;
        }

        if (!x[2]) {
            e.target.value = `+${x[1]}`;

            return;
        }

        e.target.value = `+${x[1]} (${x[2]}`
            + ( x[3] ? `) ${x[3]}` : '' )
            + ( x[4] ? `-${x[4]}` : '' )
            + ( x[5] ? `-${x[5]}` : '' );
      });
