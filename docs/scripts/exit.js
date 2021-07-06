import g from '../canvasapp.js';

const exit_loop_frames    = g.frames([i_exit]);
const exit_opening_frames = g.frames([i_exit_2, i_exit_1]);
const exit_closing_frames = g.frames([i_exit_1, i_exit_2]);

const exit_loop        = g.loop(exit_loop_frames, 10);

const exit_opening     = g.once(exit_opening_frames, 10);
const exit_closing     = g.once(exit_closing_frames, 10);

const exit_touch       = g.touch(g.rect(0, 0, 222, 126)).make_independent();

exit_opening.starts(exit_loop, exit_touch);
exit_closing.starts(g.delay(.01).starts(
	() => window.location.assign('https://github.com/csusbdt/canvasapp/blob/main/README.md')
));

exit_touch.stops(exit_loop);

exit_touch.starts(s_blop, exit_closing);

function start_exit() {
	exit_opening.start();
}

export default start_exit;
