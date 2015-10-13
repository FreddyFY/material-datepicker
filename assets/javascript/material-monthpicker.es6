class MaterialMonthpicker {
  constructor (element, settings) {
    const defaults = {
      orientation: 'landscape', // landscape, portait
      primaryColor: 'rgba(0, 150, 136, 1)', //css color value
      theme: 'light', // light, dark
      date: new Date(),
      lang: 'en', // en, de, it, ..
      pickerFormat: 'mmm', // mmm, mmmm
      buttons: true, // boolean
    };
    this.settings = Object.assign(defaults, settings);
    this.date = this.settings.date;
    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `../src/translations/${this.settings.lang}.json`, true);
    var i18nn;
    xmlhttp.addEventListener("readystatechange", () => {
      if (xmlhttp.readyState == 4) {
        this.i18n = JSON.parse(xmlhttp.responseText);
        loaded();
      }
    });
    xmlhttp.send();
    
    let loaded = () => {
      if (typeof element == 'string') {
        this.element = document.querySelector(`#${element}`);
      } else {
        this.element = element;
      }
      this.define();
    }
  }
  
  
  define() {
    this.createElement();
    
    this.element.addEventListener('click', () => {
      this.open();
    });
  }

  createElement() {
    this.position = this.element.getBoundingClientRect();
        
    this.picker = document.createElement('div');
    this.picker.setAttribute('class', 'mp-monthpicker mp-picker');
    this.picker.setAttribute('data-theme', this.settings.theme);
    
    let containerInfo = document.createElement('div');
    containerInfo.setAttribute('class', 'mp-picker-info');
    this.picker.appendChild(containerInfo);
    
    let containerPicker = document.createElement('div');
    containerPicker.setAttribute('class', 'mp-picker-picker');
    this.picker.appendChild(containerPicker);
    
    //Info
    const containerInfoYear = document.createElement('span');
    containerInfoYear.setAttribute('class', 'mp-info-year mp-info-first');
    containerInfo.appendChild(containerInfoYear);
    
    const containerInfoMonth = document.createElement('span');
    containerInfoMonth.setAttribute('class', 'mp-info-month mp-info-second');
    containerInfo.appendChild(containerInfoMonth);
    
    //picker
    const containerPickerYear = document.createElement('div');
    containerPickerYear.setAttribute('class', 'mp-picker-year');
    containerPicker.appendChild(containerPickerYear);
    
    const containerPickerYearBefore = document.createElement('a');
    containerPickerYearBefore.setAttribute('class', 'mp-picker-year-before mp-picker-year-button');
    containerPickerYear.appendChild(containerPickerYearBefore);
    containerPickerYearBefore.addEventListener('click', () => {
      this.yearChange(-1)
    })
    
    const containerPickerYearThis = document.createElement('span');
    containerPickerYearThis.setAttribute('class', 'mp-picker-year-this mp-animate');
    containerPickerYear.appendChild(containerPickerYearThis);
    
    const containerPickerYearNext = document.createElement('a');
    containerPickerYearNext.setAttribute('class', 'mp-picker-year-next mp-picker-year-button');
    containerPickerYear.appendChild(containerPickerYearNext);    
    containerPickerYearNext.addEventListener('click', () => {
      this.yearChange(+1)
    })
    
    const containerPickerChoose = document.createElement('div');
    containerPickerChoose.setAttribute('class', 'mp-picker-choose mp-animate');
    containerPicker.appendChild(containerPickerChoose);
    
    for (let i = 0; i < 12; i++) {
      const containerPickerChooseMonth = document.createElement('a');
      containerPickerChooseMonth.setAttribute('class', `mp-picker-choose-month-${i}`);
      containerPickerChooseMonth.innerHTML = this.i18n[this.settings.pickerFormat][i];
      containerPickerChoose.appendChild(containerPickerChooseMonth);
      
      containerPickerChooseMonth.addEventListener('click', () => {
        let month = i;
        let nextDate = this.date
        nextDate.setMonth(month);
        this.newDate(nextDate);
      })
    }
  }
  
  yearChange(direction) {
    let directions = {'-1': 'left', '1': 'right'};
    let directionsNot = {'-1': 'right', '1': 'left'};
    this.date.setYear(this.date.getYear() + 1900 + direction);
    
    this.picker.querySelectorAll(`.mp-animate`)[0].classList.add(`mp-animate-${directions[direction]}`);
    this.picker.querySelectorAll(`.mp-animate`)[1].classList.add(`mp-animate-${directions[direction]}`);
    
    setTimeout( () => {
      this.picker.querySelectorAll(`.mp-animate`)[0].classList.remove(`mp-animate-${directions[direction]}`);
      this.picker.querySelectorAll(`.mp-animate`)[0].classList.add(`mp-animate-${directionsNot[direction]}`);
      this.picker.querySelectorAll(`.mp-animate`)[1].classList.remove(`mp-animate-${directions[direction]}`);
      this.picker.querySelectorAll(`.mp-animate`)[1].classList.add(`mp-animate-${directionsNot[direction]}`);
      
      setTimeout( () => {
        this.picker.querySelectorAll(`.mp-animate`)[0].classList.remove(`mp-animate-${directionsNot[direction]}`);
        this.picker.querySelectorAll(`.mp-animate`)[1].classList.remove(`mp-animate-${directionsNot[direction]}`);

        this.newDate(this.date);
      }, 200);
      
    }, 200);
    
    
  }

  open() {
    document.body.appendChild(this.picker);
    this.picker.style.top = this.position.top;
    this.picker.style.left = this.position.left;
    
    this.newDate();
  }
  
  close() {
    this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
  }
  
  newDate(date) {
    let dates = date || this.settings.date;
        
    this.picker.querySelector('.mp-info-year').innerHTML = dates.getYear() + 1900;
    this.picker.querySelector('.mp-info-month').innerHTML = this.i18n.mmm[dates.getMonth()];
    this.picker.querySelector('.mp-picker-year-this').innerHTML = dates.getYear() + 1900;
    if (this.picker.querySelector(`[class*="mp-picker-choose-month"].active`) != null) {
      this.picker.querySelector(`[class*="mp-picker-choose-month"].active`).classList.remove('active');
    }
    this.picker.querySelector(`.mp-picker-choose-month-${dates.getMonth() * 1}`).classList.add('active');
    if (new Date().getYear() == dates.getYear()) {
      this.picker.querySelector(`.mp-picker-choose-month-${new Date().getMonth() * 1}`).classList.add('today');
    } else if (this.picker.querySelector(`.mp-picker-choose-month-${new Date().getMonth() * 1}.today`) != null) {
      this.picker.querySelector(`.mp-picker-choose-month-${new Date().getMonth() * 1}.today`).classList.remove('today');    
    }
    
    this.date = dates;    
  }
}
