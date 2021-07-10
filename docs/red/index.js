import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const door_closed  = g.loop(g.frames(i_door_0));
const door_opening = g.once(g.frames([i_door_1, i_door_2]), 11);
const door_opened  = g.loop(g.frames(i_door_3));

const man_start    = g.loop(g.frames(i_man_0));
const man_walking  = g.once(g.frames([i_man_1, i_man_2, i_man_3, i_man_4, i_man_5, i_man_6, i_man_7], 1/5));
const man_end      = g.loop(g.frames(i_man_8));
const head         = g.loop(g.frames(i_head));

const smoke        = g.loop(g.frames([i_smoke_0, i_smoke_1, i_smoke_2], 1/5));

const sun_opened   = g.loop(g.frames(i_sun_0));
const sun_closing  = g.once(g.frames([i_sun_1, i_sun_2, i_sun_3, i_blank]));

const go_home = () => {
	localStorage.setItem('doors.current_page', 'home');
	location.replace('../../');	
};

const door_open = g.touch(g.circle(473, 703, 60));
const sun_close = g.touch(g.circle(156, 330, 60));

door_open.stops(door_closed).starts(man_start, door_opening);
door_opening.starts(door_opened, g.delay(1).stops(smoke), g.delay(1.6).stops(man_start).starts(man_walking));
man_walking.starts(man_end, g.delay(1.2).starts(head, sun_close));
sun_close.stops(sun_opened).starts(sun_closing);
sun_closing.starts(go_home);

window.addEventListener('load', () => {
	door_closed.start();
	smoke.start();
	sun_opened.start();
	door_open.start();
});
