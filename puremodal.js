/*
 * jQuery PureModal v1.0
 * https://github.com/vlada-j/PureModal
 *
 * Copyright 2014, Vlada Janosevic
 * http://www.vladajanosevic.info/
 * Free to use and change
 *
 * Required: jQuery 1.11.1
 */
+function ($) {
	"use strict";

	function PureModal(ele, option){
		var cont = $(ele),
			panels = cont.children(),
			headers = panels.children('.ac-header'),
			contents = panels.children('.ac-content');

		cont.addClass('accordion');
		panels.addClass('ac-panel');
		headers.click(function() {
			panels.removeClass('open');
			contents.css('height','');
			var _he=$(this), _pa=_he.parent(), _co=_pa.children('.ac-content');
			_pa.addClass('open');
			_co.css('height', _co[0].scrollHeight+'px')
		});
	}

	PureModal.DEFAULTS = {};

	$.fn.PureModal = function (option) {
		return this.each(function () {
			var $this	= $(this),
				data	= $this.data('PureModal'),
				options	= $.extend({}, PureModal.DEFAULTS, $this.data(), typeof option == 'object' && option)

			if (!data) {
				$this.data('PureModal', (data = new PureModal(this, options)));
			}
		});
	};

	$.fn.PureModal.Constructor = PureModal;

}(window.jQuery);


function PureModal(ele, options) {
	var overlay = $('<div class="pm-overlay"><div class="pm-table"><div class="pm-row"><div class="pm-cell"><div class="pm-box"/></div></div></div></div>'),
		box = overlay.find('.pm-box'),
		body = $('body'),
		content = ele,
		bodyOverflow = '';

	box.append(content);
	bodyOverflow = body.css('overflow');
	body.append(overlay).css('overflow', 'hidden');
}