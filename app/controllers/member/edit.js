import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(StatesDataMixin, {
    queryParams: ['isAdmin'],
    allLanguages: ['Chinese (Mandarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allRelationships: [
      "Daughter",
      "Son",
      "Parent",
      "Grandparent",
      "Pet"
    ],

    showAdminPanel: Ember.computed('isAdmin', function() {
        var self = this,
            show = false,
            userRole = self.get('session.secure.user.role');

        if (self.get('isAdmin') === "true") {
            show = true;
        } else if (!Ember.isEmpty(userRole)) {
            if (userRole === "admin") {
                show = true;
            }
        }

        return show;
    })
});
