import g from '../canvasapp.js';

g.set_design_size(668, 1080);
g.init_score(2);

let bc = 1;
let br = 1;
let uc = 1;
let ur = 0;
let dc = 1;
let dr = 2;

const b_loop     = g.loop(g.frames(i_box ));
const u_loop     = g.loop(g.frames(i_l2  ));
const d_loop     = g.loop(g.frames(i_l2  ));
const exit1_loop = g.loop(g.frames(i_exit), 10, 530, 7);
const exit2_loop = g.loop(g.frames(i_exit), 10, 530, 402);

const spf = 1/24;

const b_left_frames  = [];
const b_right_frames = [];
const b_down_frames  = [];
const b_up_frames    = [];

const u_left_frames  = [];
const u_right_frames = [];
const u_down_frames  = [];
const u_up_frames    = [];

const n = 5;
for (let i = 0; i < n; ++i) {
	const d = i * 200 / (n + 1);
	b_left_frames.push(g.frame(i_box, spf, -d, 0));
	b_right_frames.push(g.frame(i_box, spf, d, 0));
	b_down_frames.push(g.frame(i_box, spf, 0, d));
	b_up_frames.push(g.frame(i_box, spf, 0, -d));

	u_left_frames.push(g.frame(i_l2, spf, -d, 0));
	u_right_frames.push(g.frame(i_l2, spf, d, 0));
	u_down_frames.push(g.frame(i_l2, spf, 0, d));
	u_up_frames.push(g.frame(i_l2, spf, 0, -d));

	// d_left_frames.push(g.frame(i_u1, spf, -d, 0));
	// d_right_frames.push(g.frame(i_u1, spf, d, 0));
	// d_down_frames.push(g.frame(i_u1, spf, 0, d));
	// d_up_frames.push(g.frame(i_u1, spf, 0, -d));
}

const b_left   = g.once(b_left_frames);
const b_right  = g.once(b_right_frames);
const b_down   = g.once(b_down_frames);
const b_up     = g.once(b_up_frames);
const b_exit_1 = g.once(b_right_frames, spf, 200, 0);
const b_exit_2 = g.once(b_right_frames, spf, 200, 400);

const u_left  = g.once(u_left_frames);
const u_right = g.once(u_right_frames);
const u_down  = g.once(u_down_frames);
const u_up    = g.once(u_up_frames);

const d_left  = g.once(u_left_frames);
const d_right = g.once(u_right_frames);
const d_down  = g.once(u_down_frames);
const d_up    = g.once(u_up_frames);

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
	if (bc === 0) return true;
	if (br === 0 && (ur === 1 || dr === 1)) return false;
	return true;
};

const can_move_up = () => {
	if (br === 0) return false;
	if (bc === 0) return true;
	if (br === 0 && (ur === 1 || dr === 1)) return false;
	return true;
};

const can_move_left = () => {
	if (bc === 0) return false;
	return true;
};

const can_move_right = () => {
	if (bc === 1) return false;
	return true;
};

const exit_1 = () => {
	return bc === 1 && br === 0 && ur !== 0;
};

const exit_2 = () => {
	return bc === 1 && br === 2 && dr !== 2;
};

const view = () => {
	b_loop.set_dx(bc * 200);
	b_loop.set_dy(br * 200);
	u_loop.set_dx(uc * 200);
	u_loop.set_dy(ur * 200);
	d_loop.set_dx(dc * 200);
	d_loop.set_dy(dr * 200);

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

	d_left.set_dx(dc * 200);
	d_left.set_dy(dr * 200);
	d_right.set_dx(dc * 200);
	d_right.set_dy(dr * 200);
	d_down.set_dx(dc * 200);
	d_down.set_dy(dr * 200);
	d_up.set_dx(dc * 200);
	d_up.set_dy(dr * 200);

	u_loop.start();
	d_loop.start();

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
	if (bc === uc && br === ur) {
		++ur;
		u_loop.stop();
		u_down.start();
	}
	if (bc === uc && br === dr) {
		++dr;
		d_loop.stop();
		d_down.start();
	}
	++br;
	b_loop.stop();
	b_down.start();
};

const move_up = () => {
	if (bc === uc && br === ur) {
		--ur;
		u_loop.stop();
		u_up.start();
	}
	if (bc === uc && br === dr) {
		--dr;
		d_loop.stop();
		d_up.start();
	}
	--br;
	b_loop.stop();
	b_up.start();
};

const move_left = () => {
	--bc;
	b_loop.stop();
	b_left.start();
};

const move_right = () => {
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
b_exit_1.starts(exit1_loop, g.delay(.5).starts(g.goto('doors')));
b_exit_2.starts(exit2_loop, g.delay(.5).starts(g.goto('grid2')));

window.addEventListener('load', () => {
	b_loop.start();
	u_loop.start();
	d_loop.start();
	if (g.get_solved('exit1')) exit1_loop.start();
	if (g.get_solved('exit2')) exit2_loop.start();
	view();
});
