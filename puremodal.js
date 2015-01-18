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

	var PureModal=(function() {
		var self = this,
			overlay = $('<div class="pm-overlay"><div class="pm-table"><div class="pm-row"><div class="pm-cell"><div class="pm-box"/></div></div></div></div>'),
			box = overlay.find('.pm-box'),
			body = $('body'),
			content = null,
			bodyOverflow = '';

		// Init
		overlay.find('.pm-cell').bind('click', close);

		function open(cont){
			cont = cont || content;
			content = cont;
			box.append(content);
			bodyOverflow = body.css('overflow');
			body.append(overlay).css('overflow', 'hidden');
		}
		function close(e){
			if(box.has(e.target).length===0){
				overlay.detach();
				body.css('overflow', bodyOverflow);
			}
		}
		function resize(w, h){
			w = typeof w === 'undefined' || w === null || w === false ? '' : w;
			h = typeof h === 'undefined' || h === null || h === false ? '' : h;
			box.css({width:w, height:h});
		}

		return {
			open:open,
			close:close,
			resize:resize,
			getContent:function(){return content;}
		}
	})();

	PureModal.DEFAULTS = {};
	window.PureModal=PureModal;

	function pmLink(ele) {
		var self = this,
			ele = $(ele),
			content = null,
			options = {};

		// Init
		content = ele.attr('data-pm-content') || ele.attr('href');
		content = $(content).length > 0 ? $($(content)[0]) : null;
		ele.click(function(){ return self.open();});

		this.open=function(){
			if(!content) {return true;}
			PureModal.open(content);
			return false;
		};
	}

	$.fn.PureModal = function (option) {
		return this.each(function () {
			var $this	= $(this),
				data	= $this.data('PureModal'),
				options	= $.extend({}, PureModal.DEFAULTS, $this.data(), typeof option == 'object' && option)

			if (!data) {
				$this.data('PureModal', (data = new pmLink(this, options)));
			}
		});
	};

	$.fn.PureModal.Constructor = PureModal;

}(window.jQuery);