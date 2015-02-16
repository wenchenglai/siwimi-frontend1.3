import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function () {
        var controller = this;

        this.$("#dialog-confirm-delete-member").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = $(this).data('id');
                    $(this).dialog("close");
                    controller.sendAction('apiDeleteMember', id);
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });

        this.$("#dialog-confirm-delete-family").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = $(this).data('id');
                    $(this).dialog("close");
                    Em.run(function(){
                        controller.sendAction('apiDeleteFamily', id);
                    });
                    
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    },
    actions: {
        editFamily: function (id) {
            this.sendAction('apiEditFamily', id);
        },
        deleteFamily: function (id) {
            $("#dialog-confirm-delete-family").data('id', id).dialog("open");
        },
        addMember: function (id) {
            this.sendAction('apiAddMember', id);
        },
        editMember: function (model) {
            this.sendAction('apiEditMember', model);
        },
        deleteMember: function (id) {
            $("#dialog-confirm-delete-member").data('id', id).dialog("open");
        }
    }
});
