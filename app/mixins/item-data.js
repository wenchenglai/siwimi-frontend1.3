import Ember from 'ember';

export default Ember.Mixin.create({
    allStatus: [
        { value: "sale", text: "Sale" },
        { value: "swap", text: "Swap" },
        { value: "free", text: "Free"},
        { value: "loan", text: "Loan" }
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
