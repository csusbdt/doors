import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const r1s = g.loop(g.frames(i_1rs), 11,   0,   0);
const r1u = g.loop(g.frames(i_1ru), 11,   0,   0);
const w1  = g.loop(g.frames(i_1w ), 10,   0,   0);

const r2s = g.loop(g.frames(i_2rs), 11,   0,   0);
const r2u = g.loop(g.frames(i_2ru), 11,   0,   0);
const w2  = g.loop(g.frames(i_2w ), 10,   0,   0);

const c1 = g.circle(350,  97, 70);
const c2 = g.circle(350, 261, 70);
const c3 = g.circle(344, 410, 70);
const c4 = g.circle(346, 550, 70);
const c5 = g.circle(336, 704, 70);
const c6 = g.circle(330, 845, 70);
const c7 = g.circle(328, 987, 70);

const u   = g.touch(g.rect(0, 0, 668, 1080));
const sr1 = g.touch(c1);
const tr2 = g.touch(c2);

sr1.stops(r1u).starts(r1s, tr2);
tr2.stops(r1s).starts(r2u);

const touches = () => {
	// if (w2.started() && r1u.started()) {
	// 	left_open.start();
	// } else {
	// 	left_close.start();
	// }
};

const win = () => {
	localStorage.setItem('doors.current_page', 'start');
	location.href = '../start';
};

window.addEventListener('load', e => {
	w1.start();
	w2.start();
	r1u.start();
	sr1.start();
	touches();
});
