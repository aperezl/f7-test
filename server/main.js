import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});

Meteor.publish('presences', function() {
  return Presences.find({}, { userId: true });
});
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {"profile.peerId": true, "emails.address": true} });
});

Meteor.publish('allusers', function() {
  return Meteor.users.find({});
});

Meteor.publish('messages', function() {
  var currentUserId = this.userId;
  return Messages.find({ $or:[{from: currentUserId}, {to: currentUserId}] });
  //return Messages.find();
});


//Methods

Meteor.methods({
  demo: function(message) {
    console.log('método demo activado', this.userId, message);
    Messages.insert({
      from: this.userId,
      to: message.to,
      text: message.text
    });
    return 'is all ok';
  }
})
