import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const green_car_opened  = g.loop(g.frames(i_green_car_0));
const car_opened        = g.loop(g.frames(i_car_0));

const green_car_closing = g.once(g.frames([i_green_car_1, i_green_car_2, i_blank]));
const car_opening       = g.once(g.frames([i_car_3, i_car_2, i_car_1]));
const car_closing       = g.once(g.frames([i_car_1, i_car_2, i_car_3]));

const green_car_close = g.touch(g.rect(150, 130, 470, 330));
const goto_doors      = g.touch(g.rect(0, 0, 668, 1080));

green_car_close.stops(green_car_opened).starts(green_car_closing);
green_car_closing.starts(car_opening);
car_opening.starts(car_opened, goto_doors);

goto_doors.stops(car_opened).starts(car_closing);
car_closing.starts(g.goto('doors'));

window.addEventListener('load', () => {
	green_car_opened.start();
	green_car_close.start();
});
