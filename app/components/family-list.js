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
                    controller.sendAction('deletemember', id);
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
                    controller.sendAction('deletefamily', id);
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });
    },
    actions: {
        editfamily: function (modalName, id) {
            this.sendAction('editfamily', modalName, id);
        },
        deletefamily: function (id) {
            $("#dialog-confirm-delete-family").data('id', id).dialog("open");
        },
        addmember: function (modalName, id) {
            this.sendAction('addmember', modalName, id);
        },
        editmember: function (modalName, model) {
            this.sendAction('editmember', modalName, model);
        },
        deletemember: function (id) {
            $("#dialog-confirm-delete-member").data('id', id).dialog("open");
        }
    }
});
