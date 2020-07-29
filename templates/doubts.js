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
  var question = document.getElementById('messarea').innerText;
  var teacher = document.getElementById('teacher').innerText;
  var batch;
  var toTeacher;

  alert(user + " " + question + " " + teacher);
  fb_db.child('asked/').push({
     doubt: question ,
     teacher: teacher
  });
 var database = firebase.database().ref('Student/' + user + '/');
 database.child('subjects/').once('value' , function(snapshot){
   snapshot.forEach(function(childSnapshot){
     var childKey = childSnapshot.key;
     if (childKey == teacher){
       toTeacher = childSnapshot.val();
     }
   });
 });
 console.log(toTeacher);
 database.child('Batch/').once('value', function(snapshot){
   batch = snapshot.val();
 });
 console.log(batch);
 var database2 = firebase.database().ref('users/' + toTeacher + '/stu/' + batch + '/');
 database2.child( user + '/').push({
   doubt: question
 });
});
