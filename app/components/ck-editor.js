import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function() {
        $( '#editor1' ).ckeditor();
    }
});
