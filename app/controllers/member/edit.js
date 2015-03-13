import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.ObjectController.extend(StatesDataMixin, {
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allRelationships: [
      "Daughter",
      "Son",
      "Parent",
      "Grandparent",
      "Pet"
    ],
    pronoun: function() {
        if (this.get('gender') === 'male')
            return 'He';
        else
            return 'She';
    }.property('gender'),
});
