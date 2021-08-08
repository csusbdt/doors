import g from '../canvasapp.js';

g.set_design_size(668, 1080);
g.init_score(3);

let bc = 2;
let br = 0;
let u1c = 2;
let u1r = 1;
let r1c = 1;
let r1r = 0;
let l2c = 1;
let l2r = 2;

const b_loop              = g.loop(g.frames(i_box ));
const u1_loop             = g.loop(g.frames(i_u1  ));
const r1_loop             = g.loop(g.frames(i_r1  ));
const l2_loop             = g.loop(g.frames(i_l2  ));
const exit_1_loop         = g.loop(g.frames(i_exit_1));
const exit_2_loop         = g.loop(g.frames(i_exit_2));
const exit_3_loop         = g.loop(g.frames(i_exit_3));

const dx = 167;

const spf = 1/24;

const b_left_frames   = [];
const b_right_frames  = [];
const b_down_frames   = [];
const b_up_frames     = [];

const u1_left_frames  = [];
const u1_right_frames = [];
const u1_down_frames  = [];
const u1_up_frames    = [];

const r1_left_frames  = [];
const r1_right_frames = [];
const r1_down_frames  = [];
const r1_up_frames    = [];

const l2_left_frames  = [];
const l2_right_frames = [];
const l2_down_frames  = [];
const l2_up_frames    = [];

const n = 5;
for (let i = 0; i < n; ++i) {
	const d = i * dx / (n + 1);
	b_left_frames.push(g.frame(i_box, spf, -d, 0));
	b_right_frames.push(g.frame(i_box, spf, d, 0));
	b_down_frames.push(g.frame(i_box, spf, 0, d));
	b_up_frames.push(g.frame(i_box, spf, 0, -d));

	u1_left_frames.push(g.frame(i_u1, spf, -d, 0));
	u1_right_frames.push(g.frame(i_u1, spf, d, 0));
	u1_down_frames.push(g.frame(i_u1, spf, 0, d));
	u1_up_frames.push(g.frame(i_u1, spf, 0, -d));

	r1_left_frames.push(g.frame(i_r1, spf, -d, 0));
	r1_right_frames.push(g.frame(i_r1, spf, d, 0));
	r1_down_frames.push(g.frame(i_r1, spf, 0, d));
	r1_up_frames.push(g.frame(i_r1, spf, 0, -d));

	l2_left_frames.push(g.frame(i_l2, spf, -d, 0));
	l2_right_frames.push(g.frame(i_l2, spf, d, 0));
	l2_down_frames.push(g.frame(i_l2, spf, 0, d));
	l2_up_frames.push(g.frame(i_l2, spf, 0, -d));
}

const b_left   = g.once(b_left_frames );
const b_right  = g.once(b_right_frames);
const b_down   = g.once(b_down_frames );
const b_up     = g.once(b_up_frames   );

const b_exit_1 = g.once(b_left_frames , spf,      0, dx * 2);
const b_exit_2 = g.once(b_down_frames , spf, dx * 1, dx * 2);
const b_exit_3 = g.once(b_right_frames, spf, dx * 2, dx * 2);

const u1_left  = g.once(u1_left_frames);
const u1_right = g.once(u1_right_frames);
const u1_down  = g.once(u1_down_frames);
const u1_up    = g.once(u1_up_frames);

const r1_left  = g.once(r1_left_frames);
const r1_right = g.once(r1_right_frames);
const r1_down  = g.once(r1_down_frames);
const r1_up    = g.once(r1_up_frames);

const l2_left  = g.once(l2_left_frames);
const l2_right = g.once(l2_right_frames);
const l2_down  = g.once(l2_down_frames);
const l2_up    = g.once(l2_up_frames);

const t = [ new Array(3) ];
for (let c = 0; c < 3; ++c) {
	t[c] = new Array(3);
	for (let r = 0; r < 3; ++r) {
		const x = 83  + c * dx;
		const y = 290 + r * dx;
		t[c][r] = g.touch(g.rect(x, y, x + dx, y + dx));
	}
}

const can_move_down = () => {
	if (br === 2) return false;
	if (bc === u1c && br === u1r - 1) {
		if (bc === r1c && br === r1r) return false;
		if (bc === l2c && br === l2r) return false;
	}
	if (bc === r1c && br === r1r - 1) return false;
	if (bc === l2c && br === l2r - 1) return false;
	return true;
};

const can_move_up = () => {
	if (br === 0) return false;
	if (bc === u1c && br === u1r + 1) return false;
	if (bc === r1c && br === r1r + 1) return false;
	if (bc === l2c && br === l2r + 1) return false;
	return true;
};

const can_move_left = () => {
	if (bc === 0) return false;
	if (bc === u1c + 1 && br === u1r) return false;
	if (bc === r1c + 1 && br === r1r) {
		if (bc === u1c && br === u1r) return false;
	}
	if (bc === l2c + 1 && br === l2r) return false;
	return true;
};

const can_move_right = () => {
	if (bc === 2) return false;
	if (bc === u1c - 1 && br === u1r) return false;
	if (bc === r1c - 1 && br === r1r) return false;
	return true;
};

