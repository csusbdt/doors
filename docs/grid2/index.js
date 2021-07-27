import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const b_loop      = g.loop(g.frames(i_box   ));
const u_loop      = g.loop(g.frames(i_u1    ));
const l_loop      = g.loop(g.frames(i_l2    ));
const exit02_loop = g.loop(g.frames(i_exit02));
const exit03_loop = g.loop(g.frames(i_exit03));

const t = [ new Array(4), new Array(4) ];
for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		const x = 140 + c * 200;
		const y = 135 + r * 200;
		t[c][r] = g.touch(g.rect(x, y, x + 200, y + 200));
	}
}

let bc = 0;
let br = 0;
let uc = 0;
let ur = 2;
let lc = 1;
let lr = 3;

const can_move_down = () => {
	if (br === 3) return false;
	if (bc === lc && br === lr - 1) return false;
	if (bc === lc && br === lr && bc === uc && br === ur - 1) return false;
	return true;
};

const can_move_up = () => {
	if (br === 0) return false;
	if (bc === uc && br === ur + 1) return false;
	if (bc === lc && br === lr + 1) return false;
	return true;
};

const can_move_left = () => {
	if (bc === 0) return false;
	if (br === ur && bc === uc + 1) return false;
	return true;
};

const can_move_right = () => {
	if (bc === 1) return false;
	if (br === ur && bc === uc - 1) return false;
	return true;
};

const exit_1 = () => {
	return bc === 0 && br === 2 && (uc !== 0 || ur !== 2);
};

const exit_2 = () => {
	return bc === 0 && br === 3 && (uc !== 0 || ur !== 3);
};

const view = () => {
	b_loop.set_dx(bc * 200);
	b_loop.set_dy(br * 200);
	u_loop.set_dx(uc * 200);
	u_loop.set_dy(ur * 200);
	l_loop.set_dx(lc * 200);
	l_loop.set_dy(lr * 200);

	if (exit_1()) {
		g.set_page_state('exit02');
		g.delay(.5).stops(exit02_loop).starts(
			g.delay(.5).starts(g.goto('grid1')),
			() => b_loop.set_dx(-190)
		).start();
		return;
	}
	if (exit_2()) {
		g.set_page_state('exit03');
		g.delay(.5).stops(exit03_loop).starts(
			g.delay(.5).starts(g.goto('s1')),
			() => b_loop.set_dx(-190)
		).start();
		return;
	}
	if (can_move_down() ) t[bc][br + 1].start();
	if (can_move_up()   ) t[bc][br - 1].start();
	if (can_move_left() ) t[bc - 1][br].start();
	if (can_move_right()) t[bc + 1][br].start();
};

const move_down = () => {
	if (bc === lc && br === lr) ++lr;
	if (bc === uc && br === ur) ++ur;
	++br;
	view();
};

const move_up = () => {
	if (bc === lc && br === lr) {
		if (bc === uc && br === ur) --ur;
		--lr;
	}
	--br;
	view();
};

const move_left = () => {
	if (bc === uc && br === ur) --uc;
	--bc;
	view();
};

const move_right = () => {
	if (bc === uc && br === ur) ++uc;
	++bc;
	view();
};

// const down = (c, r) => {
// 	return bc === c && br === r - 1;
// }

// const up = (c, r) => {
// 	return bc === c && br === r + 1;
// }

// const left = (c, r) => {
// 	return bc === c + 1 && br === r;
// }

// const right = (c, r) => {
// 	return bc === c - 1 && br === r;
// }

for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		t[c][r].starts(() => {
			if (bc === c && br === r - 1) move_down();
			else if (bc === c && br === r + 1) move_up();
			else if (bc === c + 1 && br === r) move_left();
			else if (bc === c - 1 && br === r) move_right();
			else {
				throw new Error('logic error');
			}
		});
	}
}

window.addEventListener('load', () => {
	b_loop.start();
	u_loop.start();
	l_loop.start();
	if (g.get_page_state('exit02')) exit02_loop.start();
	if (g.get_page_state('exit03')) exit03_loop.start();
	view();
});
