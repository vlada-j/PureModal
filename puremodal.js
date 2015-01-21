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
			type = '',
			overlay = $('<div class="pm-overlay"><div class="pm-table"><div class="pm-row"><div class="pm-cell"><div class="pm-box"/></div></div></div></div>'),
			box = overlay.find('.pm-box'),
			body = $('body'),
			content = null,
			bodyOverflow = '';

		// Init
		overlay.find('.pm-cell').bind('click', close);

		function open(cont){
			setContent(cont);
			box.append(content);
			bodyOverflow = body.css('overflow');
			body.append(overlay).css('overflow', 'hidden');
			return self;
		}
		function close(e){
			if(box.has(e.target).length===0){
				overlay.detach();
				body.css('overflow', bodyOverflow);
			}
			return self;
		}
		function resize(w, h){
			w = typeof w === 'undefined' || w === null || w === false ? '' : w;
			h = typeof h === 'undefined' || h === null || h === false ? '' : h;
			box.css({width:w, height:h});
			return self;
		}
		function setContent(cont){
			cont = cont || content;
			clear();
			content = cont;
			return self;
		}
		function clear(){
			box.empty();
			content = null;
			return self;
		}
		function load(param){
			$.ajax(param).done(function(r){
				content = r;
				open(content);
			});
			return self;
		}
		function gallery(collection){
			
			return self;
		}

		return {
			load:load,
			open:open,
			close:close,
			gallery:gallery,
			resize:resize,
			setContent:setContent,
			clear:clear,
			getContent:function(){return content;}
		}
	})();

	PureModal.DEFAULTS = {};
	window.PureModal=PureModal;

	function pmLink(ele) {
		var self = this,
			url = null,
			content = null,
			gallery = [],
			options = {};

		// Init
		ele = $(ele);
		options = ele.attr('data-puremodal');
		content = ele.attr('data-pm-content');
		url = ele.attr('data-pm-url');
		gallery = ele.attr('data-pm-gallery');
		$(content).length > 0 ? content = $($(content)[0]) : null;
		ele.click(function(){ return self.open();});
		ele.attr('href', 'javascript:false;');
		this.open=function(){
			if(url) {
				PureModal.load({url:url});
				return false;}
			if(content) {
				PureModal.open(content);
				return false;}
			return true;
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