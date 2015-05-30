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
    pagesArray: [Ember.Object.create({text: 1, className: "active"})],

    pages: function() {
        return this.get('pagesArray');
    }.property('pagesArray.@each.className'),

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
    createPages: function() {
        var self = this,
            size = self.get('queryCount') / self.get('pageSize') + 1,
            range = window._.range(1, size),
            pagesArray = self.get('pagesArray');

        pagesArray.length = 0;
        for (let i of range ) {
            var obj = Ember.Object.create({text: i, className: self.get('pageNumber') === i ? "active": ""});
            pagesArray.pushObject(obj);
        }
    }.observes('queryCount', 'pageSize')
});
