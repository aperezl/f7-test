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
  },
  //fastRender: true
});


Router.route('/chat/:_id', {
  name: 'chat',
  template: 'Chat',
  subscriptions: function() {
    this.subscribe('messages', this.params._id);
  },
  data: function() {
    return this.params
  },
  //fastRender: true
})

Router.route('/list', {
  name: 'list',
  template: 'List'
});

Router.route('/timeline', {
  name: 'timeline',
  template: 'TimeLine'
});

Router.route('/login', {
  name: 'login',
  template: 'Login'
});

Router.route('/themes', {
  name: 'themes',
  template: 'Themes'
});

Router.route('/webcam', {
  name: 'webcam',
  template: 'Webcam'
});


Router.route('/service', {
  name: 'service',
  template: 'Services'
});

Router.route('/videochat', {
  name: 'videochat',
  template: 'Videochat'
});

Router.route('/group', {
  name: 'group',
  template: 'Group'
});

Router.route('group.form', {
  name: 'group.form',
  template: 'GroupForm',
  path: '/group/new'
});
