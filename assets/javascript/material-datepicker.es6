let dateToString = (string, _date, i18n) => {
  let timeNumber = _date.getTime();
  let monthNumber = _date.getMonth() + 1;
  let yearNumber = _date.getYear() + 1900;
  let dayNumber = _date.getDay();
  let dateNumber = _date.getDate();

  string = string.replace(/\{timestamp\}/g, timeNumber);

  string = string.replace(/\{DDDD\}/g, i18n.DDDD[dayNumber]);
  string = string.replace(/\{DDD\}/g, i18n.DDD[dayNumber]);
  string = string.replace(/\{D\}/g, i18n.D[dayNumber]);
  string = string.replace(/\{dd\}/g, ("0" + dateNumber).slice(-2));
  string = string.replace(/\{d\}/g, dateNumber);

  string = string.replace(/\{MMMM\}/g, i18n.MMMM[monthNumber - 1]);
  string = string.replace(/\{MMM\}/g, i18n.MMM[monthNumber - 1]);
  string = string.replace(/\{mm\}/g, ("0" + monthNumber).slice(-2));
  string = string.replace(/\{m\}/g, monthNumber);      

  string = string.replace(/\{yyyy\}/g, ("0" + yearNumber).slice(-4));
  string = string.replace(/\{yy\}/g, ("0" + yearNumber).slice(-2));
  
  return string;
}

class MaterialDatepicker {

