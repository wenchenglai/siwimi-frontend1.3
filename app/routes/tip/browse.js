import Ember from 'ember';

export default Ember.Route.extend({
    currentStatus: 'all',
    currentType: 'all',
    pageNumber: 1,

    model: function () {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id'),
            pageSize = 10;

        if (self.get('controller.pageSize')) {
            pageSize = self.get('controller.pageSize');
        }

        return this.store.find('tip', {
            requester: userId,
            status: self.get('currentStatus'),
            type: self.get('currentType'),
            longitude: session.get('longitude'),
            latitude: session.get('latitude'),
            per_page: pageSize,
            page: self.get('pageNumber')
        });
    },

    setupController: function(controller, model) {
        // we get the total item count so we can generate the right pagination.
        controller.set('model', model);
        if (model.get('length') > 0) {
          var totalRecordCount = model.get('content')[0].get('queryCount');
          controller.set('queryCount', totalRecordCount);
        }
    },

    reload: function() {
        var self = this;
        self.model().then(function(records) {
          var recordArray = records.get('content'),
            totalRecordCount = 0;

          if (recordArray.get('length') > 0) {
              totalRecordCount = recordArray[0].get('queryCount');

            Ember.$('.pagination li').each(function(key, value){
              Ember.$(this).removeClass('active');
            });
            Ember.$('.pagination li:nth-child(' + (self.get('pageNumber') + 1) + ')').addClass("active");
          }

          self.controller.set('queryCount', totalRecordCount);

          self.controller.set('content', records);
        });
    },

    actions: {
        loadData: function () {
            this.model();
        },

        loadByStatus: function(status) {
            var self = this;

            self.set('currentStatus', status);
            self.reload();
        },

        loadByType: function(type) {
            var self = this;

            self.set('currentType', type);
            self.reload();
        },

        loadPage: function (pageNumber) {
            var self = this;

            if (pageNumber !== self.get('pageNumber')) {
              self.set('pageNumber', pageNumber);
              self.reload();
            }
        },

        loadPageOnPageSizeChange: function (newSize) {
            var self = this;

            if (newSize) {
              self.get('controller').set('pageSize', newSize);
            }
            self.reload();
        }

        //loadNextPage: function () {
        //    var self = this;
        //
        //    self.incrementProperty('pageNumber');
        //    self.model().then(function(records) {
        //        //var data = self.controller.get('content');
        //        //data.addObject(records);
        //        self.controller.set('content', records);
        //    });
        //},
        //
        //loadPrevPage: function () {
        //    var self = this;
        //
        //    self.decrementProperty('pageNumber');
        //    self.model().then(function(records) {
        //        //var data = self.controller.get('content');
        //        //data.addObject(records);
        //        self.controller.set('content', records);
        //    });
        //}
    }
});
