import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function () {
        var self = this;

        self.$("#dialog-confirm-delete-member").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            appendTo: '#' + self.get('elementId'),
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = self.$(this).data('id');
                    self.$(this).dialog("close");
                    self.sendAction('apiDeleteMember', id);
                },
                Cancel: function () {
                    self.$(this).dialog("close");
                }
            }
        });

        this.$("#dialog-confirm-delete-family").dialog({
            autoOpen: false,
            resizable: false,
            height: 240,
            appendTo: '#' + self.get('elementId'),
            modal: true,
            buttons: {
                "Delete": function () {
                    var id = self.$(this).data('id');
                    self.$(this).dialog("close");
                    Ember.run(function(){
                        self.sendAction('apiDeleteFamily', id);
                    });
                },
                Cancel: function () {
                    self.$(this).dialog("close");
                }
            }
        });
    },
    actions: {
        editFamily: function (id) {
            this.sendAction('apiEditFamily', id);
        },
        deleteFamily: function (id) {
            this.$("#dialog-confirm-delete-family").data('id', id).dialog("open");
        },
        addMember: function (id) {
            this.sendAction('apiAddMember', id);
        },
        editMember: function (model) {
            this.sendAction('apiEditMember', model);
        },
        deleteMember: function (id) {
            this.$("#dialog-confirm-delete-member").data('id', id).dialog("open");
        }
    }
});
