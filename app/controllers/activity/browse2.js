import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import PagingMixin from '../../mixins/paging';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, PagingMixin, {
    queryParams: ['type', 'status', 'pageNumber', 'pageSize'],
    type: "all",
    status: "all",
    selecatedAge: 'toddler',
    isFree: true,
    categories: ['all', 'birthday', 'concert', 'farm', 'storytelling', 'movie', 'museum', 'playdate', 'festival', 'show', 'sport', 'misc'],
    statuses: ['all', 'current', 'upcoming', 'past', 'timeless'],
    ages: ['infant', 'toddler', 'pre-school', 'school Aged Kids', 'pre-teen'],
    actions: {
        selectCategory: function(category) {

        }
    }
});
