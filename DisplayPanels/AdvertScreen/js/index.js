// Use the global for background
var pattern = GeoPattern.generate('trt');
$('html').css('background-image', pattern.toDataUrl());

// animate text on screen
$(function () {
	$('.tlt').textillate({
		in: { effect: 'tada' },
		out: { effect: 'flash', sync: true },
		loop: true
	});
});

// animate text on logo
$(function () {
	$('.tltCoffee').textillate({
		initialDelay: 1000,
		in: { effect: 'wobble', sync: true, delay: 2000, },
		out: { effect: 'flip', sync: true, delay: 2000, },
		loop: true
	});
});