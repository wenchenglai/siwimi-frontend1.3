import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';

export default Ember.ObjectController.extend(CommonDataMixin, ActivityDataMixin, {
    distance: null,
    period: null,
    queryText: '',
    fromTime: null,
    toTime: null,
    showResult: false,
    showFromToControls: false,

    onSelectedPackChange:function(){
        var self = this,
            period = self.get('period');

        if (period === "5") {
            self.set('showFromToControls', true);
        } else {
            self.set('showFromToControls', false);
        }
    }.observes('period')

    //action: {
    //    periodChange: function() {
    //        var self = this,
    //            period = self.get('period');

    //        if (period === 5) {
    //            self.set('showFromToControls', true);
    //        }
    //    }
    //}
});
