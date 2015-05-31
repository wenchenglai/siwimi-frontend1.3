import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ItemDataMixin from '../../mixins/item-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ItemDataMixin, PagingMixin, {
    queryParams: ['type', 'status', 'pageNumber', 'pageSize', 'condition'],
    type: "all",
    status: "all",
    condition: "all",
    showAdvancedSearch: false,
    searchToggleText: "More Filters",

    actions: {
        toggleAdvancedSearch: function() {
            if (this.get('showAdvancedSearch')) {
                this.set('showAdvancedSearch', false);
                this.set('searchToggleText', 'More Filters');
            } else {
                this.set('showAdvancedSearch', true);
                this.set('searchToggleText', 'Hide Fitlers');
            }
        }
    }
});
