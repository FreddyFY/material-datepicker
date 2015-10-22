# material-datepicker

## Usage

Include the JavaScript file and Stylesheet in your html page.

```html
  <link rel="stylesheet" type="text/css" href="https://rawgit.com/FreddyFY/material-datepicker/master/src/material-datepicker.css">
  <script type="text/javascript" src="https://rawgit.com/FreddyFY/material-datepicker/master/src/material-datepicker.js"></script>

```

In its simplest case, Material-Picker can be initialised with a single line of Javascript.
You will probably also specify some options while applying the plugin.

```js
var monthpicker = new MaterialDatepicker('input');
var monthpicker = new MaterialDatepicker('input', {
  lang: 'de',
  orientation: 'portrait',
});
```

## Options

* **type** *(default: "date")* *[string]* - Datepicker["date"], Monthpicker["month"]
* **lang** *(default: "en")* *[string]* - Language
* **orientation** *(default: "landscape")* *[string]* - Orientation of the picker: portait or landscape
* **primaryColor** *(default: "#80cbc4")* *[string]* - Color of the picker; Html color values
* **theme** *(default: "light")* *[string]* - Theme of the picker: light or dark
* **openOn** *(default: "click")* *[string]* - How to open the picker: Click-events or 'direct'
* **closeAfterClick** *(default: true)* *[string]* - Close the picker after choose a date or not

* **date** *(default: today)* *[type: Date Object]* - The initial date of the Picker
* **weekBegin** *(default: "sunday")* *[string]* - Beginning weekday of the week: sunday or monday
* **outputFormat** *(default: date "{yyyy}/{mm}/{dd}"; month "{MMMM} {yyyy}")* *[string]* - Date-format of the output [inside a input or OutputElement]: Uppercase is a string, Lowercase is a number
* **topHeaderFormat** *(default: "{YYYY}")* *[string]* - Date-format of the output [inside a input or OutputElement]: Uppercase is a string, Lowercase is a number
* **headerFormat** *(default: date "{DD}, {MMM} {d}"; month "{MMMM}")* *[string]* - Date Format in the header bar
* **sitePickerFormat** *(default: date "{MMMM} {yyyy}"; month "{yyyy}")* *[string]* - Date Format in the site picker bar

* **onLoad** *(default: none)* *[function]* - Function called when picker is loaded
* **onOpen** *(default: none)* *[function]* - Function called when picker is open
* **onNewDate** *(default: none)* *[function]* - Function called when new Date is picked
* **outputElement** *(default: none)* *[string or Object]* - Returns the date inside a SPAN-tag, P-tag or A-Tag


### Example
```js
var monthpicker = new MaterialDatepicker('input', {
  lang: 'de',
  orientation: 'portrait',
  theme: 'dark',
  primary-color: 'red',
  date: new Date(861999834000),
  outputFormat: '{d} - {mm} - {yyyy} - {timestamp}',
  outputElment: '.month',
  onNewDate: function() {
               alert('New Date!!')
             }
});
```


## API

`.open()`

`.close()`

`.newDate( new Date(861999834000) )` set new Date

`.date` returns the current date

`.element` returns the choosen element

`.picker` returns the picker element



## Screenshots
### Material Monthpicker

![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-landscape.png)
![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-dark.png)
![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-portrait.png)
![alt tag](https://raw.githubusercontent.com/FreddyFY/material-datepicker/master/links/images/screenshots/png/monthpicker-primary.png)

