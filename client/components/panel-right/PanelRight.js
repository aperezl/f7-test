Template.PanelRight.onCreated(function() {
  console.log('onCreated PanelRight and subscribe users and presences');
  Meteor.subscribe("users");
  Meteor.subscribe("presences");
  Meteor.subscribe('allusers');
  var friendIds = Meteor.users.find();



});

Template.ContactList.helpers({
  users: function() {
    var userIds = Presences.find().map(function(presence) {return presence.userId;});
     // exclude the currentUser
    return Meteor.users.find({_id: {$in: userIds, $ne: Meteor.userId()}});
  },
  allusers: function() {
    return Meteor.users.find();
  },
  test: function() {
    return 'This is a tests'
  },
  friends: function() {
    return Meteor.users.find();
  },
  status: function(id) {
    var isActive = Presences.find().fetch().filter(function(value) {
      return value.userId === id;
    })
    return !!isActive.length;
  }

});
