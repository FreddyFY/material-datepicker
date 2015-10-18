# material-datepicker

## Usage

Include the JavaScript file and Stylesheet in your html page.

```html
  <link rel="stylesheet" type="text/css" href="https://rawgit.com/FreddyFY/material-datepicker/master/src/material-datepicker.css">
  <script type="text/javascript" src="https://rawgit.com/FreddyFY/material-datepicker/master/assets/javascript/material-monthpicker.js"></script>

```

In its simplest case, Material-Picker can be initialised with a single line of Javascript.
You will probably also specify some options while applying the plugin.

```js
var monthpicker = new MaterialMonthpicker('input');
var monthpicker = new MaterialMonthpicker('input', {
  lang: 'de',
  orientation: 'portrait',
});
```

## Options

* **type** *(default: date)* *[string]* - Datepicker, Monthpicker
* **lang** *(default: en)* *[string]* - Language
* **date** *(default: today)* *[type: Date Object]* - The initial date of the Picker
* **outputFormat** *(default: {mm}/{yyyy})* *[string]* - Date-format of the output [inside a input or OutputElement]: Uppercase is a string, Lowercase is a number
* **outputElement** *(default: none)* *[string or Object]* - Returns the date inside a SPAN-tag, P-tag or A-Tag
* **weekBegin** *(default: sunday)* *[string]* - Beginning weekday of the week: sunday or monday
* **orientation** *(default: landscape)* *[string]* - Orientation of the picker: portait or landscape
* **theme** *(default: light)* *[string]* - Theme of the picker: light or dark
* **primaryColor** *(default: #80cbc4)* *[string]* - Color of the picker; Html color values
* **onNewDate** *(default: none)* *[function]* - Function called when new Date is picked


### Example
```js
var monthpicker = new MaterialMonthpicker('input', {
  lang: 'de',
  orientation: 'portrait',
  theme: 'dark',
  primary-color: 'red',
  date: new Date(861999834000),
  outputFormat: '{d} - {mm} - {yyyy} - {timestamp}',
  outputElment: '.month'
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

