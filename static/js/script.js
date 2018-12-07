$(function(){
  var socket = io.connect();
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $messageArea = $('#messageArea');
  var $userform = $('#userform');
  var $userForm = $('#userForm');
  var $users = $('#users');
  var $username = $('#username');

  $messageForm.submit(function(event){
    event.preventDefault();
    console.log('Submitted');
    socket.emit('send message', $message.val());
    $message.val('');
  });

  socket.on('new message', function(data){
    $chat.prepend('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
  });

  $userForm.submit(function(event){
    event.preventDefault();
   // console.log('Submitted');
    socket.emit('new user', $username.val(), function(data){
      if(data){
        $userform.hide();
        $messageArea.show();
      }
    });
    $username.val('');
  });

  //Get users:
  socket.on('get users', function(data){
    var html = '';
    for(i = 0; i < data.length; i++){
      html += '<li class="list-group-item">'+data[i]+'</li>';
    }
    $users.html(html);
  });

  //Get sessions:
  socket.on('get sessions', function(data){
  })

  // Time functions
  document.getElementById('timer').innerHTML = 15+":"+00;
  
  var myTime;

  $('#startbtn').click(function startTimer(){
    $('#startbtn').hide();
    $('#stopbtn').show();
    $('#message').show();
    $('#messagebtn').show();
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}

    document.getElementById('timer').innerHTML = m + ":" + s;
    myTime= setTimeout(startTimer, 1000);
    if(m==00 && s==00){
      clearTimeout(myTime);
      document.getElementById('timer').innerHTML = 00 + ":" + 00;
      $('#stopbtn').hide();
      $('#messagebtn').hide();
      $('#message').hide();
      $('#seplaceholder').show();
    }
  });

  $('#stopbtn').click(function stopTimer(){
    clearTimeout(myTime);
    document.getElementById('timer').innerHTML = 00 + ":" + 00;
    $('#stopbtn').hide();
    $('#messagebtn').hide();
    $('#message').hide();
    $('#seplaceholder').show();
  });

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }
});

var user = {name:""};
            
        $('#loginbtn').click(function(event){
            user.name = $('#name').val();
            $.ajax({
                method: "POST",
                url: "/user/create",
                data: user
            }).done(function(response){
                console.log(response);
                document.location = '/index';
            }).fail(function(response){
                console.log(response.responseText);
            });
        });
        
        $('#getUser').click(function(event){
          $.ajax({
              method: "GET",
              url: "/user/list",
          }).done(function(response){
              console.log(response);
          }).fail(function(response){
              console.log(response.responseText);
          });
        });
