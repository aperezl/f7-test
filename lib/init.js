var isIOS = function() {
  return ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
}

var isAndroid = function() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}


if(Meteor.isCordova){

    console.log('Run in Cordova');
    document.addEventListener('deviceready', function () {
        // Just for iOS devices.
        console.log('isIOS', isIOS())
        if (isIOS()) {
            cordova.plugins.iosrtc.registerGlobals();
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //cordova.plugins.Keyboard.disableScroll(true);
            console.log('Iniciando en iOS');
        }
    });

}
