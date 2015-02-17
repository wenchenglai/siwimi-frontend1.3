import Ember from 'ember';

export default Ember.Mixin.create({
    _setLongitudeAndLatitudeInSession: function (session, member) {
        var family = member.get('family'),
            longitude = 0.0,
            latitude = 0.0;

        if (family) {
            if (family.get('location')) {
                longitude = family.get('location')[0];
                latitude = family.get('location')[1];
            }
        } else if (member.get('location')) {
            longitude = member.get('location')[0];
            latitude = member.get('location')[1];
        }

        if (longitude === 0.0) {
            longitude = geoplugin_longitude();
        }

        if (latitude === 0.0) {
            latitude = geoplugin_latitude();
        }

        session.set('longitude', longitude);
        session.set('latitude', latitude);
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
