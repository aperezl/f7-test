Router.configure({
  layoutTemplate: 'Layout',
  onStop: function() {
  }
});
Router.route('home', function () {
  this.render('Home');
}, {
  path: '/',
  action: function() {
    console.log('f7', f7);
  }
});


Router.route('/chat/:_id', {
  name: 'chat',
  template: 'Chat',
  subscriptions: function() {
    this.subscribe('messages', this.params._id);
  },
  data: function() {
    return this.params
  }
})

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

Router.route('/webcam', function() {
  this.render('Webcam');
});


Router.route('/service', function() {
  console.log('Renderizando services');
  this.render('Services')
});

Router.route('/videochat', function() {
  this.render('Videochat');
});
