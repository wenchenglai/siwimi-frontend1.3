import Ember from 'ember';
import dateHelpers from '../utils/date-helpers';

export default Ember.Handlebars.makeBoundHelper(function(date, format) {
    return dateHelpers.formatDate(date, format);
});
