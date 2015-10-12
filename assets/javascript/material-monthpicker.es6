

class materialMonthpicker {
  
/*  this.defaults = {
    'orientation': 'landscape', // landscape, portait
    'primaryColor': 'rgba(0, 150, 136, 1)', //css color value
    'theme': 'light', // light, dark,
    'date': new Date(),
  };*/
  
  constructor (element, settings) {
    if (typeof element == 'string') {
      this.element = document.querySelector(`#${element}`);
    } else {
      this.element = element;
    }
    this.settings = settings || null;
    this.define();
  }
  
  define () {
    this.createElement();
    
    this.element.addEventListener('click', () => {
      this.open();
    });
  };

  createElement () {
    this.position = this.element.getBoundingClientRect();
    
    this.picker = document.createElement('div');
    this.picker.setAttribute('class', 'material-monthpicker material-picker');
    
    let containerInfo = document.createElement('div');
    containerInfo.setAttribute('class', 'material-picker-info');
    this.picker.appendChild(containerInfo);
    
    let containerPicker = document.createElement('div');
    containerPicker.setAttribute('class', 'material-picker-picker');
    this.picker.appendChild(containerPicker);
    
    let containerPickerYear = document.createElement('div');
    containerPickerYear.setAttribute('class', 'material-picker-year');
    containerPicker.appendChild(containerPickerYear);
  }

  open () {
    document.body.appendChild(this.picker);
    this.picker.style.top = this.position.top;
    this.picker.style.left = this.position.left;
  }
  
}