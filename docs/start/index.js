import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const circle11       = g.loop(g.frames(i_circle), 10,   0, 0);
const square12       = g.loop(g.frames(i_square), 10, 337, 8);

const door11_closed  = g.loop(g.frames(i_door11_0));
const door12_closed  = g.loop(g.frames(i_door12_0));
const door21_closed  = g.loop(g.frames(i_door21_0));
const door22_closed  = g.loop(g.frames(i_door22_0));
const door31_closed  = g.loop(g.frames(i_door31_0));
const door32_closed  = g.loop(g.frames(i_door32_0));

const door11_opened  = g.loop(g.frames(i_door11_3));
const door12_opened  = g.loop(g.frames(i_door12_3));
const door21_opened  = g.loop(g.frames(i_door21_3));
const door22_opened  = g.loop(g.frames(i_door22_3));
const door31_opened  = g.loop(g.frames(i_door31_3));
const door32_opened  = g.loop(g.frames(i_door32_3));

const door11_opening = g.once(g.frames([i_door11_1, i_door11_2]), 11);
const door12_opening = g.once(g.frames([i_door12_1, i_door12_2]), 11);
const door21_opening = g.once(g.frames([i_door21_1, i_door21_2]), 11);
const door22_opening = g.once(g.frames([i_door22_1, i_door22_2]), 11);
const door31_opening = g.once(g.frames([i_door31_1, i_door31_2]), 11);
const door32_opening = g.once(g.frames([i_door32_1, i_door32_2]), 11);

const door11_closing = g.once(g.frames([i_door11_2, i_door11_1]), 11);
const door12_closing = g.once(g.frames([i_door12_2, i_door12_1]), 11);
const door21_closing = g.once(g.frames([i_door21_2, i_door21_1]), 11);
const door22_closing = g.once(g.frames([i_door22_2, i_door22_1]), 11);
const door31_closing = g.once(g.frames([i_door31_2, i_door31_1]), 11);
const door32_closing = g.once(g.frames([i_door32_2, i_door32_1]), 11);

const door11_open    = g.touch(g.rect(60, 100, 212, 254));
const door12_open    = g.touch(g.rect(405, 100, 556, 247));
const door21_open    = g.touch(g.rect(76, 444, 265, 618));
const door22_open    = g.touch(g.rect(380, 438, 562, 634));
const door31_open    = g.touch(g.rect(80, 800, 288, 966));
const door32_open    = g.touch(g.rect(380, 793, 572, 960));

const door11_close   = g.touch(g.rect( 0, 100, 100, 330));
const door12_close   = g.touch(g.rect( 342, 103, 417, 320));
const door21_close   = g.touch(g.rect( 0, 444, 108, 706));
const door22_close   = g.touch(g.rect( 340, 434, 440, 700));
const door31_close   = g.touch(g.rect( 0, 803, 122, 964));
const door32_close   = g.touch(g.rect( 344, 793, 440, 1030));

const touches = () => {
	if (door11_closed.started()) {
		door11_open.start();
	} else {
		door11_close.start();
	}
	if (door12_closed.started()) {
		door12_open.start();
	} else {
		door12_close.start();
	}
	if (door21_closed.started()) {
		door21_open.start();
	} else {
		door21_close.start();
	}
	if (door22_closed.started()) {
		door22_open.start();
	} else {
		door22_close.start();
	}
	if (door31_closed.started()) {
		door31_open.start();
	} else {
		door31_close.start();
	}
	if (door32_closed.started()) {
		door32_open.start();
	} else {
		door32_close.start();
	}
};

door11_opening.starts(door11_opened, touches);
door12_opening.starts(door12_opened, touches);
door21_opening.starts(door21_opened, touches);
door22_opening.starts(door22_opened, touches);
door31_opening.starts(door31_opened, touches);
door32_opening.starts(door32_opened, touches);

door11_closing.stops(circle11).starts(door11_closed, touches);
door12_closing.stops(square12).starts(door12_closed, touches);
door21_closing.starts(door21_closed, touches);
door22_closing.starts(door22_closed, touches);
door31_closing.starts(door31_closed, touches);
door32_closing.starts(door32_closed, touches);

door11_open.stops(door11_closed).starts(door11_opening, circle11);
door12_open.stops(door12_closed).starts(door12_opening, square12);
door21_open.stops(door21_closed).starts(door21_opening);
door22_open.stops(door22_closed).starts(door22_opening);
door31_open.stops(door31_closed).starts(door31_opening);
door32_open.stops(door32_closed).starts(door32_opening);

door11_close.stops(door11_opened).starts(door11_closing);
door12_close.stops(door12_opened).starts(door12_closing);
door21_close.stops(door21_opened).starts(door21_closing);
door22_close.stops(door22_opened).starts(door22_closing);
door31_close.stops(door31_opened).starts(door31_closing);
door32_close.stops(door32_opened).starts(door32_closing);

window.addEventListener('load', e => {
	door11_closed.start();
	door12_closed.start();
	door21_closed.start();
	door22_closed.start();
	door31_closed.start();
	door32_closed.start();

	touches();
});
