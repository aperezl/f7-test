Meteor.startup(() => {


  InstanceStatus.events.on('registerInstance', function(id, record) {
    console.log('registerInstance, pid:', record.pid);
  });
  InstanceStatus.registerInstance('Test');
	InstanceStatus.activeLogs();
  //SERVER
  InstanceStatus.getCollection().find({}).observeChanges({
    added: function(id) {
      console.log('New Instance:', id);
    },
    removed: function(id) {
      console.log('Deleted Instance:', id);
    }
  });

  UserPresenceMonitor.start();
  UserPresence.start();
  UserPresence.activeLogs();

});

Meteor.publish('allusers', function() {
  return Meteor.users.find({}, {
    sort: {'presence.status': -1}
  });
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



Meteor.publish('files.images.all', function () {
  return Images.collection.find({});
});