const exit_1 = () => {
	if (bc === u1c && br === u1r) return false;
	if (bc === r1c && br === r1r) return false;
	return bc === 0 && br === 2;
};

const exit_2 = () => {
	if (bc === u1c && br === u1r) return false;
	if (bc === r1c && br === r1r) return false;
	if (bc === l2c && br === l2r) return false;
	return bc === 1 && br === 2;
};

const exit_3 = () => {
	if (bc === u1c && br === u1r) return false;
	if (bc === l2c && br === l2r) return false;
	return bc === 2 && br === 2;
};

const view = () => {
	b_loop.set_dx(bc * dx);
	b_loop.set_dy(br * dx);
	u1_loop.set_dx(u1c * dx);
	u1_loop.set_dy(u1r * dx);
	r1_loop.set_dx(r1c * dx);
	r1_loop.set_dy(r1r * dx);
	l2_loop.set_dx(l2c * dx);
	l2_loop.set_dy(l2r * dx);

	b_left.set_dx(bc * dx);
	b_left.set_dy(br * dx);
	b_right.set_dx(bc * dx);
	b_right.set_dy(br * dx);
	b_down.set_dx(bc * dx);
	b_down.set_dy(br * dx);
	b_up.set_dx(bc * dx);
	b_up.set_dy(br * dx);

	u1_left.set_dx(u1c * dx);
	u1_left.set_dy(u1r * dx);
	u1_right.set_dx(u1c * dx);
	u1_right.set_dy(u1r * dx);
	u1_down.set_dx(u1c * dx);
	u1_down.set_dy(u1r * dx);
	u1_up.set_dx(u1c * dx);
	u1_up.set_dy(u1r * dx);

	r1_left.set_dx(r1c * dx);
	r1_left.set_dy(r1r * dx);
	r1_right.set_dx(r1c * dx);
	r1_right.set_dy(r1r * dx);
	r1_down.set_dx(r1c * dx);
	r1_down.set_dy(r1r * dx);
	r1_up.set_dx(r1c * dx);
	r1_up.set_dy(r1r * dx);

	l2_left.set_dx(l2c * dx);
	l2_left.set_dy(l2r * dx);
	l2_right.set_dx(l2c * dx);
	l2_right.set_dy(l2r * dx);
	l2_down.set_dx(l2c * dx);
	l2_down.set_dy(l2r * dx);
	l2_up.set_dx(l2c * dx);
	l2_up.set_dy(l2r * dx);

	u1_loop.start();
	r1_loop.start();
	l2_loop.start();

	if (exit_1()) {
		g.set_solved('exit1');
		b_exit_1.start();
		return;
	}
	if (exit_2()) {
		g.set_solved('exit2');
		b_exit_2.start();
		return;
	}
	if (exit_3()) {
		g.set_solved('exit3');
		b_exit_3.start();
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
	if (bc === u1c && br === u1r) {
		++u1r;
		u1_loop.stop();
		u1_down.start();
	}
	if (bc === r1c && br === r1r) {
		++r1r;
		r1_loop.stop();
		r1_down.start();
	}
	if (bc === l2c && br === l2r) {
		++l2r;
		l2_loop.stop();
		l2_down.start();
	}
	++br;
	b_loop.stop();
	b_down.start();
};

const move_up = () => {
	if (bc === r1c && br === r1r) {
		--r1r;
		r1_loop.stop();
		r1_up.start();
	}
	if (bc === u1c && br === u1r) {
		if (bc === l2c && br === l2r) {
			--u1r;
			u1_loop.stop();
			u1_up.start();
		}
	}
	if (bc === l2c && br === l2r) {
		--l2r;
		l2_loop.stop();
		l2_up.start();
	}
	--br;
	b_loop.stop();
	b_up.start();
};

const move_left = () => {
	if (bc === r1c && br === r1r) {
		--r1c;
		r1_loop.stop();
		r1_left.start();
	}
	if (bc === u1c && br === u1r) {
		--u1c;
		u1_loop.stop();
		u1_left.start();
	}
	--bc;
	b_loop.stop();
	b_left.start();
};

const move_right = () => {
	if (bc === u1c && br === u1r) {
		++u1c;
		u1_loop.stop();
		u1_right.start();
	}
	if (bc === l2c && br === l2r) {
		++l2c;
		l2_loop.stop();
		l2_right.start();
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
b_exit_1.starts(exit_1_loop, g.delay(.5).starts(g.goto('grid2')));
b_exit_2.starts(exit_2_loop, g.delay(.5).starts(g.goto('grid5')));
b_exit_3.starts(exit_3_loop, g.delay(.5).starts(g.goto('grid4')));

window.addEventListener('load', () => {
	b_loop.start();
	u1_loop.start();
	r1_loop.start();
	l2_loop.start();
	if (g.get_solved('exit1')) exit_1_loop.start();
	if (g.get_solved('exit2')) exit_2_loop.start();
	if (g.get_solved('exit3')) exit_3_loop.start();
	view();
});
