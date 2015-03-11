import Ember from 'ember';

export default Ember.Mixin.create({
    allTypes: [
        { text: "Birthdays", value: "birthday" },
        { text: "Concerts", value: "concert" },
        { text: "Farm Activity", value: "farm" }, 
        { text: "Library & Book Reading", value: "book" }, 
        { text: "Misc", value: "misc" }, 
        { text: "Movies", value: "movie" }, 
        { text: "Museums", value: "museum" }, 
        { text: "Play Dates", value: "playdate" }, 
        { text: "Festival", value: "festival" }, 
        { text: "Shows", value: "show" }, 
        { text: "Sports", value: "sport" }
    ],

    allTypesHash: {
        "birthday": "",
        "concert": "Concerts",
        "farm": "Farm Activity", 
        "book": "Library & Book Reading", 
        "misc": "Misc", 
        "movie": "Movies", 
        "museum": "Museums", 
        "playdate": "Play Dates", 
        "festival": "Festival", 
        "show": "Shows", 
        "sport": "Sports"
    },

    allStatus: [
        { text: "Current", value: "current" },
        { text: "Upcoming", value: "upcoming" },
        { text: "Past", value: "past" }
    ]
});
