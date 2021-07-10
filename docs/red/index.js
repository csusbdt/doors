import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const door_closed  = g.loop(g.frames(i_door_0));
const door_opening = g.once(g.frames(i_door_1, i_door_2));
const door_opened  = g.loop(g.frames(i_door_3));

const man_start    = g.loop(g.frames(i_man_0));
const man_walking  = g.once(g.frames(i_man_1, i_man_2, i_man_3, i_man_4, i_man_5, i_man_6, i_man_7));
const man_end      = g.loop(g.frames(i_man_8));
const head         = g.loop(g.frames(i_head));

const smoke        = g.loop(g.frames(i_smoke_0, i_smoke_1, i_smoke_2));

const sun_open     = g.loop(g.frames(i_sun_0));
const sun_closing  = g.once(g.frames(i_sun_1, i_sun_2, i_sun_3, i_blank));

const go_home = () => {
	localStorage.setItem('doors.current_page', 'home');
	location.replace('../');	
};

const door_open = g.touch(g.circle(473, 703, 60));
const sun_close = g.touch(g.circle(156, 330, 60));

window.addEventListener('load', () => {
	door_closed.start();
	smoke.start();
});
