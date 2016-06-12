Themes = new Mongo.Collection("themes");
Themes.attachSchema(new SimpleSchema({
  title: {
      type: String,
      label: "Title",
      max: 200
    },
      author: {
      type: String,
      label: "Author"
    },
    summary: {
      type: String,
      label: "Brief summary",
      optional: true,
      max: 1000
    }
}));

Messages = new Mongo.Collection('messages');
Messages.attachSchema(new SimpleSchema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  text: {
    type: String,
    max: 1000
  }
}));
