Template.VideochatContent.onCreated(function() {
  console.log('onCreated');
  this.localVideo = null;
  this.remoteVideo = null;
  localStream = null;
  peerConnection = null;
  _uuid = null;
  serverConnection = null;
  this.peerConnectionConfig = {
    'iceServers': [
      {'urls': 'stun:stun.services.mozilla.com'},
      {'urls': 'stun:stun.l.google.com:19302'},
    ]
  };

});

Template.VideochatContent.onRendered(function() {
  console.log('onRendered');
  _uuid = uuid();
  this.localVideo = document.getElementById('localVideo');
  this.remoteVideo = document.getElementById('remoteVideo');
  serverConnection = new WebSocket('ws://192.168.1.132:3434');
  serverConnection.onmessage = function(message) {
    if(!peerConnection) start(false);

    var signal = JSON.parse(message.data);

    // Ignore messages from ourself
    if(signal.uuid == uuid) return;

    if(signal.sdp) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {
            // Only create answers in response to offers
            if(signal.sdp.type == 'offer') {
                peerConnection.createAnswer().then(createdDescription).catch(errorHandler);
            }
        }).catch(function(error) {
          console.log('error', error);
        });
    } else if(signal.ice) {
        console.log('signal', signal.ice);
        peerConnection
        .addIceCandidate(new RTCIceCandidate(signal.ice))
        .catch(function(error) {
          console.log('error', error);
        });
    }
  };

  var constraints = {
    video: true,
    audio: true,
  };
  if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      localStream = stream;
    	this.localVideo.src = window.URL.createObjectURL(stream);
    })
    .catch(function(error) {
    	console.log('error', error);
    });
  } else {
      console.log('Your browser does not support getUserMedia API');
  }
});

Template.VideochatContent.events({
  'click #start': function(event) {
    console.log('click');
    start();
    peerConnection.createOffer()
    .then(function(description) {
        console.log('Llama realizada', this.peerConnection);
        peerConnection.setLocalDescription(description)
        .then(function() {
       	  serverConnection.send(JSON.stringify({'sdp': peerConnection.localDescription, 'uuid': _uuid}));
       	});
    })
    .catch(function(error) {
    	console.log(error);
    });
  }
});


// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function start() {
  peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
  peerConnection.onicecandidate = function(event) {
    if(event.candidate != null) {
    serverConnection.send(JSON.stringify({'ice': event.candidate, 'uuid': _uuid}));
      }
  }
  peerConnection.onaddstream = function(event) {
    remoteVideo.src = window.URL.createObjectURL(event.stream);
    console.log('platform', navigator.platform);
    if(navigator.platform === "iPhone") {
      cordova.plugins.iosrtc.selectAudioOutput('speaker');
    }
  }
  peerConnection.addStream(localStream);
}
