import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const square = g.loop(g.frames(i_square));

const t = g.touch(g.rect(104, 138, 183, 235));

// t.starts(() => {
// 	localStorage.setItem(doors.current_page, 'doors');
// 	location.replace('../');
// });

t.starts(g.goto('doors'));

window.addEventListener('load', () => {
	square.start();
	t.start();
});
