import Ember from 'ember';
import StatesDataMixin from './states-data';

export default Ember.Mixin.create(StatesDataMixin, {
    _setLongitudeAndLatitudeInSession: function (session, member) {
        var family = member.get('family'),
            longitude = 0.0,
            latitude = 0.0,
            baseCity = '',
            baseState = '';

        if (family) {
            if (family.get('location')) {
                longitude = family.get('location')[0];
                latitude = family.get('location')[1];
            }

            if (family.get('city') && family.get('state')) {
                baseCity = family.get('city');
                baseState = family.get('state');                
            }
        } else if (member.get('location')) {
            longitude = member.get('location')[0];
            latitude = member.get('location')[1];

            if (member.get('city') && member.get('state')) {
                baseCity = member.get('city');
                baseState = member.get('state');                
            }
        }

        if (longitude === 0.0) {
            longitude = geoplugin_longitude();
        }

        if (latitude === 0.0) {
            latitude = geoplugin_latitude();
        }

        if (Ember.isEmpty(baseCity)) {
            baseCity = geoplugin_city();
        }

        if (Ember.isEmpty(baseState)) {
            baseState = this.get('statesHash')[geoplugin_region()];
        }
        
        session.set('longitude', longitude);
        session.set('latitude', latitude);
        session.set('baseCity', baseCity);
        session.set('baseState', baseState);
    },

    _setProfilePictureInSession: function (session, member) {
        var pic = member.get('avatarUrl');

        if (pic) {
            session.set('profilePicture', pic);
        } else {
            session.set('profilePicture', '/assets/images/avatar.jpg');
        }
    },
});
