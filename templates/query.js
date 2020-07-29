onst deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');
setInterval(() => {
    let day = new Date();
let hh = day.getHours() * 30;
let mm = day.getMinutes() * deg;
let ss = day.getSeconds() * deg;
hr.style.transform = `rotateZ(${(hh)+(mm/12)}deg)` ;
mn.style.transform = `rotateZ(${mm}deg)`;
sc.style.transform = `rotateZ(${ss}deg)`;
})
var helo = sessionStorage.getItem("uid");
console.log(helo);
$("ul").on("click", "li", function () {
// body...
$(this).toggleClass("completed");
});
var n=1;
//delete button

$("#q").keypress(function(k){
if(k.which === 13){
var todoText = $(this).val();
$(this).val("");
$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + 'Q.' + n +' ' + todoText + "</li>"); n++;
}

});
$("#temoTime1").keypress(function(k){
if(k.which === 13){
var todoText = $(this).val();
$(this).val(""); upData();
$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + 'Time :'  + todoText + "</li>"); n++;
}

});

$(".fa-pencil-alt").click(function(){
$("input[type='text']").fadeToggle()
});

var fb_db = firebase.database().ref("users/" + helo + "/stu/" );
                              function updateData(){ 
                                console.log("called");
                                data = document.getElementById('q').value;
                                fb_db.child('q/').push({
                                    user_name : data }); 
                                    document.location.reload();
                            }
                            var i = 0;
                            var add ={};
                            fb_db.child('q/').once('value', function(snapshot) {
                              snapshot.forEach(function(childSnapshot) {
                                var childKey = childSnapshot.key;
                                var childData = childSnapshot.val();
                                console.log(childData.user_name);
                                $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + childData.user_name + "</li>");
                              }); 
                              $("ul").on("click","span",function(){
                                $(this).parent().fadeOut(500,function(){
                                  var keyy = $(this).text();
                                  fb_db.child('q/').once('value', function(snapshot) {
                                  snapshot.forEach(function(childSnapshot) {
                                    var childKey1 = childSnapshot.key;
                                    var childData1 = childSnapshot.val();
                                    if(childData1.user_name === keyy) {
                                      fb_db.child('q/' + childKey1 + "/").remove(); 
                                    }
                                });
                              $(this).remove();
                            });   
                            });
                            });
                            });
(function () {
angular.module('inputDemo', ['timeToSeconds']).
controller('demoController', function () {
this.seconds = 60 * 60 * 24 * 2 + 60 * 60 * 7 + 20;
});
})();

(function () {
angular.module('timeToSeconds', []).

directive('timeToSeconds', function () {
return {
restrict: 'A',
require: 'ngModel',
link: timeToSecondsLinker };

});

function timeToSecondsLinker(scope, el, attrs, ngModel) {

var seconds = {};
seconds.minutes = 60;
seconds.hours = seconds.minutes * 60;
seconds.days = seconds.hours * 24;
seconds.years = seconds.days * 365;

var inputReg = /\d+\s*[smhdy]/ig;

// DOM -> Model
ngModel.$parsers.push(function (viewVal) {
if (!angular.isString(viewVal)) {
viewVal += '';
}

var matches = viewVal.match(inputReg);

if (matches === null) {
return 0;
}

var total = 0;

matches.forEach(function (m) {
// Global match doesn't support capture groups        
var val = parseInt(m.substr(0, m.length - 1).trim(), 10) || 0;
switch (m.charAt(m.length - 1)) {
case 'y':
total += val * seconds.years;
break;
case 'd':
total += val * seconds.days;
break;
case 'h':
total += val * seconds.hours;
break;
case 'm':
total += val * seconds.minutes;
break;
case 's':
total += val;
break;}

});

return total;
});

// Model -> DOM
ngModel.$formatters.push(function (modelVal) {
modelVal = parseInt(modelVal, 10);

var c = {
years: 0,
days: 0,
hours: 0,
minutes: 0,
seconds: 0 };


c.years = ~~(modelVal / seconds.years);
modelVal -= c.years * seconds.years;

c.days = ~~(modelVal / seconds.days);
modelVal -= c.days * seconds.days;

c.hours = ~~(modelVal / seconds.hours);
modelVal -= c.hours * seconds.hours;

c.minutes = ~~(modelVal / seconds.minutes);
modelVal -= c.minutes * seconds.minutes;

c.seconds = modelVal;

var resultString = '';
if (c.years > 0) {
resultString += c.years + 'y ';
}
if (c.days > 0) {
resultString += c.days + 'd ';
}
if (c.hours > 0) {
resultString += c.hours + 'h ';
}
if (c.minutes > 0) {
resultString += c.minutes + 'm ';
}
if (c.seconds > 0) {
resultString += c.seconds + 's ';
}

return resultString.trim();
});

el.on('blur', function () {
// Here we'll remove garbage values 
// and show the user what values we really see.
var formatters = ngModel.$formatters,
idx = formatters.length;

var viewValue = ngModel.$modelValue;
while (idx--) {if (window.CP.shouldStopExecution(0)) break;
viewValue = formatters[idx](viewValue);
}window.CP.exitedLoop(0);

ngModel.$setViewValue(viewValue, 'blur');
ngModel.$render();
});
}
})();


(function () {
var resize;

$("#bt").click(function () {
if ($("#bt").hasClass("loading-start")) {
  if ($("#bt").hasClass("loading-end")) {
    return $("#bt").attr("class", "");
  }
} else {
  setTimeout(function () {
    return $("#bt").addClass("loading-start");
  }, 0);
  setTimeout(function () {
    return $("#bt").addClass("loading-progress");
  }, 500);
  return setTimeout(function () {
    return $("#bt").addClass("loading-end");
  }, 1500);
}
});

resize = function () {
return $("body").css({
  "margin-top": ~~((window.innerHeight - 260) / 2)*0 + "px" });

};

$(window).resize(resize);

resize();

}).call(this);