import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';

export default Ember.ObjectController.extend(CommonDataMixin, {
    distance: null,
    period: null,
    queryText: '',
    showResult: false,
    allPeriods: ['today','This coming weekend', 'next 30 days', 'next 6 months', 'custom time range']
});
