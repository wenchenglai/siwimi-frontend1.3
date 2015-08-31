import Ember from "ember";
import DS from 'ember-data';
import Session from "simple-auth/session";

export function initialize(registry, application) {
    Ember.debug('Custom-Session Initializer runs.');
}

export default {
  name: 'custom-session-old',
  before: "simple-auth",
  initialize: initialize
};
