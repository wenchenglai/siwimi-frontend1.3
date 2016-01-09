import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, PagingMixin, {
    queryParams: ['type', 'status', 'ageGroup', 'isFree', 'pageNumber', 'pageSize'],
    type: "all",
    status: "all",
    ageGroup: "all",
    isFree: true,
    isTabletView: true,

    actions: {
        changeView: function() {
            this.toggleProperty("isTabletView");
        }
    }
});
