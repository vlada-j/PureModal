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
			btnPre = $('<div class="pm-arrow previous">◄</div>'),
			btnNex = $('<div class="pm-arrow next">►</div>'),
			content = null,
			bodyOverflow = '',
			collection = [],
			current = 0;

		// Init
		overlay.find('.pm-cell').bind('click', close);
		btnPre.hide().bind('click', previous);
		btnNex.hide().bind('click', next);
		overlay.append(btnPre, btnNex);

		function open(cont){
			setContent(cont);
			bodyOverflow = body.css('overflow');
			body.append(overlay).css('overflow', 'hidden');
			return self;
		}
		function close(e){
			if(box.has(e.target).length===0){
				overlay.detach();
				btnPre.hide();
				btnNex.hide();
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
			box.append(content);
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
		function gallery(collect, index){
			collection = collect;
			current = index || current;
			open(collection[current]);
			btnPre.show();
			btnNex.show();
			return self;
		}
		function next(){
			current+=1;
			current = current===collection.length?0:current;
			setContent(collection[current]);
			return self;
		}
		function previous(){
			current-=1;
			current = current<0?collection.length-1:current;
			setContent(collection[current]);
			return self;
		}

		return {
			load:load,
			open:open,
			close:close,
			gallery:gallery,
			previous:previous,
			next:next,
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
			if(gallery==='') {
				var col=[];
				ele.children('a').each(function(){col.push('<img src="'+this.href+'">');});
				PureModal.gallery(col);
				return false;}
			return true;
		};
	}

	$.fn.PureModal = function (option) {
		return this.each(function () {
			var $this	= $(this),
				data	= $this.data('PureModal'),
				options	= $.extend({}, PureModal.DEFAULTS, $this.data(), typeof option == 'object' && option);

			if (!data) {
				$this.data('PureModal', (data = new pmLink(this, options)));
			}
		});
	};

	$.fn.PureModal.Constructor = PureModal;

}(window.jQuery);