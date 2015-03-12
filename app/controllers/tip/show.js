import Ember from 'ember';
import TipDataMixin from '../../mixins/tip-data';

export default Ember.ObjectController.extend(TipDataMixin, {
    tipUrl:  'http://localhost:51878/tip/54ad8e642e85d38789e2c1c1',
    //avatar: function() {
        
    //}.property()
});
