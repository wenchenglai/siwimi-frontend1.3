import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.findRecord('item', params.id);
    },

    afterModel: function(model, transition) {
        $(document).attr('title', "Siwimi - Items - " + model.get('title'));
        $("meta[property='og\\:title']").attr("content", model.get('title'));
        Ember.run.schedule('afterRender', () => {
            console.log( this.get('router.url'))
            $("meta[property='og\\:url']").attr("content", window.location.href);
        });
        //$("meta[property='og\\:image']").attr("content", model.activity.get('imageData'));
    },

    actions: {
        goBack: function() {
            history.back();
        },

        deleteByAdmin: function(id) {
            var self = this;

            self.store.findRecord('item', id).then(function (record) {
                record.destroyRecord();
                self.transitionTo('item.browse');
            });
        }
    }
});
