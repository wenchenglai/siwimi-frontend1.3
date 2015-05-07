import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        var self = this;

        /* initialize the external events
		-----------------------------------------------------------------*/
        self.$('#external-events div.external-event').each(function () {

            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: self.$.trim(self.$(this).text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            self.$(this).data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            self.$(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });


        /* initialize the calendar
		-----------------------------------------------------------------*/

        self.$('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function (date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = self.$(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = self.$.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                self.$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                // is the "remove after drop" checkbox checked?
                if (self.$('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    self.$(this).remove();
                }

            }
        });
    },
});
