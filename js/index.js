$(document).ready(function()
{
  var startTimer = false;
  var interval;
  //Set the initial value of border width
  var border_width = 5;
  var startTime = (Number($(".sessionLength").text())*60).toString();
  $(".clock").html($(".sessionLength").text());
    
  //If timmerButton clicked.
  $(".timerButton").click(function()
  {
    if (startTimer === false)
      {
        startTimer = true;
        var time = Number(startTime);
        interval = setInterval(function()
       {
          border_width = border_width + 114/Number(startTime);
          time = time - 1;
          // change the border width
          $(".timerButton").css("border-width", border_width);
          var minStr = (Math.floor(time/60)).toString();
          var secStr = (time%60).toString();
          if (minStr.length === 1)
            minStr = "0" + minStr;
          if (secStr.length === 1)
            secStr = "0" + secStr;
          $(".clock").html(minStr +":"+secStr);
          if (time === 0)
            {
              // When Time is 0 toggle between Session and Break
              // and accordingly change border-width, border-color
              // and time.
              if ($(".progressDiv").text() === "Session")
                {
                  $(".progressDiv").html("Break!");
                  $(".clock").html($(".breakLength").text());
                  $(".timerButton").css("border-color","salmon");
                  border_width = 5;
                  time = Number($(".breakLength").text())*60;
                  startTime = time;
                }
              else
                {
                  $(".progressDiv").html("Session");
                  $(".clock").html($(".sessionLength").text());
                  $(".timerButton").css("border-color","#33E9FF");
                  border_width = 5;
                  time = Number($(".sessionLength").text())*60;
                  startTime = time;
                }
            }
        }, 1000);
      }
    else
      {
        startTimer = false;
        var clockTime = $(".clock").text().split(':');
        startTime = (Number(clockTime[0])*60) + Number(clockTime[1]);
        clearInterval(interval);
      }
  });
  $(".counterButton").click(function()
  {
    // Handling of events when "+" or "-" is pressed.
    if (!startTimer)
      {
    if ($(this).attr("value") === "-breakLength" && Number($(".breakLength").text()) > 1)
      {
        $(".breakLength").html( (Number($(".breakLength").text()) - 1).toString());
      }
    else if ($(this).attr("value") === "+breakLength")
      {
        $(".breakLength").html( (Number($(".breakLength").text()) + 1).toString());
      }
    else if ($(this).attr("value") === "-sessionLength" && Number($(".sessionLength").text()) > 1)
      {
        $(".sessionLength").html( (Number($(".sessionLength").text()) - 1).toString());
        $(".clock").html($(".sessionLength").text());
      }
    else if ($(this).attr("value") === "+sessionLength")
      {
        $(".sessionLength").html( (Number($(".sessionLength").text()) + 1).toString());
        $(".clock").html($(".sessionLength").text());
      }
      startTime = (Number($(".sessionLength").text()) * 60).toString();
      }
  });
});