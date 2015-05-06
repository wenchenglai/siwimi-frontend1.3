import Ember from 'ember';
import TipDataMixin from '../../mixins/tip-data';

export default Ember.Controller.extend(TipDataMixin, {
    pageSize: 5
});
