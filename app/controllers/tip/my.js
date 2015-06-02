import Ember from 'ember';
import TipDataMixin from '../../mixins/tip-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(TipDataMixin, PagingMixin, {
    queryParams: ['type', 'status', 'pageNumber', 'pageSize'],
    type: "all",
    status: "upcoming"
});
