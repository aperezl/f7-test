Template.Chat.onRendered(function() {

  myMessagebar = f7.messagebar('.messagebar', {
    maxHeight: 200
  });

  myMessages = f7.messages('.messages', {
    autoLayout: true
  });

  var started = false
  Messages.find().observe({
    added: function(record) {
      if(started) {
        console.log('Added', record);
        myMessages.scrollMessages();
      }
    }
  });
  var started = true;

});


function addMessage() {

  var messageText = myMessagebar.value().trim();
  if (messageText.length === 0) return;
  myMessagebar.clear()
  var messageType = (['sent', 'received'])[Math.round(Math.random())];
  var avatar, name;
  if(messageType === 'received') {
    avatar = 'http://lorempixel.com/200/200/people/9';
    name = 'Kate';
  }

  var conversationStarted = false;
  console.log('Router.current().params', Router.current().params._id)
  Meteor.call('demo', {text: messageText, to: Router.current().params._id}, function(error, result) {
    console.log('error', error);
    console.log('result', result);
    myMessages.scrollMessages();
    //myMessages.layout();
  });

  /*
  myMessages.addMessage({
    text: messageText,
    type: messageType,
    avatar: avatar,
    name: name,
    //day: !conversationStarted ? 'Today' : false,
    //time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  });
  */

  conversationStarted = true;
}


Template.Chat.events({
  'click .messagebar .link': function(event, instance) {

    addMessage();

  },
  'keypress .messagebar': function(event) {
    if (event.which === 13 &&  event.shiftKey == false) {
         //event.stopPropagation();
         addMessage();
         return false;
      }
  }

});


Template.Chat.helpers({
  messages: function() {
    return Messages.find();
  },
  isSender: function() {
    return this.from===Meteor.userId();
  }
})
