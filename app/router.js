
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.reopen({
    notifyGoogleAnalytics: function () {
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
        });
    }.on('didTransition')
});

Router.map(function () {
    this.route('login');
    this.route('loginModal');
    this.route('forgotPassword');
    this.route('about');

    this.resource('user', function () {
      this.route('account');
      this.route('profile');
      this.route('rewards');
      this.resource('inbox', function () {
          this.route('detail', {path: '/detail/:id'});
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
      this.route('show', {path: ':id'});
      this.route('edit', {path: ':id/edit'});
      this.route("preference");
      this.route("search");
    });

    this.resource("family", function () {
      this.route("browse");
      this.route("my");
      this.route("new");
      this.route("show", {path: ':id'});
      this.route("edit", {path: ':id/edit'});
      this.route("preference");
    });

    this.resource("member", function () {
    this.route('browse');
    this.route("new");
    this.route("show", {path: ':id'});
    this.route("edit", {path: ':id/edit'});
    this.route('changepassword', {path: ':id/changepassword'});
    });

    this.resource("feedback", function () {
      this.route('browse');
      this.route("new");
    });

    this.resource("item", function () {
      this.route("browse");
      this.route("my");
      this.route("new");
      this.route("show", {path: ':id'});
      this.route("edit", {path: ':id/edit'});
      this.route("preference");
      this.route("search");
    });

    this.resource('activity', function () {
      this.route("browse");
      this.route('my');
      this.route("new");
      this.route("show", {path: ':id'});
      this.route('edit', {path: ':id/edit'});
      this.route('search');
      this.route('calendar');
      this.route('map');
      this.route("preference");
      this.route('infinite');
    });

    this.route("questions", function () {
      this.route("browse");
      this.route("my");
      this.route("new");
      this.route("show", {path: ':id'});
      this.route("edit", {path: ':id/edit'});
      this.route("preference");
    });

    this.route("group", function () {
      this.route("my");
      this.route("new");
      this.route("show", {path: ':id'});
      this.route("edit", {path: ':id/edit'});
    });

    this.route('register', function () {
      this.route('signup');
      this.route('signup2', {path: 'member/:id/signup2'});
      this.route('getconfirmation', {path: 'getconfirmation/:id'});
    });

    this.route('feeds', function() {
    this.route('browse');
    });

    this.route('admin', function() {
        this.route('members', function() {
            this.route('member', {path: '/member/:id'});
            this.route('edit', {path: '/member/:id/edit'});
        });
    });
});

export default Router;
