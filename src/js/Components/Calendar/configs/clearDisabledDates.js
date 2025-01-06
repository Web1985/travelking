export function clearDisabledDates(instance){
    const calendar_container = instance.calendarContainer;

    instance.config.onChange.push(function() {
        const selected = calendar_container.querySelectorAll('.inRange');
        selected.forEach(child => {
            if(child.classList.contains('flatpickr-disabled')){
                instance.clear();
            }
          });
      } );
}