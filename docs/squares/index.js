import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const p1        = g.loop(g.frames(i_p1 ), 10, 0, 0);

const p1_upper  = g.loop(g.frames(i_p1 ), 10, 170, 330);
const b1_upper  = g.loop(g.frames(i_b1 ), 10, 170, 330);

const p2_upper  = g.loop(g.frames(i_p2 ), 10, 150,  70);
const b2_upper  = g.loop(g.frames(i_b2 ), 10, 150,  70);

const p5_upper  = g.loop(g.frames(i_p5 ), 10, 350,  60);
const b5_upper  = g.loop(g.frames(i_b5 ), 10, 350,  60);

const p10_upper = g.loop(g.frames(i_p10), 10, 300, 250);
const b10_upper = g.loop(g.frames(i_b10), 10, 300, 250);


const p1_lower  = g.loop(g.frames(i_p1 ), 10, 170, 880);
const g1_lower  = g.loop(g.frames(i_g1 ), 10, 170, 880);

const p2_lower  = g.loop(g.frames(i_p2 ), 10, 150, 610);
const g2_lower  = g.loop(g.frames(i_g2 ), 10, 150, 610);

const p5_lower  = g.loop(g.frames(i_p5 ), 10, 350, 605);
const g5_lower  = g.loop(g.frames(i_g5 ), 10, 350, 605);

const p10_lower = g.loop(g.frames(i_p10), 10, 300, 800);
const g10_lower = g.loop(g.frames(i_g10), 10, 300, 800);



const budget = new Array(17);

for (let i = 0; i < budget.length; ++i) {
	budget[i] = g.loop(g.frames(i_p1), 10, 0, i * 63);
}

const deselect = g.touch(g.rect(0, 0, 660, 1080));
const g1_lower_select  = g.touch(g.rect(175, 875, 250, 950));
const g2_lower_select  = g.touch(g.rect(155, 625, 265, 730));
const g5_lower_select  = g.touch(g.rect(355, 620, 500, 750));
const g10_lower_select = g.touch(g.rect(315, 815, 525, 1015));

const b1_upper_select  = g.touch(g.rect(175, 875 - 550, 250, 950 - 550));
const b2_upper_select  = g.touch(g.rect(155, 625 - 540, 265, 730 - 540));
const b5_upper_select  = g.touch(g.rect(355, 620 - 545, 500, 750 - 545));
const b10_upper_select = g.touch(g.rect(315, 815 - 550, 525, 1015 - 550));

const g1_lower_f = () => {

};


g1_lower_select.stops(g1_lower).starts(p1_lower, deselect);
g2_lower_select.stops(g2_lower).starts(p2_lower, deselect);
g5_lower_select.stops(g5_lower).starts(p5_lower, deselect);
g10_lower_select.stops(g10_lower).starts(p10_lower, deselect);

b1_upper_select.stops(b1_upper).starts(p1_upper, deselect);
b2_upper_select.stops(b2_upper).starts(p2_upper, deselect);
b5_upper_select.stops(b5_upper).starts(p5_upper, deselect);
b10_upper_select.stops(b10_upper).starts(p10_upper, deselect);


deselect.stops(p1_lower, p2_lower, p5_lower, p10_lower).starts(g1_lower, g2_lower, g5_lower, g10_lower, g1_lower_select, g2_lower_select, g5_lower_select, g10_lower_select);
deselect.stops(p1_upper, p2_upper, p5_upper, p10_upper).starts(b1_upper, b2_upper, b5_upper, b10_upper, b1_upper_select, b2_upper_select, b5_upper_select, b10_upper_select);

window.addEventListener('load', () => {
	budget.forEach(o => o.start());
	g1_lower.start();
	g2_lower.start();
	g5_lower.start();
	g10_lower.start();

	b1_upper.start();
	b2_upper.start();
	b5_upper.start();
	b10_upper.start();

	g1_lower_select.start();
	g2_lower_select.start();
	g5_lower_select.start();
	g10_lower_select.start();

	b1_upper_select.start();
	b2_upper_select.start();
	b5_upper_select.start();
	b10_upper_select.start();
});
