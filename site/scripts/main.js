/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile())
		Site.mobile_menu = new Caracal.MobileMenu();

	Site.lightbox_clients = new LightBox('section.clients a.lightbox', false, false, true);

	// create controls for home page sliders
	var sliders = document.querySelectorAll('div.slide');
	var controls_container = document.querySelector('div.controls');
	for(var i = 0; i < sliders.length; i++) {
		var control = document.createElement('a');
		control.setAttribute('href', 'javascript:void(0)');
		control.classList.add('control');
		controls_container.appendChild(control);
	}

	Site.slider = new PageControl('div.slider', 'div.slide');
	Site.slider
		.setInterval(6000)
		.attachControls('div.controls a')
		.setWrapAround(true);

};


// connect document `load` event with handler function
$(Site.on_load);
