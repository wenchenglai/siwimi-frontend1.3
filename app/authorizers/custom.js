import Base from 'simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(jqXHR, requestOptions) {
    if (this.get('session.isAuthenticated')) {
      jqXHR.setRequestHeader('Authorization', 'Token: abcdToken');
    }
  }
});
