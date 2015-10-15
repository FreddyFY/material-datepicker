class MaterialMonthpicker {

  constructor (element, settings) {
    const defaults = {
      orientation: 'landscape', // landscape, portait
      primaryColor: 'rgba(0, 150, 136, 1)', //css color value
      theme: 'light', // light, dark
      date: new Date(),
      pickerFormat: "mmm",
      outputFormat: "{mm}/{yyyy}",
      lang: 'en', // en, de, it, ..
      buttons: true // boolean
    };

    this.settings = Object.assign(defaults, settings);
    this.date = this.settings.date;

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://rawgit.com/FreddyFY/material-datepicker/master/src/translations/${this.settings.lang}.json`, true);
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
        this.element = document.querySelector(`${element}`);
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
    this.picker.setAttribute('data-orientation', this.settings.orientation);
    this.picker.style.top = this.position.top + this.position.height + 10 + 'px';
    this.picker.style.left = this.position.left + 'px';

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
        this.newDate(nextDate, 'month');
      })
    }

    //styles
    const newStyle = `
      .mp-picker.mp-monthpicker:not([data-theme="dark"]) .mp-picker-info {
        background-color: ${this.settings.primaryColor};
      }

      .mp-picker.mp-monthpicker .mp-picker-choose [class*="mp-picker-choose-month"].active,
      .mp-picker.mp-monthpicker[data-theme="dark"] .mp-picker-choose [class*="mp-picker-choose-month"].active {
        background-color: ${this.settings.primaryColor};
      }

      .mp-picker.mp-monthpicker .mp-picker-choose [class*="mp-picker-choose-month"].today:not(.active),
      .mp-picker.mp-monthpicker[data-theme="dark"] .mp-picker-choose .mp-picker-choose [class*="mp-picker-choose-month"].today:not(.active) {
        color: ${this.settings.primaryColor};
      }
    `;

    const containerStyle = document.createElement('style');
    containerStyle.type = 'text/css';
    containerStyle.appendChild(document.createTextNode(newStyle));
    document.querySelector('head').appendChild(containerStyle);
//    console.log(document.querySelector('head'));

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
    let top = this.position.top + this.position.height + 5;
    let left = this.position.left;
    let body = document.body.getBoundingClientRect();
    let picker = this.picker.getBoundingClientRect();
    
    if (left + picker.width + 50 > body.width) {
      left = left - picker.width - 5;
    }
    
    if (top + picker.height + 20 > body.height) {
      top = top - picker.height - this.position.height - 5;
    }
    
    this.picker.style.top = top;
    this.picker.style.left = left;

    this.newDate(null);
  }

  close() {
    this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
  }

  newDate(date, value) {
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

    //write into input field
    if (this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text') {
      let monthNumber = dates.getMonth() + 1;
      let yearNumber = dates.getYear() + 1900;
      let dateNumber = dates.getDate();
      let dayNumber = dates.getDay();
      let output = this.settings.outputFormat;

      output = output.replace(/\{dddd\}/g, this.i18n.dddd[dayNumber]);
      output = output.replace(/\{ddd\}/g, this.i18n.ddd[dayNumber]);
      output = output.replace(/\{dd\}/g, ("0" + dateNumber).slice(-2));
      output = output.replace(/\{d\}/g, dateNumber);

      output = output.replace(/\{mmmm\}/g, this.i18n.mmmm[monthNumber]);
      output = output.replace(/\{mmm\}/g, this.i18n.mmm[monthNumber]);
      output = output.replace(/\{mm\}/g, ("0" + monthNumber).slice(-2));
      output = output.replace(/\{m\}/g, monthNumber);      

      output = output.replace(/\{yyyy\}/g, ("0" + yearNumber).slice(-4));
      output = output.replace(/\{yy\}/g, ("0" + yearNumber).slice(-2));
      this.element.value = output;
    }

    if (value == 'month') {
      this.close();
    }
  }
}
