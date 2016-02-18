import Ember from 'ember';
import ActivityDataMixin from '../../../mixins/activity-data';
import PagingMixin from '../../../mixins/paging';

export default Ember.Controller.extend(ActivityDataMixin, PagingMixin, {
    queryParams: ['period', 'type', 'distance', 'ageGroup', 'isFree', 'pageNumber', 'pageSize', 'queryText'],
    period: "all",
    type: "all",
    distance: "all",
    ageGroup: "all",
    isFree: false,
    queryText: ''
});
