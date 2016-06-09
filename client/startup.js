Template.Layout.onCreated(function() {


  f7 = new Framework7({
    fastClicks: false,
    material: true,
    pushState: true,
    materialRippleElements: '',
    swipePanel: 'left',
    materialRipple: false

  });
/*
  mainView = f7.addView('.view-main', {
    onSwipeBackBeforeChange: function(callbackData) {
      history.back();
    }
  });
  leftView = f7.addView('.view-left', {
    dynamicNavbar: true
  });
  */
  console.log($('.views'));


});

Template.Layout.onRendered(function() {
  this.find('.pages')._uihooks = {
    insertElement: function(node, next) {
      mainView.router.loadContent(node);
      console.log('Algo se ha cambiado');
    },
    removeElement: function(node) {
      return true;
    }
  };

});
