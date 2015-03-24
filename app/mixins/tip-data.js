import Ember from 'ember';

export default Ember.Mixin.create({
    allTypes: [
        { value: "deal", text: "Deals"},
        { value: "cooking", text: "Cooking" },
        { value: "health", text: "Health" }, 
        { value: "education", text: "Education" }, 
        { value: "entertainment", text: "Entertainment" },
        { value: "travel", text: "Travel" }
    ]
});
