import Ember from 'ember';

export default Ember.Mixin.create({
    allStatus: [
        { value: "active", text: "New"},
        { value: "sold", text: "Sold" },
        { value: "swapped", text: "Swapped" },
        { value: "gaveaway", text: "Gave Away"},
        { value: "loaned", text: "Loaned" },
        { value: "inactive", text: "Inactive" }
    ],

    allTypes: [
        { value: "toy", text: "Toy"},
        { value: "cloth", text: "Cloth" },
        { value: "book", text: "Book" }, 
        { value: "equipment", text: "Equipment" }, 
        { value: "furniture", text: "Furniture" }
    ],

    allConditions: [
        { value: "new", text: "New"},
        { value: "lightlyused", text: "Lightly Used" },
        { value: "heavilyused", text: "Heavily Used" }
    ]
});
