import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

export default Base.extend({
    authorize: function (jqXHR, requestOptions) {
        var role = 'anonymous',
            user = this.get('session.user');

        if (this.get('session.isAuthenticated')) {
            if (!Ember.isEmpty(user) && !Ember.isEmpty(user.role)) {
                if (user.role === 'admin') {
                    role = "admin";
                } else {
                    role = "user"
                }
            }
        }

        jqXHR.setRequestHeader('Authorization', role);
    }
});
