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
```HTML
<!DOCTYPE html>
<html lang="en-us">
<head>
<meta charset="utf-8">
<title>PowerForm - a jQuery Plugin</title>
<!-- Include the plugin CSS file. -->
<link href="pluginForm.css" rel="stylesheet" type="text/css">

<!-- Include the jQuery and the plugin javascript files. 
     Make sure the plugin file is always referenced after jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="powerForm.js"></script>
</head>
<body>
<!-- Write the HTML 
- The root element must contain the CSS class *nl-powerForm*.
- You're free to use any *id* attribute for the root element
- Each `<fieldset>` will become a panel in the generated UI. 
  So in this case, there will be 3 panels to begin with.
-->
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

<script type="text/javascript">
/* Initialize the plugin */
jQuery('#myForm').powerForm({
	stepBar: true,
	stepLabels: ['Service Request Type Selection', 'Questionnaire', 'Contact Details'],
	nextButtonClass:'btn btn-danger',
	prevButtonClass:'btn btn-default',
	submitButtonClass:'btn btn-primary'
});
</script>
</body>
</html>
```

##Plugin Options
|Key	|Data Type	|Default Value	|Description|
|-------|---------------|---------------|-----------|
|onNext	|function	|`null`		|A callback that fires when the "Next" button is clicked. The button object is available for use as the first argument of the function. If `false` is returned from this function, the next panel will not be shown. Useful in cases where you need to validate empty form fields<br />Example: `onNext:function(button){ console.log(button); }`|
|onPrev	|function	|`null`		|A callback that fires when the "Previous" button is clicked. The button object is available for use as the first argument of the function. If `false` is returned from this function, the previous panel will not be shown.<br />Example: `onPrev:function(button){ console.log(button); }`|
|animationDuration	|number	|`300`	|Time in milliseconds to complete the sliding animation|
|progressBar	|boolean	|`true`	|Whether to show the graphical progress bar in the UI|
|stepBar	|boolean	|`false`	|Wehther to show the textual step bar in the UI|
|stepLabels	|array	|`[]`	|A comman separated list of string values. If `stepBar` is set to `true`, the labels for the steps will be taken from this key. For best results, make sure the number of comma separated values is equal to the number of steps/panels in your HTML<br />Example: `stepLabels:["Incident Details", "Contact Details"]`|
|buttonAlignment	|string	|`right`	|The alignment of the navigating buttons (Next & Previous). Possible values are `"right"`, `"center"`, or `"left"`|
|nextButtonClass	|string	|`null`	|List of space separated string values. These will act as CSS classes on the "Next" button.<br />Example: `nextButtonClass: "btn btn-primary"`|
|prevButtonClass	|string	|`null`	|List of space separated string values. These will act as CSS classes on the "Previous" button.<br />Example: `prevButtonClass: "btn btn-primary"`|
|submitButton	|boolean| `true`	|Whether to show the form submit button on the last step/panel|
|submitButtonID	|string	|`"nl-submit"`	|If `submitButton` is set to `true`, this key will act as the `id` attribute of the button. Useful in cases where you need to handle the form submission event|
|submitButtonClass	|string	|`null`	|List of space separated string values. These will act as CSS classes on the "Submit" button.<br />Example: `submitButtonClass: "btn btn-primary"`|
|submitButtonText	|string	|`"Submit"`	|The text value of the Submit button|

##Full Example (using all options)
```javascript
$('#myForm').powerForm({
  onNext:function(button){
    var panel_no = button.closest('fieldset').attr('data-step');
    alert("You clicked the next button in Panel# "+panel_no+". You will now move to Panel# "+(panel_no + 1)); 
    return true;
  },
  onPrev:function(button){
    var panel_no = button.closest('fieldset').attr('data-step');
    alert("You clicked the previous button in Panel# "+panel_no+". You will now go back to Panel# "+(panel_no - 1));
    return true;
  },
  animationDuration: 500,
  progressBar: true,
  stepBar: true,
  stepLabels: ['Service Request Type Selection', 'Questionnaire', 'Contact Details'],
  buttonAlignment: 'center',
  nextButtonClass:'btn btn-danger',
  prevButtonClass:'btn btn-default',		
  submitButton: true,
  submitButtonClass:'btn btn-primary',
  submitButtonID: 'nl-submit',
  submitButtonText: 'Register'
});
```

