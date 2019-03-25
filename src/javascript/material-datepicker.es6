class MaterialDatepicker {

  constructor(element, settings) {
    const defaults = {
      type: "date",

      lang: 'en',
      orientation: 'landscape',
      color: 'rgba(0, 150, 136, 1)',
      theme: 'light',
      zIndex: '100',
      position: null,
      buttons: true,
      openOn: 'click',
      closeAfterClick: true,

      date: new Date(),
      weekBegin: 'sunday',
      outputFormat: {
        date: "YYYY/MM/DD",
        month: "MMMM YYYY",
      },
      topHeaderFormat: "YYYY",
      headerFormat: {
        date: "ddd, MMM D",
        month: "MMM",
      },
      sitePickerFormat: {
        date: "MMMM YYYY",
        month: "YYYY",
      },

      onLoad: null,
      onOpen: null,
      onNewDate: null,
      onChange: null,
      outputElement: '',
    }

    this.settings = Object.assign(defaults, settings)
    moment.locale(this.settings.lang)

    if (typeof this.settings.topHeaderFormat == 'object') {
      this.settings.topHeaderFormat = this.settings.topHeaderFormat[this.settings.type]
    }

    if (typeof this.settings.headerFormat == 'object') {
      this.settings.headerFormat = this.settings.headerFormat[this.settings.type]
    }

    if (typeof this.settings.outputFormat == 'object') {
      this.settings.outputFormat = this.settings.outputFormat[this.settings.type]
    }

    if (typeof this.settings.sitePickerFormat == 'object') {
      this.settings.sitePickerFormat = this.settings.sitePickerFormat[this.settings.type]
    }

    this.element = element
    if (typeof this.element == 'string') {
      this.element = document.querySelector(`${element}`)
      if (this.element == null) {
        console.warn(`Material Datepicker could not initialize because, Object: "${element}" is not defined`)
        return
      }
    }

    let elementTag = this.element.tagName
    let elementType = this.element.getAttribute('type')
    let elementVal = ""

    if (elementTag == "INPUT") {
      elementVal = this.element.value
    } else if (elementTag == "DIV" || elementTag == "A" || elementTag == "SPAN" || elementTag == "P") {
      if (this.element.children == 0) {
        elementVal = this.element.innerHTML
      }
    } else if (elementTag == "PAPER-INPUT") {
      elementVal = this.element.value
    }

    const valueDate = moment(elementVal, this.settings.outputFormat)
    this.date = this.settings.date

    if (valueDate.isValid()) {
      this.date = valueDate.getDate()
    }

    if (typeof this.settings.outputElement == 'string' && this.settings.outputElement != '') {
      this.settings.outputElement = document.querySelector(`${this.settings.outputElement}`)
    }

    this._writeInElement()
    this._define()
  }

  _define() {
    this._createElement()

    if (this.settings.openOn == 'direct') {
      this.open(this.settings.openOn)
      return
    }

    this.element.addEventListener(this.settings.openOn, () => {
      this.open(this.settings.openOn)
    })

    if (this.settings.openOn != 'direct') {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode == 9) {
          // TAB watch
          if (document.activeElement == this.element) {
            this.open()
          } else {
            this.close()
          }
        }
      })

      document.addEventListener('keyup', (e) => {
        let elementVal = this.element.value
        let newDate = moment(elementVal, this.settings.outputFormat).toDate()

        this.newDate(newDate, '', false)
      })


      document.addEventListener('mouseup', (event) => {
        let isPicker = false
        var ePath = this._getPath(event)
        if (ePath.indexOf(this.picker) == -1) {
          this.close()
        }
      })
    }
  }

  _createElement(time) {
    let randomNumber = new Date().getTime() + Math.round(Math.random() + 2)

    this.picker = document.createElement('div')
    this.picker.setAttribute('class', `mp-${this.settings.type}picker mp-picker`)
    this.picker.setAttribute('id', `mp-${randomNumber}`)
    this.picker.setAttribute('data-theme', this.settings.theme)
    this.picker.setAttribute('data-orientation', this.settings.orientation)

    let containerInfo = document.createElement('div')
    containerInfo.setAttribute('class', 'mp-picker-info')
    this.picker.appendChild(containerInfo)

    let containerPicker = document.createElement('div')
    containerPicker.setAttribute('class', 'mp-picker-picker')
    this.picker.appendChild(containerPicker)

    //Info
    const containerInfoYear = document.createElement('span')
    containerInfoYear.setAttribute('class', 'mp-info-first')
    containerInfo.appendChild(containerInfoYear)

    const containerInfoMonth = document.createElement('span')
    containerInfoMonth.setAttribute('class', 'mp-info-second')
    containerInfo.appendChild(containerInfoMonth)

    //picker
    const containerPickerYear = document.createElement('div')
    containerPickerYear.setAttribute('class', 'mp-picker-site')
    containerPicker.appendChild(containerPickerYear)

    const containerPickerYearBefore = document.createElement('a')
    containerPickerYearBefore.setAttribute('class', 'mp-picker-site-before mp-picker-site-button')
    containerPickerYear.appendChild(containerPickerYearBefore)
    containerPickerYearBefore.addEventListener('click', () => {
      this._siteChange(-1)
    })

    const containerPickerYearThis = document.createElement('span')
    containerPickerYearThis.setAttribute('class', 'mp-picker-site-this mp-animate')
    containerPickerYear.appendChild(containerPickerYearThis)

    const containerPickerYearNext = document.createElement('a')
    containerPickerYearNext.setAttribute('class', 'mp-picker-site-next mp-picker-site-button')
    containerPickerYear.appendChild(containerPickerYearNext)
    containerPickerYearNext.addEventListener('click', () => {
      this._siteChange(+1)
    })

    const containerPickerChoose = document.createElement('div')
    containerPickerChoose.setAttribute('class', 'mp-picker-choose mp-animate')
    containerPicker.appendChild(containerPickerChoose)

    //styles
    const newStyle = `
      #mp-${randomNumber}.mp-picker:not([data-theme="dark"]) .mp-picker-info {
        background-color: ${this.settings.color};
      }

      #mp-${randomNumber}.mp-picker .mp-picker-choose [class*="mp-picker-click"].active,
      #mp-${randomNumber}.mp-picker[data-theme="dark"] .mp-picker-choose [class*="mp-picker-click"].active {
        background-color: ${this.settings.color};
      }

      #mp-${randomNumber}.mp-picker .mp-picker-choose [class*="mp-picker-click"].today:not(.active),
      #mp-${randomNumber}.mp-picker[data-theme="dark"] .mp-picker-choose .mp-picker-choose [class*="mp-picker-click"].today:not(.active) {
        color: ${this.settings.color};
      }
    `

    const containerStyle = document.createElement('style')
    containerStyle.type = 'text/css'
    containerStyle.appendChild(document.createTextNode(newStyle))
    document.querySelector('head').appendChild(containerStyle)

    this.draw()
    this.callbackOnLoad()
  }

  draw() {
    const containerPickerChoose = this.picker.querySelector('.mp-picker-choose')
    containerPickerChoose.innerHTML = ''

    // write in header area
    this.picker.querySelector('.mp-info-first').innerHTML = moment(this.date).format(this.settings.topHeaderFormat)
    this.picker.querySelector('.mp-info-second').innerHTML = moment(this.date).format(this.settings.headerFormat)
    this.picker.querySelector('.mp-picker-site-this').innerHTML = moment(this.date).format(this.settings.sitePickerFormat)

    if (this.picker.querySelector(`[class*="mp-picker-click"].active`) != null) {
      this.picker.querySelector(`[class*="mp-picker-click"].active`).classList.remove('active')
    }

    if (this.settings.type == 'date') {
      const maxMonthLength = 42
      const week = 7

      //weekday
      for (let i = 0; i < week; i++) {
        let weekDay = i
        if (this.settings.weekBegin == 'monday') {
          weekDay = weekDay + 1
          if (weekDay >= week) {
            weekDay = 0
          }
        }

        const containerPickerChooseWeekDay = document.createElement('span')
        containerPickerChooseWeekDay.setAttribute('class', `mp-picker-header mp-picker-header-day-${i}`)
        containerPickerChooseWeekDay.innerHTML = moment.weekdaysMin()[weekDay].substr(0, 1)
        containerPickerChoose.appendChild(containerPickerChooseWeekDay)
      }

      //all days
      let thisMonthLenght = this.date.getTime()
      thisMonthLenght = new Date(thisMonthLenght)
      thisMonthLenght.setDate(1)
      thisMonthLenght.setMonth(thisMonthLenght.getMonth() + 1)
      thisMonthLenght.setDate(0)
      let firstWeekDay = thisMonthLenght
      thisMonthLenght = thisMonthLenght.getDate()
      firstWeekDay.setDate(1)
      firstWeekDay = firstWeekDay.getDay()

      for (let i = 0, num = 1; i < maxMonthLength; i++) {
        const containerPickerChooseDay = document.createElement('a')
        containerPickerChooseDay.setAttribute('class', `mp-picker-choose-day`)

        let boolean = i >= firstWeekDay
        if (this.settings.weekBegin == 'monday') {
          boolean = i + 1 >= firstWeekDay
        }

        if (boolean && num <= thisMonthLenght) {
          containerPickerChooseDay.innerHTML = num
          containerPickerChooseDay.classList.add(`mp-picker-click-${num}`)
          num++
        } else {
          containerPickerChooseDay.innerHTML = ' '
          containerPickerChooseDay.classList.add('mp-empty')
        }

        containerPickerChoose.appendChild(containerPickerChooseDay)

        containerPickerChooseDay.addEventListener('click', (event) => {
          if (this._getPath(event)[0].classList.contains('mp-empty')) return
          let date = num - 1
          let nextDate = this.date
          nextDate.setDate(date)

          if (this.settings.openOn == 'direct') {
            this.newDate(nextDate)
          } else {
            this.newDate(nextDate, 'close')
          }
        })
      }

      //set Today
      if (new Date().getYear() == this.date.getYear() && new Date().getMonth() == this.date.getMonth()) {
        this.picker.querySelector(`.mp-picker-click-${new Date().getDate() * 1}`).classList.add('today')
      } else if (this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}.today`) != null) {
        this.picker.querySelector(`.mp-picker-click-${new Date().getDate() * 1}.today`).classList.remove('today')
      }

      this.picker.querySelector(`.mp-picker-click-${this.date.getDate() * 1}`).classList.add('active')
    } else if (this.settings.type == 'month') {
      const months = 12
      for (let i = 0; i < months; i++) {
        const containerPickerChooseMonth = document.createElement('a')
        containerPickerChooseMonth.setAttribute('class', `mp-picker-click-${i} mp-picker-choose-month`)
        containerPickerChooseMonth.innerHTML = moment.monthsShort('-MMM-')[i].replace('.', '')
        containerPickerChoose.appendChild(containerPickerChooseMonth)

        containerPickerChooseMonth.addEventListener('click', () => {
          let month = i
          let nextDate = this.date
          nextDate.setMonth(month)

          if (this.settings.openOn == 'direct') {
            this.newDate(nextDate)
          } else {
            this.newDate(nextDate, 'close')
          }
        })
      }

      // set today
      if (new Date().getYear() == this.date.getYear()) {
        this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}`).classList.add('today')
      } else if (this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}.today`) != null) {
        this.picker.querySelector(`.mp-picker-click-${new Date().getMonth() * 1}.today`).classList.remove('today')
      }

      this.picker.querySelector(`.mp-picker-click-${this.date.getMonth() * 1}`).classList.add('active')
    }
  }

  _siteChange(direction) {
    let directions = {'-1': 'left', '1': 'right'}
    let directionsNot = {'-1': 'right', '1': 'left'}
    if (this.settings.type == 'date') {
      this.date = moment(this.date).add(direction, 'month').toDate()
    } else if (this.settings.type == 'month') {
      this.date = moment(this.date).add(direction, 'year').toDate()
    }

    this.picker.querySelectorAll(`.mp-animate`)[0].classList.add(`mp-animate-${directionsNot[direction]}`)
    this.picker.querySelectorAll(`.mp-animate`)[1].classList.add(`mp-animate-${directionsNot[direction]}`)

    setTimeout(() => {
      this.picker.querySelectorAll(`.mp-animate`)[0].classList.remove(`mp-animate-${directionsNot[direction]}`)
      this.picker.querySelectorAll(`.mp-animate`)[0].classList.add(`mp-animate-${directions[direction]}`)
      this.picker.querySelectorAll(`.mp-animate`)[1].classList.remove(`mp-animate-${directionsNot[direction]}`)
      this.picker.querySelectorAll(`.mp-animate`)[1].classList.add(`mp-animate-${directions[direction]}`)

      this.draw()

      setTimeout(() => {
        this.picker.querySelectorAll(`.mp-animate`)[0].classList.remove(`mp-animate-${directions[direction]}`)
        this.picker.querySelectorAll(`.mp-animate`)[1].classList.remove(`mp-animate-${directions[direction]}`)

        this.newDate(this.date)
      }, 200)

    }, 200)
  }

  open(how) {
    if (how == 'direct' && this.element.tagName == 'DIV') {
      this.element.appendChild(this.picker)
    } else {

      let elementTag = this.element.tagName
      let elementType = this.element.getAttribute('type')
      let elementVal = this.element.value

      if (((elementTag == 'INPUT' && (elementType == 'date' || elementType == 'number' || elementType == 'text')) || (elementTag == 'PAPER-INPUT')) && elementVal != '') {
        this.date = moment(elementVal, this.settings.outputFormat).toDate()
      }

      document.body.appendChild(this.picker)
      const pickerOffset = 10

      let elementPosition = this._findTotalOffset(this.element)
      let top = elementPosition.top + elementPosition.height + pickerOffset
      let left = elementPosition.left
      let bodyWidth = bodyWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      let bodyHeight = bodyHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      let picker = this._findTotalOffset(this.picker)

      if (left + picker.width + 50 > bodyWidth) {
        left = left - picker.width - pickerOffset
      }

      if (top + picker.height + 20 > bodyHeight) {
        top = top - picker.height - elementPosition.height - pickerOffset
      }

      this.picker.style.top = `${top}px`
      this.picker.style.left = `${left}px`
    }

    this.picker.style.zIndex = this.settings.zIndex
    if (this.settings.position != null) {
      this.picker.style.position = this.settings.position
    }

    this.newDate(null)
    this.callbackOnOpen()
  }

  close() {
    this.picker && this.picker.parentNode && this.picker.parentNode.removeChild(this.picker)
  }

  _writeInElement() {
    let output = moment(this.date).format(this.settings.outputFormat)
    if ((this.element.tagName == 'INPUT' && this.element.getAttribute('type') == 'text') ||
      this.element.tagName == 'DIV' ||
      this.element.tagName == 'PAPER-INPUT') {
      this.element.value = output
    }

    if (this.settings.outputElement && this.settings.outputElement.tagName != 'INPUT') {
      this.settings.outputElement.innerHTML = output
    }
  }

  newDate(date, value, rewrite = true) {
    let dates = date || this.date

    if (isNaN(dates.valueOf())) {
      dates = this.settings.date
    }

    //set to 0:00:00
    dates.setMilliseconds(0)
    dates.setSeconds(0)
    dates.setMinutes(0)
    dates.setHours(0)

    this.date = dates

    this.draw()

    if (rewrite) {
      this._writeInElement()
    }

    this.callbackOnChange()

    if (value == 'close') {
      this.close()
      this.callbackOnNewDate()
    }

  }

  callbackOnLoad() {
    if (typeof (this.settings.onLoad) == 'function') {
      this.settings.onLoad.call(this, this.date)
    }
  }

  callbackOnOpen() {
    if (typeof (this.settings.onOpen) == 'function') {
      this.settings.onOpen.call(this, this.date)
    }
  }

  callbackOnNewDate() {
    if (typeof (this.settings.onNewDate) == 'function') {
      this.settings.onNewDate.call(this, this.date)
    }
  }

  callbackOnChange() {
    if (typeof (this.settings.onChange) == 'function') {
      this.settings.onChange.call(this, this.date)
    }
  }

  _findTotalOffset(obj) {
    let ol, ot
    ol = ot = 0
    let offset = obj.getBoundingClientRect()

    if (obj.offsetParent) {
      do {
        ol += obj.offsetLeft
        ot += obj.offsetTop
      } while (obj = obj.offsetParent)
    }

    return {left: ol, top: ot, height: offset.height, width: offset.width}
  }

  _getPath(event) {
    var path = []
    var currentElem = event.target
    while (currentElem) {
      path.push(currentElem)
      currentElem = currentElem.parentElement
    }

    if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
      path.push(document)
    }

    if (path.indexOf(window) === -1) {
      path.push(window)
    }
    return path
  }

}
