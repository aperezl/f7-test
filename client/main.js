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

Router.route('/timeline', function() {
  this.render('TimeLine');
});

Router.route('/login', function() {
  this.render('Login')
});

Router.route('/themes', function() {
  this.render('Themes');
});


Router.route('/service', function() {
  console.log('Renderizando services');
  this.render('Services')
})

// Init Framework7

Template.Layout.onRendered(function() {

  f7 = new Framework7({
    router: false,
    swipeBackPage: true,
    animatePages: true,
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


  this.find('.pages')._uihooks = {
    insertElement: function(node, next) {
      mainView.router.loadContent(node);
    },
    removeElement: function(node) {
      return true;
    }
  };
});
