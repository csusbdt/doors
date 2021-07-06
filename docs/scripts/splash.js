import g from '../canvasapp.js';

const splash_loop_frames      = g.frames([i_splash]);
const fullscreen_loop_frames  = g.frames([i_fullscreen]);

const splash_loop             = g.loop(splash_loop_frames, 11);
const fullscreen_loop         = g.loop(fullscreen_loop_frames, 11);

const splash_fullscreen_touch = g.touch([g.circle(642, 360, 290)]).make_independent();
const splash_windowed_touch   = g.touch([g.rect(0, 0, 1920, 720)]).make_independent();
const fullscreen_touch        = g.touch([g.circle(1210, 73, 50)]).make_independent();

function start_fullscreen() {
	fullscreen_loop.start();
	fullscreen_touch.start();
}

function stop_fullscreen() {
	fullscreen_loop.stop();
	fullscreen_touch.stop();
}

g.set_on_fullscreen(stop_fullscreen);
g.set_on_windowed(start_fullscreen);

splash_fullscreen_touch.stops(splash_loop, splash_windowed_touch);
splash_windowed_touch.stops(splash_loop, splash_fullscreen_touch);
fullscreen_touch.stops(fullscreen_loop);

splash_fullscreen_touch.starts(s_tick, g.request_fullscreen);
splash_windowed_touch.starts(s_tick, start_fullscreen);
fullscreen_touch.starts(s_tick, g.request_fullscreen);

function start_splash(...start_set) {
	if (g.fullscreen_enabled()) {
		splash_loop.start();
		splash_fullscreen_touch.start();
		splash_windowed_touch.start();
		start_set.forEach(o => {
			splash_fullscreen_touch.starts(o);
			splash_windowed_touch.starts(o);	
		});
	} else {
		g.start(start_set);
	}
}

export default start_splash;
