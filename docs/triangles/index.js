import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const state = g.get_state();

const a_frames = g.frames(i_a);
const b_frames = g.frames(i_b);

const ok_opened  = g.loop(g.frames(i_ok_0));
const ok_closing = g.once(g.frames([i_ok_1, i_ok_2, i_blank]));

const ok_close   = g.touch(g.rect(125, 800, 483, 985));

ok_close.stops(ok_opened).starts(ok_closing);

ok_closing.starts(g.goto('doors'));

window.addEventListener('load', () => {
	let row = 0;
	let col = 0;
	for (let i = 0; i < state.visited.length; ++i) {
		g.loop(a_frames, 10, col * 120, row * 120).start();
		if (state.visited[i]) {
			g.loop(b_frames, 10, col * 120, row * 120).start();
		}
		if (++col > 4) {
			++row;
			col = 0;
		}
	}
	ok_opened.start();
	ok_close.start();
});
