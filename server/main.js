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

Meteor.publish('user', function(id) {
  return Meteor.users.find(id, {fields: {"profile.peerId": true, "emails.address": true} });
});

Meteor.publish('allusers', function() {
  return Meteor.users.find({});
});

Meteor.publish('messages', function(id) {
  var currentUserId = this.userId;
  console.log('id', id);
  //return Messages.find({ $or:[{from: currentUserId}, {to: currentUserId}] });
  return Messages.find({
    $or: [
      { $and:[{from: currentUserId}, {to: id}] },
      { $and:[{from: id}, {to: currentUserId}] }
    ]
  });
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
