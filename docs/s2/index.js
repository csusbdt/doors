import g from '../canvasapp.js';

g.set_design_size(668, 1080);
g.init_score(0);

const stub_opened  = g.loop(g.frames(i_stub_0));
const stub_closing = g.once(g.frames([i_stub_1, i_stub_2, i_stub_3, i_blank]));

const stub_close   = g.touch(g.circle(330, 480, 250));

stub_close.stops(stub_opened).starts(stub_closing);

stub_closing.starts(g.goto('doors'));

window.addEventListener('load', () => {
	stub_opened.start();
	stub_close.start();
});
