import Ember from 'ember';

export default Ember.TextField.extend({
   type: 'file',

    resizeBase64Img: function(base64, width, height) {
        var self = this,
            canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        var deferred = Ember.$.Deferred();
        //$("<img/>").attr("src", "data:image/gif;base64," + base64).load(function() {
        self.$("<img/>").attr("src", base64).load(function() {
            context.scale(width/this.width,  height/this.height);
            context.drawImage(this, 0, 0);
            deferred.resolve(self.$("<img/>").attr("src", canvas.toDataURL()));
        });
        return deferred.promise();
    },

    change: function(evt) {
        var input = evt.target;
        if (input.files && input.files[0]) {
            var self = this;

            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                var origImage = new Image();
                origImage.src = data;
                origImage.onload = function() {
                    var origWidth = this.width,
                        origHeight = this.height,
                        ratio = origHeight / origWidth,
                        newWidth = 300,
                        newHeight = newWidth * ratio;

                    self.resizeBase64Img(data, newWidth, newHeight).then(function(newImg){
                        //$("body").append(newImg);
                        self.set('parentView.content', newImg.attr('src'));
                    });
                };

                origImage.onerror = function() {
                    console.log('invalid file type:' + data.type);
                };
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
});
