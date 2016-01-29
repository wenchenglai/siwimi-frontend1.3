import Ember from 'ember';
import ActivityDataMixin from '../../../mixins/activity-data';
import PagingMixin from '../../../mixins/paging';

export default Ember.Controller.extend(ActivityDataMixin, PagingMixin, {
    queryParams: ['type', 'status', 'action', 'creator', 'pageNumber', 'pageSize'],
    type: "all",
    status: "upcoming"
});
