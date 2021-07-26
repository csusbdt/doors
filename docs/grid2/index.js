import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const b_loop = g.loop(g.frames(i_box));
const u_loop = g.loop(g.frames(i_u1));
const l_loop = g.loop(g.frames(i_l2));

const t = [ new Array(4), new Array(4) ];
for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		const x = 140 + c * 200;
		const y = 135 + r * 200;
		t[c][r] = g.touch(g.rect(x, y, x + 200, y + 200));
	}
}

bc = 0;
br = 0;
uc = 2;
ur = 0;
lc = 1;
lr = 3;

const can_move_down = () => {
	if (br === 3) return false;
	if (bc !== lc) return true;
	if (br === lr - 1) return false;
	if (br === lr && ur === lr - 1) return false;
	return true;
};

const can_move_up = () => {
	if (br === 0) return false;
	if (br === ur + 1) return false;
	if (br === lr + 1) return false;
	return true;
};

const can_move_left = () => {
	if (bc === 0) return false;
	if(br === ur + 1) return false;
	return true;
};

const can_move_right = () => {
	if (bc === 1) return false;
	if (br === ur && bc === uc - 1) return false;
	return true;
};

const move_down = () => {
	if (br === lr) ++lr;
	if (br === ur) ++ur;
	++br;
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
		g.delay(.5).starts(() => {
			b_loop.set_dx(-190);
		}).start();
		return;
	}
	if (exit_2()) {
		g.delay(.5).starts(() => {
			b_loop.set_dx(-190);
		}).start();
		return;
	}
	if (can_move_down() ) t(bc, br + 1).start();
	if (can_move_up()   ) t(bc, br - 1).start();
	if (can_move_left() ) t(bc - 1, br).start();
	if (can_move_right()) t(bc + 1, br).start();
};

const move_up = () => {
	if (br === lr) --lr;
	if (br === ur && br === lr) --ur;
	--br;
	view();
};

const move_left = () => {
	if (bc === uc) --uc;
	--bc;
	view();
};

const move_right = () => {
	if (bc === uc) ++uc;
	++bc;
	view();
};

const down = (c, r) => {
	return bc === c && br === r - 1;
}

const up = (c, r) => {
	return bc === c && br === r + 1;
}

const left = (c, r) => {
	return bc === c + 1 && br === r;
}

const right = (c, r) => {
	return bc === c - 1 && br === r;
}

for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		t[c][r].starts(() => {
			if (down(c, r)) move_down();
			else if (up(c, r)) move_up();
			else if (left(c, r)) move_left();
			else if (right(c, r)) move_right();
			else {
				throw new Error('logic error');
			}
		});
	}
}

window.addEventListener('load', () => {
	view();
});