  constructor (element, settings) {
    const defaults = {
      type: "date",
      
      lang: 'en',
      orientation: 'landscape',
      primaryColor: 'rgba(0, 150, 136, 1)',
      theme: 'light',
      buttons: true,
      openOn: 'click',
      closeAfterClick: true,
      
      date: new Date(),
      weekBegin: 'sunday',
      outputFormat: {
        date: "{yyyy}/{mm}/{dd}",
        month: "{MMMM} {yyyy}"
      },
      topHeaderFormat: "{YYYY}",
      headerFormat: {
        date: "{DDD}, {MMM} {d}",
        month: "{MMM}"
      },
      sitePickerFormat: {
        date: "{MMMM} {yyyy}",
        month: "{yyyy}"
      },
      
      onLoad: '',
      onOpen: '',
      onNewDate: '',
      outputElement: '',
    };

    this.settings = Object.assign(defaults, settings);
    this.date = this.settings.date;
    
    if (typeof this.settings.topHeaderFormat == 'object') {
      this.settings.topHeaderFormat = this.settings.topHeaderFormat[this.settings.type];
    }
    
    if (typeof this.settings.headerFormat == 'object') {
      this.settings.headerFormat = this.settings.headerFormat[this.settings.type];
    }
    
    if (typeof this.settings.outputFormat == 'object') {
      this.settings.outputFormat = this.settings.outputFormat[this.settings.type];
    }
    
    
    if (typeof this.settings.sitePickerFormat == 'object') {
      this.settings.sitePickerFormat = this.settings.sitePickerFormat[this.settings.type];
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://rawgit.com/FreddyFY/material-datepicker/datepicker/src/translations/${this.settings.lang}.json`, true);
//    xmlhttp.open("GET", `/src/translations/${this.settings.lang}.json`, true);
    var i18nn;
    xmlhttp.addEventListener("readystatechange", () => {
      if (xmlhttp.readyState == 4) { 
        this.i18n = JSON.parse(xmlhttp.responseText);
        loaded();
      }
    });
    xmlhttp.send();

    let loaded = () => {
      this.element = element;
      if (typeof this.element == 'string') {
        this.element = document.querySelector(`${element}`);
        if (this.element == null) {
          console.warn("Object is not defined");
          return;
        }
      }
      
      if (typeof this.settings.outputElement == 'string' && this.settings.outputElement != '') {
        this.settings.outputElement = document.querySelector(`${this.settings.outputElement}`);
      }
      
      this.define();
    }
  }

  define() {
    this.createElement();

    if (this.settings.openOn == 'direct') {
      this.open(this.settings.openOn);
      return;
    }
    
    this.element.addEventListener(this.settings.openOn, () => {
      this.open(this.settings.openOn);
    });
  }

  createElement(time) {
    this.position = this.element.getBoundingClientRect();

    this.picker = document.createElement('div');
    this.picker.setAttribute('class', `mp-${this.settings.type}picker mp-picker`);
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
    containerInfoYear.setAttribute('class', 'mp-info-first');
    containerInfo.appendChild(containerInfoYear);

    const containerInfoMonth = document.createElement('span');
    containerInfoMonth.setAttribute('class', 'mp-info-second');
    containerInfo.appendChild(containerInfoMonth);

    //picker
    const containerPickerYear = document.createElement('div');
    containerPickerYear.setAttribute('class', 'mp-picker-site');
    containerPicker.appendChild(containerPickerYear);

    const containerPickerYearBefore = document.createElement('a');
    containerPickerYearBefore.setAttribute('class', 'mp-picker-site-before mp-picker-site-button');
    containerPickerYear.appendChild(containerPickerYearBefore);
    containerPickerYearBefore.addEventListener('click', () => {
      this._siteChange(-1)
    })

    const containerPickerYearThis = document.createElement('span');
    containerPickerYearThis.setAttribute('class', 'mp-picker-site-this mp-animate');
    containerPickerYear.appendChild(containerPickerYearThis);

    const containerPickerYearNext = document.createElement('a');
    containerPickerYearNext.setAttribute('class', 'mp-picker-site-next mp-picker-site-button');
    containerPickerYear.appendChild(containerPickerYearNext);
    containerPickerYearNext.addEventListener('click', () => {
      this._siteChange(+1)
    })

    const containerPickerChoose = document.createElement('div');
    containerPickerChoose.setAttribute('class', 'mp-picker-choose mp-animate');
    containerPicker.appendChild(containerPickerChoose);

    //styles
    const newStyle = `
      .mp-picker:not([data-theme="dark"]) .mp-picker-info {
        background-color: ${this.settings.primaryColor};
      }

      .mp-picker .mp-picker-choose [class*="mp-picker-click"].active,
      .mp-picker[data-theme="dark"] .mp-picker-choose [class*="mp-picker-click"].active {
        background-color: ${this.settings.primaryColor};
      }

      .mp-picker .mp-picker-choose [class*="mp-picker-click"].today:not(.active),
      .mp-picker[data-theme="dark"] .mp-picker-choose .mp-picker-choose [class*="mp-picker-click"].today:not(.active) {
        color: ${this.settings.primaryColor};
      }
    `;

    const containerStyle = document.createElement('style');
    containerStyle.type = 'text/css';
    containerStyle.appendChild(document.createTextNode(newStyle));
    document.querySelector('head').appendChild(containerStyle);
    
    this._updatePicker();

//    this.newDate();
  }
  
  _updatePicker() {
    const containerPickerChoose = this.picker.querySelector('.mp-picker-choose');
    containerPickerChoose.innerHTML = '';
    
    if (this.settings.type == 'date') {
      const maxMonthLength = 42;
      const week = 7;
      
      //weekday
      for (let i = 0; i < week; i++) {
        let weekDay = i;
        if (this.settings.weekBegin == 'monday') {
          weekDay = weekDay + 1;
          if (weekDay >= week) {
            weekDay = 0;
          }
        }
        
        const containerPickerChooseWeekDay = document.createElement('span');
        containerPickerChooseWeekDay.setAttribute('class', `mp-picker-header mp-picker-header-day-${i}`);
        containerPickerChooseWeekDay.innerHTML = this.i18n.D[weekDay];
        containerPickerChoose.appendChild(containerPickerChooseWeekDay);
      }
      
      //all days
      let thisMonthLenght = this.date;
      thisMonthLenght.setDate(1);
      thisMonthLenght.setMonth(thisMonthLenght.getMonth() + 1);
      thisMonthLenght.setDate(0);
      let firstWeekDay = thisMonthLenght;
      thisMonthLenght = thisMonthLenght.getDate();
      firstWeekDay.setDate(1);
      firstWeekDay = firstWeekDay.getDay();
    
      for (let i = 0, num = 1; i < maxMonthLength; i++) {
        const containerPickerChooseDay = document.createElement('a');
        containerPickerChooseDay.setAttribute('class', `mp-picker-choose-day`);
        
        let boolean = i >= firstWeekDay;
        if (this.settings.weekBegin == 'monday') {
          boolean = i + 1 >= firstWeekDay;
        }
        
        if (boolean && num <= thisMonthLenght ) {
          containerPickerChooseDay.innerHTML = num;
          containerPickerChooseDay.classList.add(`mp-picker-click-${num}`);
          num++;
        } else {
          containerPickerChooseDay.innerHTML = ' ';
          containerPickerChooseDay.classList.add('mp-empty');
        }
        
        containerPickerChoose.appendChild(containerPickerChooseDay);

        containerPickerChooseDay.addEventListener('click', (element) => {
          if (element.path[0].classList.contains('mp-empty')) return;
          let date = num -1;
          let nextDate = this.date
          nextDate.setDate(date);
          if (this.settings.openOn == 'direct') {
            this.newDate(nextDate);
          } else {
            this.newDate(nextDate, 'close');
          }
        })
      }
    } else if (this.settings.type == 'month') {
      const months = 12;
      for (let i = 0; i < months; i++) {
        const containerPickerChooseMonth = document.createElement('a');
        containerPickerChooseMonth.setAttribute('class', `mp-picker-click-${i} mp-picker-choose-month`);
        containerPickerChooseMonth.innerHTML = this.i18n.MMM[i];
        containerPickerChoose.appendChild(containerPickerChooseMonth);

        containerPickerChooseMonth.addEventListener('click', () => {
          let month = i;
          let nextDate = this.date
          nextDate.setMonth(month);
          this.newDate(nextDate, 'close');
        })
      }
    }
    this.callbackOnLoad();
  }

  _siteChange(direction) {
    let directions = {'-1': 'left', '1': 'right'};
    let directionsNot = {'-1': 'right', '1': 'left'};
    if (this.settings.type == 'date') {
      this.date.setMonth(this.date.getMonth() + direction);
    } else if (this.settings.type == 'month') {
      this.date.setYear(this.date.getYear() + 1900 + direction);
    }

    this.picker.querySelectorAll(`.mp-animate`)[0].classList.add(`mp-animate-${directions[direction]}`);
    this.picker.querySelectorAll(`.mp-animate`)[1].classList.add(`mp-animate-${directions[direction]}`);

    setTimeout( () => {
      this.picker.querySelectorAll(`.mp-animate`)[0].classList.remove(`mp-animate-${directions[direction]}`);
      this.picker.querySelectorAll(`.mp-animate`)[0].classList.add(`mp-animate-${directionsNot[direction]}`);
      this.picker.querySelectorAll(`.mp-animate`)[1].classList.remove(`mp-animate-${directions[direction]}`);
      this.picker.querySelectorAll(`.mp-animate`)[1].classList.add(`mp-animate-${directionsNot[direction]}`);
      
      this._updatePicker();

      setTimeout( () => {
        this.picker.querySelectorAll(`.mp-animate`)[0].classList.remove(`mp-animate-${directionsNot[direction]}`);
        this.picker.querySelectorAll(`.mp-animate`)[1].classList.remove(`mp-animate-${directionsNot[direction]}`);

        this.newDate(this.date);
      }, 200);

    }, 200);
  }

  open(how) {
    if (how == 'direct' && this.element.tagName == 'DIV') {
      this.element.appendChild(this.picker);
      this.newDate(null);
      this.callbackOnOpen();
      return;
    }
    
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
    this.callbackOnOpen();
  }

  close() {
    this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker);
  }

