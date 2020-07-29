editor.document.designMode = "On";

function transform(option, argument) {
  editor.document.execCommand(option, false, argument);
}

function startTimer(duration, display) {
    var flag=0 ;
    var timer = duration, hours,minutes, seconds;
    var inter=setInterval(function () {
        hours = parseInt(timer /3600 , 10);
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours< 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(minutes >= 60 && minutes<120){
            minutes=minutes-60;
        }

        if(minutes >= 120){
            minutes=minutes-120;
        }
        if(!document.hidden){
        display.textContent = hours + ":" + minutes + ":" + seconds;
    }
    else{
        flag=1 ;
        clearInterval(inter) ;
    }
        if (--timer < 0) {
            timer = duration;
        }
          if(display.textContent=='00:00:00' ||  flag==1){
        //document.getElementById("body").style.display = "none";
        if(flag == 1){
            alert("YOU TEST IS OVER!!");
        }
        else{
        alert("YOUR TIME IS UP!! :)")
        //document.getElementById("completion-notice").style.display = "block";
        window.location.href = 'success';
    }
        clearInterval(inter) ;

    }
    }, 1000);
}

function go() {
  var fiveMinutes = 180*10,
      display = document.querySelector('#demo');
  //startTimer(fiveMinutes, display);
  var date = new Date()
   var time_of_test
  var duration
  var end_time;
  var waste
          var time;
           var hours
           var mins
           var secs
           var dwaste
           var dhours
           var dmins
           var dsecs
           var totalhours
           var totalMin
           var totalSec
  database.ref('users/' + uid +'/question_paper/' + Batch[0] + '/' + question_paper_type + '/' + question_paper + '/' ).once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
      console.log(childSnapshot);
       if(childSnapshot.val().start_time){
           console.log(childSnapshot.key);
           console.log(childSnapshot.val().start_time);
           time_of_test = childSnapshot.val().start_time;
           duration = childSnapshot.val().duration;
            waste = time_of_test.split(':');
            hours = parseInt(waste[0] * 60 * 60);
            mins = parseInt(waste[1] * 60 );
            secs = parseInt(waste[2]);
            dwaste = duration.split(':');
            dhours = parseInt(dwaste[0] * 60 * 60);
            dmins = parseInt(dwaste[1] * 60 );
            dsecs = parseInt(dwaste[2]);
            totalhours = parseInt(hours + mins + secs);
            totalMin = parseInt(totalhours + dhours + dmins + dsecs);
            console.log(totalhours , totalMin);
          time = parseInt( (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds))
          console.log(time);

      }
  });
  if (time < totalhours){
    alert('There is some time to start the test');
      console.log(question_number);
  }
  if( time >= totalhours && time < totalMin){
      startTimer(totalMin - time , display);
      document.getElementById('start-button').style.display = 'none';
      console.log('called' , question_number);
      console.log(question_number);
      xyz();
  }
  if ( time > totalMin){
    alert('The test is over');
      //
  }
});

};
