import g from '../canvasapp.js';

let bc = 0;
let br = 0;
let uc = 0;
let ur = 1;
let lc = 1;
let lr = 2;

g.set_design_size(668, 1080);

const b_loop     = g.loop(g.frames(i_box ));
const u_loop     = g.loop(g.frames(i_u1  ));
const l_loop     = g.loop(g.frames(i_l2  ));
const exit1_loop = g.loop(g.frames(i_exit), 10, 0, 200);
const exit2_loop = g.loop(g.frames(i_exit), 10, 0, 400);

const spf = 1/24;

const b_left_frames  = [];
const b_right_frames = [];
const b_down_frames  = [];
const b_up_frames    = [];

const u_left_frames  = [];
const u_right_frames = [];
const u_down_frames  = [];
const u_up_frames    = [];

const l_left_frames  = [];
const l_right_frames = [];
const l_down_frames  = [];
const l_up_frames    = [];

const n = 5;
for (let i = 0; i < n; ++i) {
	const d = i * 200 / (n + 1);
	b_left_frames.push(g.frame(i_box, spf, -d, 0));
	b_right_frames.push(g.frame(i_box, spf, d, 0));
	b_down_frames.push(g.frame(i_box, spf, 0, d));
	b_up_frames.push(g.frame(i_box, spf, 0, -d));

	u_left_frames.push(g.frame(i_u1, spf, -d, 0));
	u_right_frames.push(g.frame(i_u1, spf, d, 0));
	u_down_frames.push(g.frame(i_u1, spf, 0, d));
	u_up_frames.push(g.frame(i_u1, spf, 0, -d));

	l_left_frames.push(g.frame(i_l2, spf, -d, 0));
	l_right_frames.push(g.frame(i_l2, spf, d, 0));
	l_down_frames.push(g.frame(i_l2, spf, 0, d));
	l_up_frames.push(g.frame(i_l2, spf, 0, -d));
}

const b_left   = g.once(b_left_frames);
const b_right  = g.once(b_right_frames);
const b_down   = g.once(b_down_frames);
const b_up     = g.once(b_up_frames);
const b_exit_1 = g.once(b_left_frames, spf, 0, 200);
const b_exit_2 = g.once(b_left_frames, spf, 0, 400);

const u_left  = g.once(u_left_frames);
const u_right = g.once(u_right_frames);
const u_down  = g.once(u_down_frames);
const u_up    = g.once(u_up_frames);

const l_left  = g.once(l_left_frames);
const l_right = g.once(l_right_frames);
const l_down  = g.once(l_down_frames);
const l_up    = g.once(l_up_frames);

const t = [ new Array(3), new Array(3) ];
for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		const x = 136 + c * 200;
		const y = 209 + r * 200;
		t[c][r] = g.touch(g.rect(x, y, x + 200, y + 200));
	}
}

const can_move_down = () => {
	if (br === 2) return false;
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
	return bc === 0 && br === 1 && (uc !== 0 || ur !== 1);
};

const exit_2 = () => {
	return bc === 0 && br === 2 && (uc !== 0 || ur !== 2);
};

const view = () => {
	b_loop.set_dx(bc * 200);
	b_loop.set_dy(br * 200);
	u_loop.set_dx(uc * 200);
	u_loop.set_dy(ur * 200);
	l_loop.set_dx(lc * 200);
	l_loop.set_dy(lr * 200);

	b_left.set_dx(bc * 200);
	b_left.set_dy(br * 200);
	b_right.set_dx(bc * 200);
	b_right.set_dy(br * 200);
	b_down.set_dx(bc * 200);
	b_down.set_dy(br * 200);
	b_up.set_dx(bc * 200);
	b_up.set_dy(br * 200);

	u_left.set_dx(uc * 200);
	u_left.set_dy(ur * 200);
	u_right.set_dx(uc * 200);
	u_right.set_dy(ur * 200);
	u_down.set_dx(uc * 200);
	u_down.set_dy(ur * 200);
	u_up.set_dx(uc * 200);
	u_up.set_dy(ur * 200);

	l_left.set_dx(lc * 200);
	l_left.set_dy(lr * 200);
	l_right.set_dx(lc * 200);
	l_right.set_dy(lr * 200);
	l_down.set_dx(lc * 200);
	l_down.set_dy(lr * 200);
	l_up.set_dx(lc * 200);
	l_up.set_dy(lr * 200);

	u_loop.start();
	l_loop.start();

	if (exit_1()) {
		g.set_page_state('exit1');
		b_exit_1.start();
		// g.delay(.5).stops(exit1_loop).starts(
		// 	g.delay(.5).starts(g.goto('grid1')),
		// 	() => b_loop.set_dx(-190)
		// ).start();
		return;
	}
	if (exit_2()) {
		g.set_page_state('exit2');
		b_exit_2.start();
		// g.delay(.5).stops(exit2_loop).starts(
		// 	g.delay(.5).starts(g.goto('s1')),
		// 	() => b_loop.set_dx(-190)
		// ).start();
		return;
	}
	b_loop.start();
	if (can_move_down() ) t[bc][br + 1].start();
	if (can_move_up()   ) t[bc][br - 1].start();
	if (can_move_left() ) t[bc - 1][br].start();
	if (can_move_right()) t[bc + 1][br].start();
	if (!can_move_down() && !can_move_up() && !can_move_left() && !can_move_right()) {
		location.reload();
	}
};

const move_down = () => {
	if (bc === lc && br === lr) {
		++lr;
		l_loop.stop();
		l_down.start();
	}
	if (bc === uc && br === ur) {
		++ur;
		u_loop.stop();
		u_down.start();
	}
	++br;
	b_loop.stop();
	b_down.start();
};

const move_up = () => {
	if (bc === lc && br === lr) {
		if (bc === uc && br === ur) {
			--ur;
			u_loop.stop();
			u_up.start();
		}
		--lr;
		l_loop.stop();
		l_up.start();
	}
	--br;
	b_loop.stop();
	b_up.start();
};

const move_left = () => {
	if (bc === uc && br === ur) {
		--uc;
		u_loop.stop();
		u_left.start();
	}
	--bc;
	b_loop.stop();
	b_left.start();
};

const move_right = () => {
	if (bc === uc && br === ur) {
		++uc;
		u_loop.stop();
		u_right.start();
	}
	++bc;
	b_loop.stop();
	b_right.start();
};

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

b_left.starts(view);
b_right.starts(view);
b_down.starts(view);
b_up.starts(view);
b_exit_1.starts(exit1_loop, g.delay(.5).starts(g.goto('grid1')));
b_exit_2.starts(exit2_loop, g.delay(.5).starts(g.goto('s1')));

window.addEventListener('load', () => {
	b_loop.start();
	u_loop.start();
	l_loop.start();
	if (g.get_page_state('exit1')) exit1_loop.start();
	if (g.get_page_state('exit2')) exit2_loop.start();
	view();
});
