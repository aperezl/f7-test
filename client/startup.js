Template.Layout.onCreated(function() {
  console.log('Se carga Layout');
  f7 = new Framework7({
    router: false,
    swipeBackPage: false,
    animatePages: true,
    materialRipple: false,
    cache: false,
    sortable: false,
    swipeout: false,
    onPageInit: function (app, page) {
      console.log('app', app);
      console.log('page', page);
    },
    preprocess: function (content, url, next) {
      console.log('preprocess')
    }


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
