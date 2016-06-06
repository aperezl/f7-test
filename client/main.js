Router.configure({
  layoutTemplate: 'Layout'
});

Router.route('home', function () {
  this.render('Home');
}, {
  path: '/'
});

Router.route('/chat', function () {
  console.log('Close panel')
  this.render('Chat');
});

Router.route('/list', function () {
  this.render('List');
});

Router.route('/service', function() {
  console.log('Renderizando services');
  this.render('Services')
})

// Init Framework7

Template.Layout.onRendered(function() {

  f7 = new Framework7({
    router: false,
    swipeBackPage: false,
    animatePages: false,
    swipePanel: 'left'
  });

  mainView = f7.addView('.view-main', {
    onSwipeBackBeforeChange: function(callbackData) {
      console.log('cargando view main');
      history.back();
    },
    dynamicNavbar: true,
    animatePages: false,
    swipeBackPage: false,
    reloadPages: true,
    preloadPreviousPage: false
  });

  leftView = f7.addView('.view-left', {
    dynamicNavbar: true
  });


  this.find('.pages')._uihooks = {
    insertElement: function(node, next) {
      mainView.router.loadContent(node);
      console.log('Enrutando')
    },
    removeElement: function(node) {
      return true;
    }
  };
});



Template.Layout.events({
  'click .icon-back': function() {
    console.log('---');
    $('.panel.panel-left.panel-cover').css('left', 0)
  }
})
