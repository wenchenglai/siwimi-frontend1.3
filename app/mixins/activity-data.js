import Ember from 'ember';

export default Ember.Mixin.create({
    allTypes: [
        { value: "all", text: "All"},
        { value: "animal", text: "Animal" },
        { value: "art", text: "Art" },
        { value: "concert", text: "Concerts" },
        { value: "farm", text: "Farm Activity" },
        { value: "festival", text: "Festival" },
        { value: "game", text: "Game" },
        { value: "movie", text: "Movies" }, 
        { value: "museum", text: "Museums" },
        { value: "parent", text: "Parents" },
        { value: "playdate", text: "Play Dates" },
        { value: "science", text: "Sci-Tech" },
        { value: "show", text: "Shows" }, 
        { value: "sport", text: "Sports"},
        { value: "storytelling", text: "Storytelling" },
        { value: "zoo", text: "Zoo" },
        { value: "misc", text: "Misc"}
    ],

    allStatus: [
        { text: "All", value: "all" },
        { text: "Current", value: "current" },
        { text: "Upcoming", value: "upcoming" },
        { text: "Past", value: "past" },
        { text: "Timeless", value: "timeless" }
    ],

    allAgeGroups: [
        { value: "all", text: "All"},
        { value: "infant", text: "Infant"},
        { value: "toddler", text: "Toddler" },
        { value: "pre-school", text: "Pre-school" },
        { value: "school-age", text: "School Age Kids" },
        { value: "pre-teen", text: "Pre-teen" }
    ],

    allPeriods: [
        { value: "1", text: 'today'},
        { value: "2", text: 'This coming weekend'},
        { value: "3", text: 'next 30 days'},
        { value: "4", text: 'next 6 months'},
        { value: "5", text: 'custom time range'}
    ],

    allTimes: [
        '12:00 am',
        '12:30 am', '1:00 am', '1:30 am', '2:00 am', '2:30 am', '3:00 am', '3:30 am', '4:00 am', '4:30 am', '5:00 am', '5:30 am', '6:00 am', '6:30 am',
        '7:00 am', '7:30 am', '8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm',
        '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm',
        '8:00 pm', '8:30 pm', '9:00 pm', '9:30 pm', '10:00 pm', '10:30 pm', '11:00 pm', '11:30 pm'
    ]
});
