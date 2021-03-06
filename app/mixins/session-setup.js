import Ember from 'ember';
import StatesDataMixin from './states-data';

export default Ember.Mixin.create(StatesDataMixin, {
    _setLongitudeAndLatitudeInSession: function (session, member) {
        var family = member.get('family'),
            longitude = 0.0,
            latitude = 0.0,
            baseCity = '',
            baseState = '',
            baseZipCode = '';

        if (family) {
            if (family.get('location')) {
                longitude = family.get('location')[0];
                latitude = family.get('location')[1];
            }

            if (family.get('city') && family.get('state')) {
                baseCity = family.get('city');
                baseState = family.get('state');
                baseZipCode = family.get('zipCode');
            }
        }

        if (member.get('location') && longitude !== 0.0) {
            longitude = member.get('location')[0];
            latitude = member.get('location')[1];

            if (member.get('city') && member.get('state')) {
                baseCity = member.get('city');
                baseState = member.get('state');
                baseZipCode = member.get('zipCode');
            }
        }

        if (longitude === 0.0) {
            longitude = member.geoplugin_longitude();
        }

        if (latitude === 0.0) {
            latitude = member.geoplugin_latitude();
        }

        if (Ember.isEmpty(baseCity)) {
            baseCity = member.geoplugin_city();
        }

        if (Ember.isEmpty(baseState)) {
            baseState = member.geoplugin_region();
        }

        session.set('longitude', longitude);
        session.set('latitude', latitude);
        session.set('baseCity', baseCity);
        session.set('baseState', baseState);
        session.set('baseZipCode', baseZipCode);
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