  newDate(date, value) {
    let dates = date || this.settings.date;
    let i18n = this.i18n;
    let year = (dates.getYear() + 1900) + '';
    let month = dates.getMonth();
    let day = dates.getDay();
    let datee = dates.getDate();


    
    this.picker.querySelector('.mp-info-first').innerHTML = year;
    this.picker.querySelector('.mp-info-second').innerHTML = dateToString(this.settings.headerFormat, dates, this.i18n);
    this.picker.querySelector('.mp-picker-site-this').innerHTML = dateToString(this.settings.sitePickerFormat, dates, this.i18n);

    if (this.picker.querySelector(`[class*="mp-picker-click"].active`) != null) {
      this.picker.querySelector(`[class*="mp-picker-click"].active`).classList.remove('active');
    }

    
    let boolean;
    if (this.settings.type == 'date') {
      boolean = new Date().getYear() == dates.getYear() && new Date().getMonth() == dates.getMonth();
      this.picker.querySelector(`.mp-picker-click-${dates.getDate() * 1}`).classList.add('active');
    } else if (this.settings.type == 'month') {
      boolean = new Date().getYear() == dates.getYear();
      this.picker.querySelector(`.mp-picker-click-${dates.getMonth() * 1}`).classList.add('active');
    }

    if (boolean) {
      this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}`).classList.add('today');
    } else if (this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}.today`) != null) {
      this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}.today`).classList.remove('today');
    }

    //set to 0:00:00
    dates.setMilliseconds(0);
    dates.setSeconds(0);
    dates.setMinutes(0);
    dates.setHours(0);

    this.date = dates;
    
    //write into field
    let output = dateToString(this.settings.outputFormat, dates, this.i18n);

    if ( (this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text') ||
          this.element.tagName == 'DIV') {
      this.element.value = output;
    }

    if (this.settings.outputElement.tagName == 'SPAN' ||
        this.settings.outputElement.tagName == 'P' ||
        this.settings.outputElement.tagName == 'A') {
      this.settings.outputElement.innerHTML = output;
    }
    
    if (value == 'close') {
      this.close();
      this.callbackOnNewDate();
    }
  }
  
  callbackOnLoad() {
    if (typeof(this.settings.onLoad) == 'function') {
      this.settings.onLoad.call(this, this.date)
    }
  }
  
  callbackOnOpen() {
    if (typeof(this.settings.onOpen) == 'function') {
      this.settings.onOpen.call(this, this.date)
    }
  }
  
  callbackOnNewDate() {
    if (typeof(this.settings.onNewDate) == 'function') {
      this.settings.onNewDate.call(this, this.date)
    }
  }
}
