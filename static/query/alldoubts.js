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
    document.querySelector('.header-dropdown').addEventListener('click' , function(){
        console.log(h);
        var fb_db = firebase.database().ref('Student/' + uid + '/');
        console.log(fb_db);
        fb_db.child('subjects/' + h + '/').once('value' , function(snapshot){
          toTeacher = snapshot.val();
         console.log(toTeacher);
      });
      var i = 1;
      var database = firebase.database().ref('Student/');
      database.once('value' , function(snapshot){
        console.log(snapshot)
        snapshot.forEach(function(childSnapshot){
          console.log(childSnapshot.val.doubts)
          childSnapshot.val().doubts.forEach(function(v){
            console.log('v' , v );
            v.forEach(function(o){
              console.log('o' , o);
              var childKey = o.key;
                                         var childData = o.val();
                                         console.log(childData.doubt);
                                         if(childData.doubt != undefined){
                                         $(".outer").append("<div class='response'><div class= 'response__number'>" + i + "</div> <h1 class='response__title'>" + childData.doubt + "</h1><div class='post-group'><div class='post'><div class='post__avatar'></div><h3 class='post__author'>Muskan Jain</h3><h4 class='post__timestamp'>Mar 06 at 8:51pm</h4><p class='post__body'></p><div class='post__actions'><div class='button button--approve'><i class='fa fa-thumbs-o-up'></i><i class='fa fa-thumbs-up solid'></i></div><div class='button button--deny'><i class='fa fa-thumbs-o-down'></i><i class='fa fa-thumbs-down solid'></i></div><div class='button button--fill comment-trigger'><span>Comment...</span></div><div class='button button--flag'><i class='fa fa-comment-o'></i><i class='fa fa-comment solid'></i></div><div class='post__comments'><div class='comment-group'></div><div class='comment-form'><div class='comment-form__avatar'></div><textarea style='resize:none; '></textarea><div class='comment-form__actions'><div class='button button--light cancel'>Cancel</div><div class='button button--confirm'>Comment</div></div><div></div></div></div></div></div>");
                                         i++;
                                       }
            });
            $(".comment-trigger").click(function () {
                                         $(this).parent().parent().toggleClass("post--commenting");
                                       });
                                       $(".button--flag").click(function () {
                                         $(this).parent().parent().toggleClass("post--commenting");
                                       });
                                       $(".button.cancel").click(function () {
                                         $(this).parent().parent().parent().parent().parent().toggleClass("post--commenting");
                                       });
                                       $(".button--confirm").click(function () {
                                         $(this).parent().parent().parent().parent().parent().toggleClass("post--commenting");
                                       });
          });
        });
      });
     // var database = firebase.database().ref("users/" + toTeacher + "/" );
     // database.child('stu/').once('value', function(snapshot){
     //                          console.log('called', toTeacher, snapshot);
     //                          snapshot.forEach(function(childSnapshot) {
     //                            console.log('called1' , childSnapshot.val());
     //                            childSnapshot.forEach(function(childchildSnapshot){
     //                              childchildSnapshot.forEach(function(p){
     //                            var childKey = p.key;
     //                            var childData = p.val();
     //                            console.log(childData.doubt);
     //                            if(childData.doubt != undefined){
     //                            $(".outer").append("<div class='response'><div class= 'response__number'>" + i + "</div> <h1 class='response__title'>" + childData.doubt + "</h1><div class='post-group'><div class='post'><div class='post__avatar'></div><h3 class='post__author'>Muskan Jain</h3><h4 class='post__timestamp'>Mar 06 at 8:51pm</h4><p class='post__body'></p><div class='post__actions'><div class='button button--approve'><i class='fa fa-thumbs-o-up'></i><i class='fa fa-thumbs-up solid'></i></div><div class='button button--deny'><i class='fa fa-thumbs-o-down'></i><i class='fa fa-thumbs-down solid'></i></div><div class='button button--fill comment-trigger'><span>Comment...</span></div><div class='button button--flag'><i class='fa fa-comment-o'></i><i class='fa fa-comment solid'></i></div><div class='post__comments'><div class='comment-group'></div><div class='comment-form'><div class='comment-form__avatar'></div><textarea style='resize:none; '></textarea><div class='comment-form__actions'><div class='button button--light cancel'>Cancel</div><div class='button button--confirm'>Comment</div></div><div></div></div></div></div></div>");
     //                            i++;
     //                          }  });
     //                            $(".comment-trigger").click(function () {
     //                              $(this).parent().parent().toggleClass("post--commenting");
     //                            });
     //                            $(".button--flag").click(function () {
     //                              $(this).parent().parent().toggleClass("post--commenting");
     //                            });
     //                            $(".button.cancel").click(function () {
     //                              $(this).parent().parent().parent().parent().parent().toggleClass("post--commenting");
     //                            });
     //                            $(".button--confirm").click(function () {
     //                              $(this).parent().parent().parent().parent().parent().toggleClass("post--commenting");
     //                            });
     //                          });});});
  });
