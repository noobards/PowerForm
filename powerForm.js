(function($) {
	var global = {};
	$.fn.powerForm = function(options) {
		var $this = this;
		var settings = $.extend({						
			onNext:null,
			onPrev:null,
			animationDuration:300,
			progressBar:true,
			stepBar:false,
			stepLabels:[],
			buttonAlignment:'right',
			nextButtonClass:null,
			prevButtonClass:null,
			submitButton:true,
			submitButtonID:'nl-submit',
			submitButtonClass:null,
			submitButtonText:'Submit'
		}, options);
		
		$this.showNextPanel = function($clickedButton){             
			var $fieldset = $clickedButton.closest('fieldset');
			
			var current_step_no = parseInt($fieldset.attr('data-step'), 10);
			if($('#bar-percent').length > 0){									
				var percent = Math.floor(current_step_no*100/global.nof);	
				$('#bar-percent').css('width', percent+'%');				
			}			
			if($('#form-steps').length > 0){
				$('#form-steps ul li').removeClass('form-step-active');
				$('#form-steps ul li:nth-child('+(current_step_no+1)+')').addClass('form-step-active');				
			}
			
			
			var $nextFieldset = $fieldset.next();
			var fieldset_width = $fieldset.outerWidth();
			$fieldset.animate({
				marginLeft:-fieldset_width+'px',
				opacity:0
			}, settings.animationDuration, function(){
				$(this).css({display:'none'});
			});
			$nextFieldset.css({display:'block', opacity:1}).animate({				
				marginLeft:0+'px'				
			}, settings.animationDuration);
        }
		
		$this.showPreviousPanel = function($clickedButton){			
			var $fieldset = $clickedButton.closest('fieldset');	
			var current_step_no = parseInt($fieldset.attr('data-step'), 10);	
			
			if($('#bar-percent').length > 0){
				var percent = Math.floor((current_step_no - 2)*100/global.nof);	
				$('#bar-percent').css('width', percent+'%');
			}			
			if($('#form-steps').length > 0){
				$('#form-steps ul li').removeClass('form-step-active');
				$('#form-steps ul li:nth-child('+(current_step_no-1)+')').addClass('form-step-active');
			}
			
			var $prevFieldset = $fieldset.prev();	
			var fieldset_width = $fieldset.outerWidth();
			$fieldset.animate({
				marginLeft:fieldset_width+'px',
				opacity:0			
			}, settings.animationDuration, function(){
				$(this).css({display:'none'})
			});
			$prevFieldset.css({display:'block', opacity:0}).animate({
				marginLeft:0+'px',
				opacity:1
			}, settings.animationDuration);
        }
		
		$($this).on('click', '.nl-next', function(e){
			var $button = $(this);
			if(typeof settings.onNext === 'function') {				
				if(settings.onNext.call(e, $(this)) !== false) {					
					$this.showNextPanel($button);
				}			
			} else {				
				$this.showNextPanel($button);
			}
		});
		
		$($this).on('click', '.nl-previous', function(e){			
			var $button = $(this);
			if(typeof settings.onPrev === 'function') {				
				if(settings.onPrev.call(e, $(this)) !== false) {					
					$this.showPreviousPanel($button);
				}			
			} else {				
				$this.showPreviousPanel($button);
			}
		});

		$this.each( function(options) {			
			global.main_width = $(this).outerWidth();
			global.nof = $(this).find('fieldset').length;
			global.fieldset_width = global.main_width;
			global.li_width = (global.main_width/global.nof);
			var $selector = $(this);
			$selector.find('fieldset').css('width', global.fieldset_width+'px').wrapAll('<div id="fieldsets"></div>').wrapInner('<div class="nl-panel"></div>');
			$selector.find('fieldset:not(:first-child)').css({display:'none'});			
			$('#fieldsets').css('width', global.nof * global.fieldset_width);
			$('#form-steps li').css('width', global.li_width+'px');
			
			$.each($selector.find('fieldset'), function(i, fs){
				var $fs = $(fs);
				$fs.attr('data-step', (i+1));
				var nav = '<div class="nl-navigation">';
				if(i == 0){
					nav += '<button class="nl-next'+(settings.nextButtonClass ? ' '+settings.nextButtonClass : '')+'">Next</button>';
				} else if((i + 1) == global.nof){
					nav += '<button class="nl-previous'+(settings.prevButtonClass ? ' '+settings.prevButtonClass : '')+'">Previous</button>';
					if(settings.submitButton){
						nav += '<button id="'+settings.submitButtonID+'" class="nl-submit'+(settings.submitButtonClass ? ' '+settings.submitButtonClass : '')+'">'+settings.submitButtonText+'</button>';
					}					
				} else {
					nav += '<button class="nl-previous'+(settings.prevButtonClass ? ' '+settings.prevButtonClass : '')+'">Previous</button><button class="nl-next'+(settings.nextButtonClass ? ' '+settings.nextButtonClass : '')+'">Next</button>';
				}
				nav += '</div>';
				$fs.append(nav);
				var alignment = 'right';
				if(settings.buttonAlignment == 'left'){
					alignment = 'left';
				}else if(settings.buttonAlignment == 'center'){
					alignment = 'center';
				}
				$fs.find('.nl-navigation').css('text-align', alignment);
			});
			
			if(settings.stepBar){
				var steps = '<div id="form-steps"><ul>';
				for(i = 1; i <= global.nof; i++){
					steps += '<li '+(i == 1 ? "class='form-step-active'" : '')+' style="width:'+global.li_width+'px;"><div class="form-step-number">Step '+i+'</div>';
					if(settings.stepLabels.length > 0 && settings.stepLabels[(i-1)]){
						steps += '<div class="form-step-title">'+settings.stepLabels[(i-1)]+'</div>';
					} else {
						steps += '<div class="form-step-title">&nbsp;</div>';
					}
					steps += '</li>';
				}
				steps += '</ul></div>';
				$selector.prepend(steps);
			}
			
			if(settings.progressBar){
				$selector.prepend('<div id="form-progress"><div class="bar-status"><span id="bar-percent" style="width:0%;"><span class="progress"></span></span></div></div>');
			}
		});
	}
}(jQuery));
