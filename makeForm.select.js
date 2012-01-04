/**
 * jQuery makeForm Plugin
 *
 * @version: 1.1
 * @author S A Faruque [safaruque1@gmail.com | http://pranjol.com]
 */

(function($) {

	$.fn.makeForm = function(options, callback) {
		options = $.extend({
			render : function(option) {
				return $('<li>' + option.text() + '</li>');
			},
			className : ''
		}, options);

		return this.each(function() {

			var select = $(this);
			var selectBoxContainer = $('<div class="mfContainer"><div class="selectBox"></div></div>');
			var dropDown = $('<ul class="dropDown"></ul>');
			var selectBox = selectBoxContainer.find('.selectBox');
			var dropDownForm = $('<div class="dropDownForm"></div>');
			var comment = $('<textarea rows="2" cols="20" class="comment"></textarea>');
			var submitStatus = $('<input class="submitStatus" type="submit" value="Submit" />');
			submitStatus.click(function() {
				if(typeof callback == "function"){
					$result = callback.call(this, comment.val(), $("option:selected",select).text());
				} else {
					dropDownForm.trigger('hide');
				}

				if($result == true) {
					dropDownForm.trigger('hide');
				} else {
					alert('Callback function returns false. Please try again');
				}

				return false;
			});
			
			if(options.className) {
				dropDown.addClass(options.className);
			}

			select.find('option').each(function(i) {
				var option = $(this);

				if(i == select.attr('selectedIndex')) {
					selectBox.html(option.text());
				}

				var li = options.render(option);

				li.click(function() {
					selectBox.html(option.text());
					$(this).siblings().removeClass("selected");
					$(this).addClass("selected");

					select.val(option.val());
					return false;
				});

				dropDown.append(li);
			});
			
			//preaparing the form with ul, textarea and submit button
			dropDownForm.append(dropDown).append(comment).append(submitStatus);

			selectBoxContainer.append(dropDownForm.hide());
			select.hide().after(selectBoxContainer);

			dropDownForm.bind('show', function() {

				if(dropDownForm.is(':animated')) {
					return false;
				}

				selectBox.addClass('expanded');
				dropDownForm.slideDown();

			}).bind('hide', function() {

				if(dropDownForm.is(':animated')) {
					return false;
				}

				selectBox.removeClass('expanded');
				dropDownForm.slideUp();

			}).bind('toggle', function() {
				if(selectBox.hasClass('expanded')) {
					dropDownForm.trigger('hide');
				} else
					dropDownForm.trigger('show');
			});

			selectBox.click(function() {
				dropDownForm.trigger('toggle');
				return false;
			});
		});
	}
})(jQuery);
