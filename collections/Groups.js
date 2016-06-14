Groups = new Mongo.Collection('groups');
Groups.attachSchema(new SimpleSchema({
  title: {
    type: String,
    min: 3,
    max: 30
  },
  description: {
    type: String,
    max: 255
  },
  ownerId: {
    type: String,
  }
}));
