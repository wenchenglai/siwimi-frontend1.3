import Ember from 'ember';
import ItemDataMixin from '../../mixins/item-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(ItemDataMixin, PagingMixin, {
   queryParams: ['type', 'status', 'condition', 'pageNumber', 'pageSize'],
    type: "all",
    status: "all",
    condition: "all"
});
