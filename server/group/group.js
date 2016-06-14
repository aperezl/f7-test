Meteor.methods({
  createGroup: function(group) {
    Group.insert({
      title: message.to,
      description: message.text,
      ownerId: this.userId
    });
    return 'group created';
  }
})
