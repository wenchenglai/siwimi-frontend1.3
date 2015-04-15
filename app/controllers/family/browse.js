import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';

export default Ember.Controller.extend(CommonDataMixin, {
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allToys: ['Lego', 'Trains', 'Cars', 'Princess'],
    allNeeds: ['ADHD', 'Autism', 'Cerebral Palsy', 'Deafness/Hearing Loss', 'Down Syndrome', 'Learning Disability', 'Mental Retardation', 'Speech and Language Impairments', 'Visual Impairments'],
    toAge: 6,
    fromAge: 0,
    showData: false,
    showAdvancedSearch: false,

    actions: {
        toggleAdvancedSearch: function() {
            if (this.get('showAdvancedSearch')) {
                this.set('showAdvancedSearch', false);
            } else {
                this.set('showAdvancedSearch', true);
            }
        }
    }
});
