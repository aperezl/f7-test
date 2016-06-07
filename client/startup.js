Template.Layout.onCreated(function() {
  console.log('Se carga Layout');
  f7 = new Framework7({
    router: false,
    swipeBackPage: true,
    animatePages: true,
  });
  console.log('REnder main')
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

/*
  this.find('.pages')._uihooks = {
    insertElement: function(node, next) {
      mainView.router.loadContent(node);
    },
    removeElement: function(node) {
      return true;
    }
  };
*/
});
