import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(StatesDataMixin, {
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allToys: ['Lego', 'Trains', 'Cars', 'Princess'],
    allNeeds: ['ADHD', 'Autism', 'Cerebral Palsy', 'Deafness/Hearing Loss', 'Down Syndrome', 'Learning Disability', 'Mental Retardation', 'Speech and Language Impairments', 'Visual Impairments'],
    allRelationships: [
      "Daughter",
      "Son",
      "Parent",
      "Grandparent",
      "Pet"
    ],
    pronoun: function() {
        if (this.get('gender') === 'male') {
           return 'He';
        }else {
           return 'She';
        }
    }.property('gender'),
});
