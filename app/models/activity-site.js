import DS from 'ember-data';

export default DS.Model.extend({
    siteName: DS.attr('string'),
    url: DS.attr('string'),
    className: DS.attr('string'),
    isActive: DS.attr('boolean'),
    isDeletedRecord: DS.attr('boolean')
});
