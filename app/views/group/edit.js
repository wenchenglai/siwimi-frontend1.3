import Ember from 'ember';

export default Ember.View.extend({
    text: '',
    didInsertElement: function () {
        var self = this,
            host = self.get('controller').store.adapterFor('application').get('host'),
            controller = self.get('controller');

        $("#myTags").tagit({
            //availableTags: controller.get('friendList'),
            placeholderText: "Type your friends names here",
            beforeTagAdded: function(event, ui) {
                // do something special
                console.log("Inside beforeTagAdded: ui.tag = " + ui.tag);
            }
            ,afterTagAdded: function(event, ui) {
                // do something special
                console.log("Inside beforeTagAdded: ui.tag = " + ui.tag);
            }
            ,autocomplete: {delay: 0, minLength: 1
                //source: function(requestObj, responseCB) {
            //    //var self = this,
            //    //    host = self.store.adapterFor('application').get('host');
            //    var host = "http://localhost:8080";
            //    $.ajax({
            //        url: host + "/membersjquery?queryText=" + requestObj.term,
            //        success: function( data ) {
            //            responseCB( data );
            //        }
            //    });
            //}
                // using search instead of autocomplete.source will have automatic filtering on selected tags and
                // availableTags
                ,search: function(event, ui) {
                    $.ajax({
                        url: host + "/membersajax?queryText=" + this.value,
                        success: function( data ) {
                            Ember.run(function () {
                                $('#myTags').tagit({availableTags: data});
                            });
                        }
                    });
                }


            //    , select: function( event, ui ) {
            ////    //var terms = this.value.split( /,\s*/ );
            ////    //// remove the current input
            ////    //terms.pop();
            ////    //// add the selected item
            ////    //terms.push( ui.item.label );
            ////    //// add placeholder to get the comma-and-space at the end
            ////    ////terms.push( "" );
            ////    //this.value = terms.join( " " );
            ////    console.log("Inside autocomplete:select: this.value = " + this.value + ", ui.item.label = " + ui.item.label);
            ////    //return true;
            //}
            }
            ,preprocessTag: function(val) {
                console.log("Inside PreprocessTag: val = " + val);
                return val;
            }
        });
    }
});
