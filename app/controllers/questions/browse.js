import Ember from 'ember';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(PagingMixin, {
    queryParams: ['status', 'pageNumber', 'pageSize'],
    status: "open"
});
