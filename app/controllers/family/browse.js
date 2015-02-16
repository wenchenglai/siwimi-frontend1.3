import Ember from 'ember';

export default Ember.Controller.extend({
    ages: [0, 1, 2, 3, 4, 5, 6],
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allToys: ['Lego', 'Trains', 'Cars', 'Princess'],
    allNeeds: ['ADHD', 'Autism', 'Allergies'],
    distances: ['5 miles', '10 miles', '25 miles', '50 miles'],
    toAge: 6,
    fromAge: 0,
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
            });
        }
    }
});
