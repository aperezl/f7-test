/*
Template.Group.events({
  'click .open-links': function(event, instance) {
    f7.popover('.popover-links', event.currentTarget);
  }
})
*/

//$('#basicExample').justifiedGallery();

Template.Group.onCreated(function() {
  //CachedFile.install();
  Meteor.subscribe('files.images.all');
})

Template.Group.onRendered(function() {
  var self = this;
  self.swipeBoxReady = new ReactiveVar(false);
  $('#basicExample').justifiedGallery({
    margin: 1,
    rowHeight : 60,
    lastRow : 'justify'
 }).on('jg.complete', function () {
    console.log('Cargado...');
  });
});


Template.Group.events({
  'click': function(event, instance) {
    if(!$(event.target).hasClass("list-button")) {
      f7.closeModal('.popover-links');
    };
    console.log('instance', instance);
  }
})
