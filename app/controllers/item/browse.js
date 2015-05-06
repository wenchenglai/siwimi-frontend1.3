import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ItemDataMixin from '../../mixins/item-data';

export default Ember.ArrayController.extend(CommonDataMixin, ItemDataMixin, {
    showAdvancedSearch: false,
    searchToggleText: "More Filters",
    pageSize: 5,

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
