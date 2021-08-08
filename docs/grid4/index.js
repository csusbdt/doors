import g from '../canvasapp.js';

let bc = 2;
let br = 0;
let dc = 2;
let dr = 0;
let rc = 1;
let rr = 1;
let uc = 0;
let ur = 2;
let Lc = 1;
let Lr = 2;
let Rc = 2;
let Rr = 0;

g.set_design_size(668, 1080);
g.init_score(2);

const b_loop             = g.loop(g.frames(i_box   ));
const d_loop             = g.loop(g.frames(i_d     ));
const r_loop             = g.loop(g.frames(i_r     ));
const u_loop             = g.loop(g.frames(i_u     ));
const L_loop             = g.loop(g.frames(i_L     ));
const R_loop             = g.loop(g.frames(i_R     ));
const exit_1_loop        = g.loop(g.frames(i_exit_1));
const exit_2_loop        = g.loop(g.frames(i_exit_2));
//const exit_3_loop        = g.loop(g.frames(i_exit_3));

const dx = 167;

const spf = 1/24;

const b_left_frames   = [];
const b_right_frames  = [];
const b_down_frames   = [];
const b_up_frames     = [];

const d_left_frames  = [];
const d_right_frames = [];
const d_down_frames  = [];
const d_up_frames    = [];

const r_left_frames  = [];
const r_right_frames = [];
const r_down_frames  = [];
const r_up_frames    = [];

const u_left_frames  = [];
const u_right_frames = [];
const u_down_frames  = [];
const u_up_frames    = [];

const L_left_frames  = [];
const L_right_frames = [];
const L_down_frames  = [];
const L_up_frames    = [];

const R_left_frames  = [];
const R_right_frames = [];
const R_down_frames  = [];
const R_up_frames    = [];

const n = 5;
for (let i = 0; i < n; ++i) {
	const d = i * dx / (n + 1);
	b_left_frames.push(g.frame(i_box, spf, -d, 0));
	b_right_frames.push(g.frame(i_box, spf, d, 0));
	b_down_frames.push(g.frame(i_box, spf, 0, d));
	b_up_frames.push(g.frame(i_box, spf, 0, -d));

	d_left_frames.push(g.frame(i_d, spf, -d, 0));
	d_right_frames.push(g.frame(i_d, spf, d, 0));
	d_down_frames.push(g.frame(i_d, spf, 0, d));
	d_up_frames.push(g.frame(i_d, spf, 0, -d));

	r_left_frames.push(g.frame(i_r, spf, -d, 0));
	r_right_frames.push(g.frame(i_r, spf, d, 0));
	r_down_frames.push(g.frame(i_r, spf, 0, d));
	r_up_frames.push(g.frame(i_r, spf, 0, -d));

	u_left_frames.push(g.frame(i_u, spf, -d, 0));
	u_right_frames.push(g.frame(i_u, spf, d, 0));
	u_down_frames.push(g.frame(i_u, spf, 0, d));
	u_up_frames.push(g.frame(i_u, spf, 0, -d));

	L_left_frames.push(g.frame(i_L, spf, -d, 0));
	L_right_frames.push(g.frame(i_L, spf, d, 0));
	L_down_frames.push(g.frame(i_L, spf, 0, d));
	L_up_frames.push(g.frame(i_L, spf, 0, -d));

	R_left_frames.push(g.frame(i_R, spf, -d, 0));
	R_right_frames.push(g.frame(i_R, spf, d, 0));
	R_down_frames.push(g.frame(i_R, spf, 0, d));
	R_up_frames.push(g.frame(i_R, spf, 0, -d));
}

const b_left   = g.once(b_left_frames );
const b_right  = g.once(b_right_frames);
const b_down   = g.once(b_down_frames );
const b_up     = g.once(b_up_frames   );

const b_exit_1 = g.once(b_left_frames , spf,      0, dx * 2);
//const b_exit_2 = g.once(b_down_frames , spf, dx * 2, dx * 2);
const b_exit_2 = g.once(b_right_frames, spf, dx * 2, dx * 2);

const d_left  = g.once(d_left_frames);
const d_right = g.once(d_right_frames);
const d_down  = g.once(d_down_frames);
const d_up    = g.once(d_up_frames);

const r_left  = g.once(r_left_frames);
const r_right = g.once(r_right_frames);
const r_down  = g.once(r_down_frames);
const r_up    = g.once(r_up_frames);

const u_left  = g.once(u_left_frames);
const u_right = g.once(u_right_frames);
const u_down  = g.once(u_down_frames);
const u_up    = g.once(u_up_frames);

const L_left  = g.once(L_left_frames);
const L_right = g.once(L_right_frames);
const L_down  = g.once(L_down_frames);
const L_up    = g.once(L_up_frames);

