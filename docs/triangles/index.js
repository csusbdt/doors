import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const counts = [
	g.loop(g.frames(i_1)),
	g.loop(g.frames(i_2)),
	g.loop(g.frames(i_3)),
	g.loop(g.frames(i_4)),
	g.loop(g.frames(i_5)),
	g.loop(g.frames(i_6))
];

const ok_opened  = g.loop(g.frames(i_ok_0));
const ok_closing = g.once(g.frames([i_ok_1, i_ok_2, i_blank]));

const ok_close   = g.touch(g.rect(125, 800, 483, 985));

ok_close.stops(ok_opened).starts(ok_closing);

ok_closing.starts(g.from_to('triangles', 'doors'));

window.addEventListener('load', () => {
	const completed_string = localStorage.getItem('doors.completed');
	const completed = completed_string.split(',');
	if (!completed.includes('triangles')) {
		completed.push('triangles');
		localStorage.setItem('doors.completed', completed.join());
	}
	if (completed.length <= counts.length) {
		counts[completed.length - 1].start();
	}
	ok_opened.start();
	ok_close.start();
});
