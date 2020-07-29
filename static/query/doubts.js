var firebaseConfig = {
    apiKey: "AIzaSyB-W2AktdEtM7z_KHSWXXT_3PoBoWFdubM",
    authDomain: "dredu-71835.firebaseapp.com",
    databaseURL: "https://dredu-71835.firebaseio.com",
    projectId: "dredu-71835",
    storageBucket: "dredu-71835.appspot.com",
    messagingSenderId: "1010179971420",
    appId: "1:1010179971420:web:d2fc28ac5634b8ee8a0999",
    measurementId: "G-19Z5Q66FHX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  document.getElementById('send').addEventListener('click' , function(e) {
    e.preventDefault();
    e.stopPropagation();
  var user = sessionStorage.getItem('uid');
  var fb_db = firebase.database().ref('Student/' + user + '/doubts/');
  var question = document.getElementById('messarea').value;
  var teacher = document.getElementById('teacher').innerText;
  var batch;
  var toTeacher;
  console.log(user ,  " " ,  question , " " ,  teacher);
  fb_db.child('asked/').push({
     doubt: question ,
     teacher: teacher
  });
 var database = firebase.database().ref('Student/' + user + '/');
 database.child('subjects/' + teacher + '/').once('value' , function(snapshot){
       toTeacher = snapshot.val();
        console.log(toTeacher);
 });

 database.child('Batch/').once('value', function(snapshot){
   console.log(snapshot);
   batch = snapshot.val();
   console.log(batch);
 });
 var user_name;
 database.child('name/').once('value' , function(snapshot){
   user_name = snapshot.val();
   console.log(user_name );
   var database2 = firebase.database().ref('users/' + toTeacher + '/stu/' + batch + '/');
   database2.child( user_name + '/').push({
   doubt: question });
 });
 alert("Your Doubt has been send. Stay Tuned for the Teachers Reply");
 window.location.href="yourquery"
});
