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

    allTypesSimple: ["all",
        "animal",
        "art",
        "concert",
        "farm",
        "festival",
        "game",
        "movie",
        "museum",
        "parent",
        "playdate",
        "science",
        "show",
        "sport",
        "storytelling",
        "zoo",
        "misc"
    ],

    allStatus: [
        { text: "All", value: "all" },
        { text: "Current", value: "current" },
        { text: "Upcoming", value: "upcoming" },
        { text: "Past", value: "past" },
        { text: "Timeless", value: "timeless" }
    ],

    allDistances: [
        { value: "all", text: 'All'},
        { value: "10", text: '10 miles'},
        { value: "20", text: '20 miles'},
        { value: "30", text: '30 miles'},
        { value: "50", text: '50 miles'},
        { value: "100", text: '100 miles'}
    ],

    allAgeGroups: [
        { value: "all", text: "All"},
        { value: "infant", text: "Infant"},
        { value: "toddler", text: "Toddler" },
        { value: "pre-school", text: "Pre-school" },
        { value: "school-age", text: "School Age Kids" },
        { value: "pre-teen", text: "Pre-teen" }
    ],

    allLifeStages: [
        { value: "all", text: 'All'},
        { value: "Submitted", text: 'Submitted'},
        { value: "Approved", text: 'Approved'},
        { value: "Rejected", text: 'Rejected'}
    ],

    allPeriods: [
        { value: "all", text: 'All'},
        { value: "weekend", text: 'This weekend'},
        { value: "3days", text: 'Next 3 days'},
        { value: "week", text: 'Next week'},
        { value: "timeless", text: 'Seasonal'},
        { value: "past", text: 'Past'}
    ],

    allTimes: [
        '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM',
        '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM',
        '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
        '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
    ]
});