const R_left  = g.once(R_left_frames);
const R_right = g.once(R_right_frames);
const R_down  = g.once(R_down_frames);
const R_up    = g.once(R_up_frames);

const t = [ new Array(3) ];
for (let c = 0; c < 3; ++c) {
	t[c] = new Array(3);
	for (let r = 0; r < 3; ++r) {
		const x = 83  + c * dx;
		const y = 290 + r * dx;
		t[c][r] = g.touch(g.rect(x, y, x + dx, y + dx));
	}
}

const can_move_left = () => {
	if (bc === 0) return false;
	if (dr === br && dc === bc - 1) return false;
	if (rr === br && rc === bc - 1) {
		if (Rc === bc && Rr === br) return false;
	}
	if (ur === br && uc === bc - 1) return false;
	if (Lr === br && Lc === bc - 1) return false;
	return true;
};

const can_move_right = () => {
	if (bc === 2) return false;
	if (dr === br && dc === bc + 1) return false;
	if (rr === br && rc === bc + 1) return false;
	if (ur === br && uc === bc + 1) return false;
	if (Rr === br && Rc === bc + 1) return false;
	return true;
};

const can_move_up = () => {
	if (br === 0) return false;
	if (dr === br && dc === br - 1) {
		if (rc === bc && rr === br) return false;
		if (Lc === bc && Lr === br) return false;
		if (Rc === bc && Rr === br) return false;
	}
	if (rc === bc && rr === br - 1) return false;
	if (uc === bc && ur === br - 1) return false;
	if (Lc === bc && Lr === br - 1) return false;
	if (Rc === bc && Rr === br - 1) return false;
	return true;
};

const can_move_down = () => {
	if (br === 2) return false;
	if (dc === bc && dr === br + 1) return false;
	if (rc === bc && rr === br + 1) return false;
	if (uc === bc && ur === br + 1) {
		if (rc === bc && rr === br) return false;
		if (Lc === bc && Lr === br) return false;
		if (Rc === bc && Rr === br) return false;
	}
	if (Lc === bc && Lr === br + 1) return false;
	if (Rc === bc && Rr === br + 1) return false;
	return true;
};

const exit_1 = () => {
	if (bc === dc && br === dr) return false;
	if (bc === uc && br === ur) return false;
	if (bc === rc && br === rr) return false;
	return bc === 0 && br === 2;
};

// const exit_2 = () => {
// 	if (bc === uc && br === ur) return false;
// 	if (bc === rc && br === rr) return false;
// 	if (bc === Lc && br === Lr) return false;
// 	return bc === 1 && br === 2;
// };

const exit_2 = () => {
	if (bc === dc && br === dr) return false;
	if (bc === uc && br === ur) return false;
	if (bc === Lc && br === Lr) return false;
	return bc === 2 && br === 2;
};

const view = () => {
	b_loop.set_dx(bc * dx);
	b_loop.set_dy(br * dx);
	d_loop.set_dx(dc * dx);
	d_loop.set_dy(dr * dx);
	r_loop.set_dx(rc * dx);
	r_loop.set_dy(rr * dx);
	u_loop.set_dx(uc * dx);
	u_loop.set_dy(ur * dx);
	L_loop.set_dx(Lc * dx);
	L_loop.set_dy(Lr * dx);
	R_loop.set_dx(Rc * dx);
	R_loop.set_dy(Rr * dx);

	b_left.set_dx(bc * dx);
	b_left.set_dy(br * dx);
	b_right.set_dx(bc * dx);
	b_right.set_dy(br * dx);
	b_down.set_dx(bc * dx);
	b_down.set_dy(br * dx);
	b_up.set_dx(bc * dx);
	b_up.set_dy(br * dx);

	d_left.set_dx(dc * dx);
	d_left.set_dy(dr * dx);
	d_right.set_dx(dc * dx);
	d_right.set_dy(dr * dx);
	d_down.set_dx(dc * dx);
	d_down.set_dy(dr * dx);
	d_up.set_dx(dc * dx);
	d_up.set_dy(dr * dx);

	r_left.set_dx(rc * dx);
	r_left.set_dy(rr * dx);
	r_right.set_dx(rc * dx);
	r_right.set_dy(rr * dx);
	r_down.set_dx(rc * dx);
	r_down.set_dy(rr * dx);
	r_up.set_dx(rc * dx);
	r_up.set_dy(rr * dx);

	u_left.set_dx(uc * dx);
	u_left.set_dy(ur * dx);
	u_right.set_dx(uc * dx);
	u_right.set_dy(ur * dx);
	u_down.set_dx(uc * dx);
	u_down.set_dy(ur * dx);
	u_up.set_dx(uc * dx);
	u_up.set_dy(ur * dx);

	L_left.set_dx(Lc * dx);
	L_left.set_dy(Lr * dx);
	L_right.set_dx(Lc * dx);
	L_right.set_dy(Lr * dx);
	L_down.set_dx(Lc * dx);
	L_down.set_dy(Lr * dx);
	L_up.set_dx(Lc * dx);
	L_up.set_dy(Lr * dx);

	R_left.set_dx(Rc * dx);
	R_left.set_dy(Rr * dx);
	R_right.set_dx(Rc * dx);
	R_right.set_dy(Rr * dx);
	R_down.set_dx(Rc * dx);
	R_down.set_dy(Rr * dx);
	R_up.set_dx(Rc * dx);
	R_up.set_dy(Rr * dx);

	d_loop.start();
	r_loop.start();
	u_loop.start();
	L_loop.start();
	R_loop.start();

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
	// if (exit_3()) {
	// 	g.set_page_state('exit3');
	// 	b_exit_3.start();
	// 	return;
	// }
	b_loop.start();
	if (can_move_down() ) t[bc][br + 1].start();
	if (can_move_up()   ) t[bc][br - 1].start();
	if (can_move_left() ) t[bc - 1][br].start();
	if (can_move_right()) t[bc + 1][br].start();
	if (!can_move_down() && !can_move_up() && !can_move_left() && !can_move_right()) {
		location.reload();
	}
};

