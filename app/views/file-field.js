import Ember from 'ember';

// Get the source from http://stackoverflow.com/questions/13923122/ember-js-upload-file-component/13934706#13934706
export default Ember.TextField.extend({
    type: 'file',

    change: function(evt) {
        var input = evt.target;
        if (input.files && input.files[0]) {
            var that = this;

            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                that.set('parentView.content', data);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
});
