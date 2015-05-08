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
        { value: "sport", text: "Sports"},
        { value: "misc", text: "Misc"}
    ],

    allStatus: [
        { text: "Current", value: "current" },
        { text: "Upcoming", value: "upcoming" },
        { text: "Past", value: "past" },
        { text: "Timeless", value: "timeless" }
    ],

    allPeriods: [
        { value: "1", text: 'today'},
        { value: "2", text: 'This coming weekend'},
        { value: "3", text: 'next 30 days'},
        { value: "4", text: 'next 6 months'},
        { value: "5", text: 'custom time range'}
    ],

    allTimes: [
        '12:00am',
        '12:30am', '1:00am', '1:30am', '2:00am', '2:30am', '3:00am', '3:30am', '4:00am', '4:30am', '5:00am', '5:30am', '6:00am', '6:30am',
        '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm',
        '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm',
        '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm'
    ]
});
