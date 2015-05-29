import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, PagingMixin, {
    queryParams: ['type', 'status', 'pageNumber', 'pageSize'],
    type: "all",
    status: "upcoming",
    pageNumber: 1,
    pageSize: 10,
    queryCount: 0,

    decoratedPageSize: function(key, value, previousValue) {
        // our show page size drop down shows "show 10" instead of "10"
        // therefore we need the extra logic here to strip down "show 10" to "10"
        if (arguments.length > 1) {
            if (value) {
                if (value !== previousValue) {
                    this.set('pageSize', value.substring(5, 7));
                }
            } else {
                this.set('pageSize', 10);
            }
        }

        return "Show " + this.get('pageSize');
    }.property('pageSize'),

    isDisabled: function() {
        // when there is only one page, we disable the left and right button
        var self = this;

        if (self.get('queryCount') / self.get('pageSize') <= 1) {
            return "disabled";
        } else {
            return "";
        }
    }.property('queryCount', 'pageSize'),

    //watchPageSize: function() {
    //    this.send('loadPageOnPageSizeChange');
    //}.observes('pageSize'),
    //
    //watchStatus: function() {
    //    this.send('loadByStatus', this.get('status'));
    //}.observes('status'),
    //
    //watchType: function() {
    //    this.send('loadByType', this.get('type'));
    //}.observes('type'),

    // returns the paginatio array 1,2,3... depends total items and page size
    pages: function() {
        var size = this.get('queryCount') / this.get('pageSize') + 1;
        return window._.range(1, size);
    }.property('queryCount', 'pageSize')
});
