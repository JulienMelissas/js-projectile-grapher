$(document).ready(function() {
  // Set Variables we're working with
  var ball = $('#ball'),
      g = -9.80665, //Gravity
      abs_g = Math.abs(g),
      angle = 0,
      v = 0, //Initial Velocity
      t = 0,
      x = 0, // X Position
      y = 0; // Y Position

  // Function to Move the Ball with CSS positioning
  function moveBall(x, y) {
    ball.css({
      left: x,
      bottom: y
    });
  }

  // Function to Convert angle to Radians for JS
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  // Function to Calculate Y
  function findY(g, angle, v, t) {
    var t_squared = Math.pow(t,2),
        sin_angle = Math.sin(toRadians(angle));
    return Math.round( (sin_angle*v*t) + ((0.5)*g*t_squared) );
  }

  // Function to Calculate X
  function findX(angle, v, t) {
    var cos_angle = Math.cos(toRadians(angle));
    return Math.round(cos_angle*v*t);
  }

  // Function to Calculate Max Time
  function maxTime(angle, v, g) {
    var sin_angle = Math.sin(toRadians(angle));
    return ((sin_angle*v)/abs_g)*2;
  }

  function simulate(v, angle) {
    // Reset Everything
    $('.dot').remove();
    ball.css({
      left: 0,
      right: 0
    });

    var max_time = maxTime(angle, v, g),
        max_time_100 = (max_time/100);

    function calculatePosition(i) {
      t = i*(max_time_100);
      console.log("After " + t + " seconds:");
      x = findX(angle, v, t);
      y = findY(g, angle, v, t);

      console.log(x);
      console.log(y);

      console.log("");

      $('#graph').append('<span class="dot" style="left:' + x + 'px; bottom:' + y + 'px;"></span>');

      moveBall(x, y);

      i++;
    }

    function setIntervalX(callback, delay, repetitions) {
      // Disable Button
      $('#simulate').prop('disabled', true);

      var x = 0;
      var intervalID = window.setInterval(function () {

        calculatePosition(x);

        if (++x === repetitions) {
          window.clearInterval(intervalID);

          // Re-enable Button
          $('#simulate').prop('disabled', false);
        }
      }, delay);
    }

    setIntervalX(function () {}, (max_time*10), 101);
  }

  $('#simulate').click(function(event) {
    event.preventDefault();

    var v_input = $('#v-input').val();
    var angle_input = $('#angle-input').val();

    simulate(v_input, angle_input);
  });
});