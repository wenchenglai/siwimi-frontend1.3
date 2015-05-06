import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.reopen({
    notifyGoogleAnalytics: function() {
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
        });
    }.on('didTransition')
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

  this.resource('tip', function () {
    this.route('browse');
    this.route('my');
    this.route('new');
    this.route('show', { path: ':tip_id' });
    this.route('edit', { path: ':tip_id/edit' });
    this.route("preference");
    this.route("search");
  });

  this.resource("family", function() {
    this.route("browse");
    this.route("my");
    this.route("new");
    this.route("show", { path: ':family_id' });
    this.route("edit", { path: ':family_id/edit' });
    this.route("preference");
  });

  this.resource("member", function() {
      this.route("new");
      this.route("show", { path: ':member_id' });
      this.route("edit", { path: ':member_id/edit' });
  });

  this.resource("feedback", function() {
      this.route("new");
  });

  this.resource("item", function() {
    this.route("browse");
    this.route("my");
    this.route("new");
    this.route("show", { path: ':item_id' });
    this.route("edit", { path: ':item_id/edit' });
    this.route("preference");
    this.route("search");
  });

  this.resource('activity', function () {
    this.route("browse");
    this.route('my');
    this.route("new");
    this.route("show", { path: ':activity_id' });
    this.route('edit', { path: ':activity_id/edit' });
    this.route('search');
    this.route('calendar');
    this.route('map');
    this.route("preference");
    this.route('infinite');
  });

  this.route("questions", function() {
    this.route("browse");
    this.route("my");
    this.route("new");
    this.route("show", { path: ':question_id' });
    this.route("edit", { path: ':question_id/edit' });
    this.route("preference");
  });
  this.route("group", function() {
    this.route("my");
    this.route("new");
    this.route("show", { path: ':group_id' });
    this.route("edit", { path: ':group_id/edit' });
  });
});

export default Router;
