import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';

export default Ember.Controller.extend(CommonDataMixin, {
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allToys: ['Lego', 'Trains', 'Cars', 'Princess'],
    allNeeds: ['ADHD', 'Autism', 'Allergies'],
    toAge: 6,
    fromAge: 0,
    showAdvancedSearch: false,
    actions: {
        searchfamilies: function () {
            var self = this,
                session = self.get('session');

            var query = {
                longitude: session.get('longitude'),
                latitude: session.get('latitude'),
                distance: self.get('distance'),
                languages: self.get('languages'),
                fromAge: self.get('fromAge'),
                toAge: self.get('toAge')
            };

            self.store.find('family', query).then(function(families) {
                self.set('model', families.content);
            }, function(error) {
                self.send('error', error);
            });
        },

        toggleAdvancedSearch: function() {
            if (this.get('showAdvancedSearch')) {
                this.set('showAdvancedSearch', false);
            } else {
                this.set('showAdvancedSearch', true);
            }
        }
    }
});
