Template.Webcam.onRendered(function() {

/*
  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true,
    url: 'http://192.168.1.130:8080'
  });
*/

var streaming = false,
     video        = document.querySelector('#video'),
     cover        = document.querySelector('#cover'),
     canvas       = document.querySelector('#canvas'),
     photo        = document.querySelector('#photo'),
     startbutton  = document.querySelector('#startbutton'),
     width = 200,
     height = 0;

     navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

    navigator.getMedia({
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    });



    video.addEventListener('canplay', function(event) {
      if(!streaming) {
        video.setAttribute('width', $(".page-content").width());
        console.log('video.videoWidth', video.videoWidth)
      }
    }, false);

/*
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        console.log('---------canplay---------');
        console.log('video.videoHeight', video.videoHeight);
        console.log('width', width);
        console.log('height', height);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
*/
    function takepicture() {
       canvas.width = width;
       canvas.height = height;
       canvas.getContext('2d').drawImage(video, 0, 0, width, height);
       var data = canvas.toDataURL('image/png');
       console.log('data', data);
       photo.setAttribute('src', data);
     }

     startbutton.addEventListener('click', function(ev){
       console.log('Capturamos una foto');
       takepicture();
      ev.preventDefault();
    }, false);


});
