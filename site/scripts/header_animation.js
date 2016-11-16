/**
 * Header animation JavaScript
 * XYZ Desings
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors: Tal Reznic
 */

// create or use existing site scope
var Site = Site || {};

Site.Animation = function(element, element_stop) {
	var self = this;

	self.element = document.querySelector(element);
	self.element_stop_position = document.querySelector(element_stop).clientHeight;
	self.start = 0;
	self.rgb = {r: 35, g: 31, b: 32};

	self._init = function() {
		// handle window scroll event
		window.addEventListener('scroll', self.handle_scroll);
	}

	self.handle_scroll = function(event) {
		var scroll = window.scrollY;
		var alpha = null;

		if(scroll > self.element_stop_position) {
			alpha = 1;
		} else if(scroll < self.element_stop_position) {
			alpha = (scroll - self.start) / self.element_stop_position;
		}

		// set background color to element
		self.element.style.backgroundColor = 'rgba('+self.rgb.r+', '+self.rgb.g+', '+self.rgb.b+', '+alpha+')';
	}

	// finish object initialization
	self._init();
}

$(function() {
	var page = window.location.pathname;
	switch (page) {
		case "/":
				Site.animate_header = Site.Animation('header', 'div.slider');
			break;
		case "/products":
				Site.animate_header = Site.Animation('header', 'div.intro');
			break;
	}
})