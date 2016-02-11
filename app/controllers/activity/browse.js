import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, PagingMixin, {
    queryParams: ['period', 'type', 'status', 'distance', 'ageGroup', 'isFree', 'pageNumber', 'pageSize'],
    period: "all",
    type: "all",
    status: "all",
    distance: "all",
    ageGroup: "all",
    isFree: false,
    queryText: '',
    isTabletView: false,

    actions: {
        changeView: function() {
            this.toggleProperty("isTabletView");
        }
    }
});
