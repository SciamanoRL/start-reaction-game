const lights = document.querySelectorAll('.light-col');
const time = document.querySelector('#timer');
let startTime
let started = false;
let early = true;
let timeout;
let timerInterval
dayjs.extend(window.dayjs_plugin_duration);
dayjs.locale('ru')


function start() {
  for (const light of lights) {
    light.classList.remove('on');
  }
  
  time.textContent = '00.000';
  
  lightsOutTime = 0;
  let counter = 0
  LightsTurnOn(lights)
  function LightsTurnOn(lights) {
    if (counter < lights.length) {
        const light = lights[counter];
        lightsinterval = setTimeout(() => {
            light.classList.add('on');
            counter++;
            LightsTurnOn(lights);
        }, 1000);
    } else {
      const delay = Math.random() * 3000 + 300;
      timeout = setTimeout(() => {
        for (const light of lights) {
          light.classList.remove('on');
        }
        lightsOutTime = dayjs()
        startTimer()
      }, delay);
    }
  }
  
}

function end(timeStamp) {
  clearTimeout(lightsinterval)
  clearTimeout(timeout);
  stopTimer()
  if (!lightsOutTime) {
    time.textContent = "Фальстарт!";
    // $('#before_start').css('display', 'flex')
    return;
  } else {
    const currentTime = dayjs();
    const duration = dayjs.duration(currentTime.diff(startTime));
    const formattedTime = duration.format('ss.SSS');
    data = {'time':formattedTime}
    $.ajax({
      url: "",
      type: "POST",
      data:data,
      headers: {
          "X-CSRFToken": $("[name='csrfmiddlewaretoken']").val()
          },
      })
  }
}

function tap(event) {
  if (!started && event.target && event.target.closest && event.target.closest('a')) return;
  event.preventDefault();
  
  let timeStamp = performance.now();
  
  if (started) {
    end(timeStamp);
    started = false;
  }
  
  else if (!early) {
    window.location.reload()
    // start();
    // started = true;
  }
}

addEventListener('touchstart', tap, {passive: false});
addEventListener('mousedown', tap, {passive: false});

$('#gamestartbutton').on('click tap', function() {
  early = false
  $('#before_start').css('display', 'none')
  $('#game').css('display', 'flex')
  $.ajax({
    url: "/?attempt=1",
    type: "GET",
    headers: {
        "X-CSRFToken": $("[name='csrfmiddlewaretoken']").val()
        },
    }).done(function(data) {
    })
  started = true
    start()
})
function startTimer() {
    startTime = dayjs();
    timerInterval = setInterval(updateTimer, 2); 
  }
  

  function stopTimer() {
    clearInterval(timerInterval);
    updateTimer()
  }
  
  function updateTimer() {
    const currentTime = dayjs();
    const duration = dayjs.duration(currentTime.diff(startTime));
    const formattedTime = duration.format('ss.SSS');
    time.textContent = formattedTime;
  }