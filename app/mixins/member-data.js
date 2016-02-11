import Ember from 'ember';

export default Ember.Mixin.create({
    allPrivileges: [
        { text: "Anonymous User", value: "0" },
        { text: "User", value: "1" },
        { text: "Super User", value: "2" },
        { text: "Content Editor", value: "3" },
        { text: "Admin", value: "256" }
    ],
});
