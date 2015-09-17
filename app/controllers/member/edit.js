import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(StatesDataMixin,  {
    queryParams: ['isAdmin'],
    allLanguages: ['Chinese (Mandarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allToys: ['Lego', 'Trains', 'Cars', 'Princess'],
    allNeeds: ['ADHD', 'Autism', 'Cerebral Palsy', 'Deafness/Hearing Loss', 'Down Syndrome', 'Learning Disability', 'Mental Retardation', 'Speech and Language Impairments', 'Visual Impairments'],
    allRelationships: [
      "Daughter",
      "Son",
      "Parent",
      "Grandparent",
      "Pet"
    ],
    allEvents: ["Birthday", "Farm", "Festival", "Movies", "Playdates", "Sport", "Storytelling"],

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
