# PowerForm
A long form is boring to the user. Break it up into smaller steps and make things easier as well as improve the UX for the person filling up the form.

## Features
- [x] Lightweight (~ 6kb)
- [x] Minimal HTML markup
- [x] Significant customization
- [x] Progressbar (graphical representation)
- [x] Stepbar (textual representation)
- [x] Conforms to W3C Standards for HTML5 and CSS3
- [x] Multi functional - Use it for forms or simply as presentation slides

## Dependencies
This plugin must be used with [jQuery](http://jquery.com/) (> v1.6).

## Usage
**STEP 1:** Include the plugin CSS file.
```
<link href="pluginForm.css" rel="stylesheet" type="text/css">
```

**STEP 2:** Include the jQuery and the plugin javascript files. Make sure the plugin file is always referenced after jQuery
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="powerForm.js"></script>
```
**STEP 3:** Write the HTML
- The root element must contain the CSS class *nl-powerForm*.
- You're free to use any *id* attribute for the root element
- Each `<fieldset>` will become a panel in the generated UI. So in this case, there will be 3 panels to begin with.
```
<div id="myForm" class="nl-powerForm">								
	<fieldset>					
		<h1>This is panel 1</h1>
	</fieldset>
	<fieldset>					
		<h1>This is panel 2</h1>
	</fieldset>					
	<fieldset>					
		<h1>This is panel 3</h1>					
	</fieldset>
</div>
```
**STEP 4:** Initialize the plugin
```
$('#myForm').powerForm({
	stepBar: true,
	stepLabels: ['Service Request Type Selection', 'Questionnaire', 'Contact Details'],
	nextButtonClass:'btn btn-danger',
	prevButtonClass:'btn btn-default',
	submitButtonClass:'btn btn-primary'
});
```
