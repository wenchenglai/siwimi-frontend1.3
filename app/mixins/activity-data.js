import Ember from 'ember';

export default Ember.Mixin.create({
    allTypes: [
        { value: "birthday", text: "Birthdays"},
        { value: "concert", text: "Concerts" },
        { value: "farm", text: "Farm Activity" }, 
        { value: "storytelling", text: "Storytelling" }, 
        { value: "movie", text: "Movies" }, 
        { value: "museum", text: "Museums" }, 
        { value: "playdate", text: "Play Dates" }, 
        { value: "festival", text: "Festival" }, 
        { value: "show", text: "Shows" }, 
        { value: "sport", text: "Sports"}
    ],

    allStatus: [
        { text: "Current", value: "current" },
        { text: "Upcoming", value: "upcoming" },
        { text: "Past", value: "past" }
    ],

    allPeriods: [
        { value: "1", text: 'today'},
        { value: "2", text: 'This coming weekend'},
        { value: "3", text: 'next 30 days'},
        { value: "4", text: 'next 6 months'},
        { value: "5", text: 'custom time range'}
    ]
});
