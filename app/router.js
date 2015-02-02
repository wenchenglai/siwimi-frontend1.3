import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');

  this.resource('user', function() {
      this.route('account');
      this.route('profile');
      this.route('rewards');
      this.resource('inbox', function () {
          this.route('detail', { path: '/detail/:id' });
          this.route('browse');
          this.route('new');
          this.route('sent');
          this.route('trash');
      });
  });

  this.resource('connect', function () {
      this.route('search');
      this.route('myfamily');
      this.route('addmember');
      this.route('editmember');
      this.route('editperson', { path: '/editperson/:id' });
  });

  this.resource('items', function () {
      this.route('search');
      this.route('myitems');
      this.route('additem');
  });

  this.resource('activity', function () {
      this.route('search');
      this.route('calendar');
      this.route('map');
      this.route('my');
      this.route('edit');
  });

  this.resource('question', function () {
      this.route('ask');
      this.route('browse');
      this.route('my');
  });

  this.resource('tip', function () {
      this.route('browse');
      this.route('my');
      this.route('new');
      this.route('detail', { path: '/detail/:id' });
      this.route('show', { path: ':tip_id' });
      this.route('edit', { path: ':tip_id/edit' });
  });
});

export default Router;
