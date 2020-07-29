var q=document.querySelector(".response__title") ;
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
    var uid = sessionStorage.getItem('uid');
      var toTeacher;
      var fb_db1 = firebase.database().ref('Student/' + uid + '/doubts/asked/');
      var fb_db = firebase.database().ref('Student/' + uid + '/doubts/answered/');
      console.log(fb_db)
     document.querySelector('.header-dropdown').addEventListener('click' , function(){
        console.log(h);
        var i = 1;
        fb_db.once("value")
      .then(function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
          console.log(0) ;
          var childData = childSnapshot.val();
          if(childData.teacher == h){
            $(".outer").append("<div class='response'><div class= 'response__number'>" + i + "</div> <h1 class='response__title'>" + childData.doubt + "</h1><div class='post-group'><div class='post'><div class='post__avatar'></div><h3 class='post__author'>Teacher</h3><h4 class='post__timestamp'>Replies as: </h4><p class='post__body'>"+ childData.answered +"</p></div></div></div>");
            i++;
            console.log(childData.doubt) ;
        }
      });
    });

    fb_db1.once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.val();
          if(childData.teacher == h){
            $(".outer").append("<div class='response'><div class= 'response__number'>" + i + "</div> <h1 class='response__title'>" + childData.doubt + "</h1><div class='post-group'><div class='post'><div class='post__avatar'></div><h3 class='post__author'>Teacher</h3><h4 class='post__timestamp'>Replies as: </h4><p class='post__body'>YET TO BE ANSWERED</p></div></div></div>");
            i++;
          }
        });
    })
  });
