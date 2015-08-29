import Ember from 'ember';

export default Ember.Mixin.create({
    allPageSizes: ['Show 10', 'Show 50'],
    pageNumber: 1,
    pageSize: 10,
    queryCount: 0, // total query count from this specific query
    pagesArray: [{text: '1', className: ''}], // hold the pagination number sequence
    keepPageNumber: false, // due to a condition when user was in high page number, but change other filters (e.g. type or status) that leaves empty model

    // we need to watch whenever the pagination array changes (either add/remove new pages, or change active state
    pages: function() {
        return this.get('pagesArray');
    }.property('pagesArray.@each.className'),

    decoratedPageSize: Ember.computed("pageSize", {
        get: function() {
            return "Show " + this.get('pageSize');
        },

        set: function(key, value, previousValue) {
            if (value) {
                if (value !== previousValue) {
                    this.set('pageSize', value.substring(5, 7));
                    this.set('pageNumber', 1);
                }
            } else {
                this.set('pageSize', 10);
            }
            return value;
        }
    }),

    isLeftArrowDisabled: function() {
        // when there is only one page, we disable the left and right button
        var self = this;

        if (self.get('queryCount') / self.get('pageSize') <= 1) {
            return "disabled";
        } else if (self.get('pageNumber') === 1) {
            return "disabled";
        } else {
            return "";
        }
    }.property('queryCount', 'pageSize', 'pageNumber'),

    isRightArrowDisabled: function() {
        // when there is only one page, we disable the left and right button
        var self = this;

        if (self.get('queryCount') / self.get('pageSize') <= 1) {
            return "disabled";
        } else if (self.get('pageNumber') === self.get('pages').length) {
            return "disabled";
        } else {
            return "";
        }
    }.property('queryCount', 'pageSize', 'pageNumber'),

    // returns the paginatio array 1,2,3... depends total items and page size
    _createPages: function() {
        var self = this,
            size = self.get('queryCount') / self.get('pageSize') + 1,
            range = window._.range(1, size),
            pagesArray = self.get('pagesArray');

        // we must use Ember's built-in enumerable object's pushObject or clear so the computed properties could fire
        pagesArray.clear();
        var i = 1;
        for (i = 1; i <= range.length; i++) {
            var obj = Ember.Object.create({text: i, className: self.get('pageNumber') === i ? "active": ""});
            pagesArray.pushObject(obj);
        }

        // Some older browser (safari) on tablet cannot understand the new syntax
        //for (let i of range ) {
        //    var obj = Ember.Object.create({text: i, className: self.get('pageNumber') === i ? "active": ""});
        //    pagesArray.pushObject(obj);
        //}
    }.observes('queryCount', 'pageSize'),

    // hightlight the selected page number
    _markPaginationActive: function(pageNumber) {
        var self = this,
            array = self.get('pagesArray');

        array.forEach(function(item, index, enumerable) {
            if (item.text === pageNumber) {
                item.set("className", "active");
            } else {
                item.set("className", "");
            }
        });
    },

    actions: {
        loadByPageNumber: function (pageNumber) {
            var self = this;

            if (pageNumber !== self.get('pageNumber')) {
                self.set('pageNumber', pageNumber);
                self.set('keepPageNumber', true);
                self._markPaginationActive(pageNumber);
            }
        },

        loadNextPage: function () {
            var self = this;

            self.set('keepPageNumber', true);
            self._markPaginationActive(self.incrementProperty('pageNumber'));
        },

        loadPrevPage: function () {
            var self = this;

            self.set('keepPageNumber', true);
            self._markPaginationActive(self.decrementProperty('pageNumber'));
        }
    }
});