const move_left = () => {
	if (dc === bc && dr === br) {
		--dc;
		d_loop.stop();
		d_left.start();
	}
	if (rc === bc && rr === br) {
		--rc;
		r_loop.stop();
		r_left.start();
	}
	if (uc === bc && ur === br) {
		--uc;
		u_loop.stop();
		u_left.start();
	}
	if (Rc === bc && Rr === br) {
		--Rc;
		R_loop.stop();
		R_left.start();
	}
	--bc;
	b_loop.stop();
	b_left.start();
};

const move_right = () => {
	if (dc === bc && dr === br) {
		++dc;
		d_loop.stop();
		d_right.start();
	}
	if (rc === bc && rr === br) {
		if (Lc === bc && Lr === br) {
			++rc;
			r_loop.stop();
			r_right.start();
		}
	}
	if (uc === bc && ur === br) {
		++uc;
		u_loop.stop();
		u_right.start();
	}
	if (Lc === bc && Lr === br) {
		++Lc;
		L_loop.stop();
		L_right.start();
	}
	++bc;
	b_loop.stop();
	b_right.start();
};

const move_up = () => {
	if (dc === bc && dr === br) {
		--dr;
		d_loop.stop();
		d_up.start();
	}
	if (rc === bc && rr === br) {
		--rr;
		r_loop.stop();
		r_up.start();
	}
	if (uc === bc && ur === br) {
		if (Lc === bc && Lr === br || Rc === bc && Rr === br) {
			u_loop.stop();
			u_up.start();
			--ur;
		}
	}
	if (Lc === bc && Lr === br) {
		--Lr;
		L_loop.stop();
		L_up.start();
	}
	if (Rc === bc && Rr === br) {
		--Rr;
		R_loop.stop();
		R_up.start();
	}
	--br;
	b_loop.stop();
	b_up.start();
};

const move_down = () => {
	if (dc === bc && dr === br) {
		if (Lc === bc && Lr === br || Rc === bc && Rr === br) {
			d_loop.stop();
			d_down.start();
			++dr;
		}
	}
	if (rc === bc && rr === br) {
		++rr;
		r_loop.stop();
		r_down.start();
	}
	if (uc === bc && ur === br) {
		++ur;
		u_loop.stop();
		u_down.start();
	}
	if (Lc === bc && Lr === br) {
		++Lr;
		L_loop.stop();
		L_down.start();
	}
	if (Rc === bc && Rr === br) {
		++Rr;
		R_loop.stop();
		R_down.start();
	}
	++br;
	b_loop.stop();
	b_down.start();
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
b_exit_1.starts(exit_1_loop, g.delay(.5).starts(g.goto('grid6')));
b_exit_2.starts(exit_2_loop, g.delay(.5).starts(g.goto('grid3')));
//b_exit_3.starts(exit_3_loop, g.delay(.5).starts(g.goto('s1')));

window.addEventListener('load', () => {
	b_loop.start();
	d_loop.start();
	r_loop.start();
	u_loop.start();
	L_loop.start();
	R_loop.start();
	if (g.get_solved('exit1')) exit_1_loop.start();
	if (g.get_solved('exit2')) exit_2_loop.start();
	//if (g.get_page_state('exit3')) exit_3_loop.start();
	view();
});
