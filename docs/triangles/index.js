import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const state = g.get_state();

const a_frames = g.frames(i_a);
const b_frames = g.frames(i_b);

const reset_opened  = g.loop(g.frames(i_reset_0));
const reset_closing = g.once(g.frames([i_reset_1, i_reset_2, i_reset_3, i_blank]));

const ok_opened  = g.loop(g.frames(i_ok_0));
const ok_closing = g.once(g.frames([i_ok_1, i_ok_2, i_blank]));

const reset_close = g.touch(g.rect(70, 100, 600, 650));
const ok_close    = g.touch(g.rect(125, 800, 483, 985));

reset_close.stops(reset_opened).starts(reset_closing);
ok_close.stops(ok_opened).starts(ok_closing);

ok_closing.starts(g.goto('doors'));

const view = () => {
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
};

reset_closing.starts(view);

window.addEventListener('load', () => {
	let num_visited = 0;
	for (let i = 0; i < state.visited.length; ++i) {
		if (state.visited[i]) ++num_visited;
	}
	if (num_visited === 1) {
		reset_opened.start();
		reset_close.start();	
	} else {
		view();
	}
});
