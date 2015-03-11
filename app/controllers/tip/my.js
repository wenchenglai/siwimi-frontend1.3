import Ember from 'ember';
import TipDataMixin from '../../mixins/tip-data';

export default Ember.ObjectController.extend(TipDataMixin, {
    //actions: {
    //    delete: function (id) {
    //        this.store.find('tip', id).then(function (record) {
    //            record.destroyRecord();
    //            //record.deleteRecord();
    //            //record.save();
    //        });
    //    }
    //}
});
