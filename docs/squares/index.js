import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const u_unit_loops = [new Array(17)];
const s_unit_loops = [new Array(17), new Array(17)];
const u_loops      = [new Array( 4), new Array( 4)];
const s_loops      = [new Array( 4), new Array( 4)];
const touches      = [new Array( 4), new Array( 4)];

const p_frames = g.frames(i_p1);
const b_frames = g.frames(i_b1);
const g_frames = g.frames(i_g1);
for (let i = 0; i < 17; ++i) {
	u_unit_loops[i]    = g.loop(p_frames, 10, 0, i * 63);
	s_unit_loops[0][i] = g.loop(b_frames, 10, 0, i * 63);
	s_unit_loops[1][i] = g.loop(g_frames, 10, 0, i * 63);
}

s_loops[0][0] = g.loop(g.frames(i_p1 ), 10, 170, 880);
u_loops[0][0] = g.loop(g.frames(i_g1 ), 10, 170, 880);
s_loops[0][1] = g.loop(g.frames(i_p2 ), 10, 150, 610);
u_loops[0][1] = g.loop(g.frames(i_g2 ), 10, 150, 610);
s_loops[0][2] = g.loop(g.frames(i_p5 ), 10, 350, 605);
u_loops[0][2] = g.loop(g.frames(i_g5 ), 10, 350, 605);
s_loops[0][3] = g.loop(g.frames(i_p10), 10, 300, 800);
u_loops[0][3] = g.loop(g.frames(i_g10), 10, 300, 800);

s_loops[1][0] = g.loop(g.frames(i_p1 ), 10, 170, 330);
u_loops[1][0] = g.loop(g.frames(i_b1 ), 10, 170, 330);
s_loops[1][1] = g.loop(g.frames(i_p2 ), 10, 150,  70);
u_loops[1][1] = g.loop(g.frames(i_b2 ), 10, 150,  70);
s_loops[1][2] = g.loop(g.frames(i_p5 ), 10, 350,  60);
u_loops[1][2] = g.loop(g.frames(i_b5 ), 10, 350,  60);
s_loops[1][3] = g.loop(g.frames(i_p10), 10, 300, 250);
u_loops[1][3] = g.loop(g.frames(i_b10), 10, 300, 250);

const goto_doors = g.delay(.7).starts(g.from_to('squares', 'doors'));

const deselect = g.touch(g.rect(0, 0, 660, 1080));

touches[0][0] = g.touch(g.rect(175, 875, 250, 950));
touches[0][1] = g.touch(g.rect(155, 625, 265, 730));
touches[0][2] = g.touch(g.rect(355, 620, 500, 750));
touches[0][3] = g.touch(g.rect(315, 815, 525, 1015));

touches[1][0] = g.touch(g.rect(175, 875 - 550, 250, 950 - 550));
touches[1][1] = g.touch(g.rect(155, 625 - 540, 265, 730 - 540));
touches[1][2] = g.touch(g.rect(355, 620 - 545, 500, 750 - 545));
touches[1][3] = g.touch(g.rect(315, 815 - 550, 525, 1015 - 550));

const squares = [
	{ i: 0, cost: 1 , zone: 0, selected: false },
	{ i: 1, cost: 2 , zone: 0, selected: false },
	{ i: 2, cost: 5 , zone: 0, selected: false },
	{ i: 3, cost: 10, zone: 0, selected: false }
];
let zone = 0;
let units = 17;

const view = () => {
	let win = true;
	squares.forEach(o => win = o.zone === 0 ? false : win);
	g.stop_stop_sets(s_loops[0], s_loops[1], u_loops[0], u_loops[1], s_unit_loops[0], s_unit_loops[1], u_unit_loops);
	let selected_cost = 0;
	squares.forEach(o => selected_cost += o.selected ? o.cost : 0);
	for (let i = 0; i < units - selected_cost; ++i) {
		u_unit_loops[16 - i].start();
	}
	for (let i = units - selected_cost; i < units; ++i) {
		s_unit_loops[zone][16 - i].start();
	}
	squares.forEach((o, i) => {
		if (o.selected) {
			s_loops[o.zone][i].start(); 
		} else {
			u_loops[o.zone][i].start();
			if (o.zone === zone) {
				if (!win) touches[zone][i].start();
			}
		}
	});
	if (win) {
		goto_doors.start();
	} else {
		deselect.start();
	}
};

const reset = () => {
	squares.forEach(o => {
		o.zone = 0;
		o.selected = false;
	});
	zone = 0;
	units = 17;
};

touches.forEach((ts, z) => {
	ts.forEach((t, i) => {
		t.starts(() => {
			const self = squares[i];
			if (zone === 0) {
				let partner = null;
				for (let i = 0; i < 4; ++i) {
					if (squares[i].selected) partner = squares[i];
				}
				if (partner === null) {
					self.selected = true;
				} else if (partner.i > i) {
					units -= partner.cost;
					if (units < 0) {
						reset();
					} else {
						zone = 1 - zone;
						partner.selected = false;
						partner.zone = zone;
						self.zone = zone;
					}
				} else {
					partner.selected = false;
					self.selected = true;
				}
			} else {
				units -= self.cost;
				if (units < 0) {
					reset();
				} else {
					zone = 0;
					self.zone = zone;	
				}
			}
			view();
		});
	});
});

deselect.starts(() => {
	squares.forEach((o, i) => {
		o.selected = false;
	});
	view();
});

window.addEventListener('load', () => {
	view();
});
