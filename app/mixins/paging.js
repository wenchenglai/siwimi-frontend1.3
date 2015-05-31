import Ember from 'ember';

export default Ember.Mixin.create({
    allPageSizes: ['Show 10', 'Show 50'],
    pageNumber: 1,
    pageSize: 10,
    queryCount: 0, // total query count from this specific query
    pagesArray: [], // hold the pagination number sequence

    // we need to watch whenever the pagination array changes (either add/remove new pages, or change active state
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
                    this.set('pageNumber', 1);
                }
            } else {
                this.set('pageSize', 10);
            }
        }

        return "Show " + this.get('pageSize');
    }.property('pageSize'),

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
        for (let i of range ) {
            var obj = Ember.Object.create({text: i, className: self.get('pageNumber') === i ? "active": ""});
            pagesArray.pushObject(obj);
        }
    }.observes('queryCount', 'pageSize'),

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
                self._markPaginationActive(pageNumber);
            }
        },

        loadNextPage: function () {
            var self = this;

            self._markPaginationActive(self.incrementProperty('pageNumber'));
        },

        loadPrevPage: function () {
            var self = this;

            self._markPaginationActive(self.decrementProperty('pageNumber'));
        }
    }
});
