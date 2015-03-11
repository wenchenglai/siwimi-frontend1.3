import Ember from 'ember';

export default Ember.Mixin.create({
    allTypes: [
        { value: "birthday", text: "Birthdays"},
        { value: "concert", text: "Concerts" },
        { value: "farm", text: "Farm Activity" }, 
        { value: "book", text: "Library & Book Reading" }, 
        { value: "movie", text: "Movies" }, 
        { value: "museum", text: "Museums" }, 
        { value: "playdate", text: "Play Dates" }, 
        { value: "festival", text: "Festival" }, 
        { value: "show", text: "Shows" }, 
        { value: "sport", text: "Sports"}
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
