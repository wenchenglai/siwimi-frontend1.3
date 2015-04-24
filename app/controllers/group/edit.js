import Ember from 'ember';

export default Ember.Controller.extend({
    members: function(requestObj, responseCB) {
        //var self = this,
        //    host = self.store.adapterFor('application').get('host');
        var host = "http://localhost:8080";
        $.ajax({
            url: host + "/membersjquery?queryText=" + requestObj.term,
            success: function( data ) {
                responseCB( data );
            }
        });

        //responseCB(
        //[{ label: "Ann Arbor, MI", value: "Ann Arbor, MI"},
        //    {label: "ARR, MI", value: "ARR, MI"},
        //    {label: "BB, MI", value: "BB, MI"},
        //    {label: "CC, MI", value: "CC, MI"},
        //    {label: "ARR1, MI", value: "ARR1, MI"},
        //    {label: "ARR2, MI", value: "ARR2, MI"},
        //    {label: "ARR3, MI", value: "ARR3, MI"},
        //]);
    }
});
