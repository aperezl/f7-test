Template.HomeUpload.onCreated(function() {
  Meteor.subscribe('files.images.all');
  this.currentUpload = new ReactiveVar(false);
});


Template.HomeUpload.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  images: function() {
    return Images.find().fetch();
  }
});

Template.HomeUpload.events({
  'change #fileInput': function (event, instance) {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      var upload = Images.insert({
        file: event.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        instance.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          console.log('Error during upload: ' + error);
        } else {
          console.log('File "' + fileObj.name + '" successfully uploaded');
        }
        instance.currentUpload.set(false);
      });

      upload.start();

    }
  }
});
