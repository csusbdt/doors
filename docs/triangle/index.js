import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const left_closed    = g.loop(g.frames(i_left_closed), 10,   0,   0);
const left_opened    = g.loop(g.frames(i_left_opened), 10,   0,   0);
const left_opening   = g.once(g.frames([i_left_opening_1, i_left_opening_2, i_left_opening_3]), 11);
const left_closing   = g.once(g.frames([i_left_opening_3, i_left_opening_2, i_left_opening_1]), 11);

const left_open  = g.touch(g.circle(196, 548, 65));
const left_close = g.touch(g.circle(196, 548, 65));

const touches = () => {
	if (left_closed.started()) {
		left_open.start();
	} else {
		left_close.start();
	}
};

const win = () => {
	localStorage.setItem('doors.current_page', 'start');
	location.href = '../start';
};

left_opening.starts(left_opened, touches);
left_closing.starts(left_closed, touches);
left_open.stops(left_closed).starts(left_opening);
left_close.stops(left_opened).starts(left_closing);

window.addEventListener('load', e => {
	left_closed.start();
	touches();
});
