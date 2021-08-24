import g from '../canvasapp.js';

g.init_score(1);
g.set_design_size(668, 1080);

const back_loop = g.loop(g.frames(i_back_0));
const back_once = g.once(g.frames([i_back_1, i_back_2]));
const back = g.touch(g.circle(100, 980, 60)).make_independent();
back.stops(back_loop).starts(back_once);
//back_once.starts(g.delay(.5).starts(g.goto('grid2')));

const params_list = [
	// '00120100210200',
	// '00110100220200', 
	// '00000111000211',
	// '01120111010211',
	'11101101111201',
	'11101101211201'
];

let count = g.get_page_state('count');
if (count === false) {
	count = params_list.length;
}
let params = params_list[count - 1];
let j = 0;
let bc = parseInt(params.charAt(j++));
let br = parseInt(params.charAt(j++));
let rc = parseInt(params.charAt(j++));
let rr = parseInt(params.charAt(j++));
let uc = parseInt(params.charAt(j++));
let ur = parseInt(params.charAt(j++));
let dc = parseInt(params.charAt(j++));
let dr = parseInt(params.charAt(j++));
let Lc = parseInt(params.charAt(j++));  
let Lr = parseInt(params.charAt(j++));
let Rc = parseInt(params.charAt(j++));
let Rr = parseInt(params.charAt(j++));
let Dc = parseInt(params.charAt(j++));
let Dr = parseInt(params.charAt(j++));

const count_image = window['i_' + count];
const count_loop = g.loop(g.frames(count_image), 10, -280, 100);

const b_loop       = g.loop(g.frames(i_box   ));
const r_loop       = g.loop(g.frames(i_r     ));
const u_loop       = g.loop(g.frames(i_u     ));
const d_loop       = g.loop(g.frames(i_d     ));
const L_loop       = g.loop(g.frames(i_L     ));
const R_loop       = g.loop(g.frames(i_R     ));
const D_loop       = g.loop(g.frames(i_D     ));
const exit_1_loop  = g.loop(g.frames(i_exit_1), 10, 0, -167);
//const exit_2_loop        = g.loop(g.frames(i_exit_2));
//const exit_3_loop        = g.loop(g.frames(i_exit_3));

const dx = 167;

const spf = 1/24;

const b_left_frames   = [];
const b_right_frames  = [];
const b_down_frames   = [];
const b_up_frames     = [];

const r_left_frames  = [];
const r_right_frames = [];
const r_down_frames  = [];
const r_up_frames    = [];

const u_left_frames  = [];
const u_right_frames = [];
const u_down_frames  = [];
const u_up_frames    = [];

const d_left_frames  = [];
const d_right_frames = [];
const d_down_frames  = [];
const d_up_frames    = [];

const L_left_frames  = [];
const L_right_frames = [];
const L_down_frames  = [];
const L_up_frames    = [];

const R_left_frames  = [];
const R_right_frames = [];
const R_down_frames  = [];
const R_up_frames    = [];

const D_left_frames  = [];
const D_right_frames = [];
const D_down_frames  = [];
const D_up_frames    = [];

const n = 5;
for (let i = 0; i < n; ++i) {
	const d = i * dx / (n + 1);
	b_left_frames.push(g.frame(i_box, spf, -d, 0));
	b_right_frames.push(g.frame(i_box, spf, d, 0));
	b_up_frames.push(g.frame(i_box, spf, 0, -d));
	b_down_frames.push(g.frame(i_box, spf, 0, d));

	r_left_frames.push(g.frame(i_r, spf, -d, 0));
	r_right_frames.push(g.frame(i_r, spf, d, 0));
	r_up_frames.push(g.frame(i_r, spf, 0, -d));
	r_down_frames.push(g.frame(i_r, spf, 0, d));

	u_left_frames.push(g.frame(i_u, spf, -d, 0));
	u_right_frames.push(g.frame(i_u, spf, d, 0));
	u_up_frames.push(g.frame(i_u, spf, 0, -d));
	u_down_frames.push(g.frame(i_u, spf, 0, d));

	d_left_frames.push(g.frame(i_d, spf, -d, 0));
	d_right_frames.push(g.frame(i_d, spf, d, 0));
	d_up_frames.push(g.frame(i_d, spf, 0, -d));
	d_down_frames.push(g.frame(i_d, spf, 0, d));

	L_left_frames.push(g.frame(i_L, spf, -d, 0));
	L_right_frames.push(g.frame(i_L, spf, d, 0));
	L_up_frames.push(g.frame(i_L, spf, 0, -d));
	L_down_frames.push(g.frame(i_L, spf, 0, d));

	R_left_frames.push(g.frame(i_R, spf, -d, 0));
	R_right_frames.push(g.frame(i_R, spf, d, 0));
	R_up_frames.push(g.frame(i_R, spf, 0, -d));
	R_down_frames.push(g.frame(i_R, spf, 0, d));

	D_left_frames.push(g.frame(i_D, spf, -d, 0));
	D_right_frames.push(g.frame(i_D, spf, d, 0));
	D_up_frames.push(g.frame(i_D, spf, 0, -d));
	D_down_frames.push(g.frame(i_D, spf, 0, d));
}

const b_left   = g.once(b_left_frames );
const b_right  = g.once(b_right_frames);
const b_up     = g.once(b_up_frames   );
const b_down   = g.once(b_down_frames );

const b_exit_1 = g.once(b_left_frames , spf,      0, dx * 2);
const b_reload = g.once(b_left_frames , spf,      0, dx * 2);
//const b_exit_2 = g.once(b_down_frames , spf, dx * 1, dx * 2);
//const b_exit_3 = g.once(b_right_frames, spf, dx * 2, dx * 2);

const d_left  = g.once(d_left_frames);
const d_right = g.once(d_right_frames);
const d_up    = g.once(d_up_frames);
const d_down  = g.once(d_down_frames);

const r_left  = g.once(r_left_frames);
const r_right = g.once(r_right_frames);
const r_up    = g.once(r_up_frames);
const r_down  = g.once(r_down_frames);

const u_left  = g.once(u_left_frames);
const u_right = g.once(u_right_frames);
const u_up    = g.once(u_up_frames);
const u_down  = g.once(u_down_frames);

const L_left  = g.once(L_left_frames);
const L_right = g.once(L_right_frames);
const L_up    = g.once(L_up_frames);
const L_down  = g.once(L_down_frames);

const R_left  = g.once(R_left_frames);
const R_right = g.once(R_right_frames);
const R_up    = g.once(R_up_frames);
const R_down  = g.once(R_down_frames);

const D_left  = g.once(D_left_frames);
const D_right = g.once(D_right_frames);
const D_up    = g.once(D_up_frames);
const D_down  = g.once(D_down_frames);

const t = [ new Array(3) ];
for (let c = 0; c < 3; ++c) {
	t[c] = new Array(3);
	for (let r = 0; r < 3; ++r) {
		const x = 83  + c * dx;
		const y = 290 + r * dx;
		t[c][r] = g.touch(g.rect(x, y, x + dx, y + dx));
	}
}
// d, r, u, L, R, D
const can_move_left = () => {
	if (bc === 0) return false;
	if (rc === bc - 1 && rr === br) {
		if (uc === bc && ur === br) return false;
		if (dc === bc && dr === br) return false;
		if (Rc === bc && Rr === br) return false;
		if (Dc === bc && Dr === br) return false;
	}
	if (uc === bc - 1 && ur === br) return false;
	if (dc === bc - 1 && dr === br) return false;
	if (Lc === bc - 1 && Lr === br) return false;
	if (Rc === bc - 1 && Rr === br) {
		if (Dc === bc && Dr === br) return false;
	}
	if (Dc === bc - 1 && Dr === br) return false;
	return true;
};

const can_move_right = () => {
	if (bc === 2) return false;
	if (rc === bc + 1 && rr === br) return false;
	if (uc === bc + 1 && ur === br) return false;
	if (dc === bc + 1 && dr === br) return false;
	if (Lc === bc + 1 && Lr === br) {
		if (Dc === bc && Dr === br) return false;		
	}
	if (Rc === bc + 1 && Rr === br) return false;
	if (Dc === bc + 1 && Dr === br) return false;
	return true;
};

const can_move_up = () => {
	if (br === 0) return false;
	if (rc === bc && rr === br - 1) return false;
	if (uc === bc && ur === br - 1) return false;
	if (dc === bc && dr === br - 1) {
		if (rc === bc && rr === br) return false;
		if (Lc === bc && Lr === br) return false;
		if (Rc === bc && Rr === br) return false;
		if (Dc === bc && Dr === br) return false;
	}
	if (Lc === bc && Lr === br - 1) return false;
	if (Rc === bc && Rr === br - 1) return false;
	if (Dc === bc && Dr === br - 1) {
		if (Lc === bc && Lr === br) return false;
		if (Rc === bc && Rr === br) return false;
	}
	return true;
};

const can_move_down = () => {
	if (br === 2) return false;
	if (rc === bc && rr === br + 1) return false;
	if (uc === bc && ur === br + 1) {
		if (rc === bc && rr === br) return false;
		if (Lc === bc && Lr === br) return false;
		if (Rc === bc && Rr === br) return false;
	}
	if (dc === bc && dr === br + 1) return false;
	if (Lc === bc && Lr === br + 1) return false;
	if (Rc === bc && Rr === br + 1) return false;
	if (Dc === bc && Dr === br + 1) return false;
	return true;
};

const exit_1 = () => {
	if (bc === dc && br === dr) return false;
	if (bc === uc && br === ur) return false;
	if (bc === rc && br === rr) return false;
	if (bc === Rc && br === Rr) return false;
	if (bc === Dc && br === Dr) return false;
	return bc === 0 && br === 1;
};

// const exit_2 = () => {
// 	if (bc === uc && br === ur) return false;
// 	if (bc === rc && br === rr) return false;
// 	if (bc === Lc && br === Lr) return false;
// 	return bc === 1 && br === 2;
// };

// const exit_3 = () => {
// 	if (bc === dc && br === dr) return false;
// 	if (bc === uc && br === ur) return false;
// 	if (bc === Lc && br === Lr) return false;
// 	return bc === 2 && br === 2;
// };

const view = () => {
	b_loop.set_dx(bc * dx);
	b_loop.set_dy(br * dx);
	r_loop.set_dx(rc * dx);
	r_loop.set_dy(rr * dx);
	u_loop.set_dx(uc * dx);
	u_loop.set_dy(ur * dx);
	d_loop.set_dx(dc * dx);
	d_loop.set_dy(dr * dx);
	L_loop.set_dx(Lc * dx);
	L_loop.set_dy(Lr * dx);
	R_loop.set_dx(Rc * dx);
	R_loop.set_dy(Rr * dx);
	D_loop.set_dx(Dc * dx);
	D_loop.set_dy(Dr * dx);

	b_left.set_dx(bc * dx);
	b_left.set_dy(br * dx);
	b_right.set_dx(bc * dx);
	b_right.set_dy(br * dx);
	b_down.set_dx(bc * dx);
	b_down.set_dy(br * dx);
	b_up.set_dx(bc * dx);
	b_up.set_dy(br * dx);

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

	d_left.set_dx(dc * dx);
	d_left.set_dy(dr * dx);
	d_right.set_dx(dc * dx);
	d_right.set_dy(dr * dx);
	d_down.set_dx(dc * dx);
	d_down.set_dy(dr * dx);
	d_up.set_dx(dc * dx);
	d_up.set_dy(dr * dx);

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

	D_left.set_dx(Dc * dx);
	D_left.set_dy(Dr * dx);
	D_right.set_dx(Dc * dx);
	D_right.set_dy(Dr * dx);
	D_down.set_dx(Dc * dx);
	D_down.set_dy(Dr * dx);
	D_up.set_dx(Dc * dx);
	D_up.set_dy(Dr * dx);

	r_loop.start();
	u_loop.start();
	d_loop.start();
	L_loop.start();
	R_loop.start();
	D_loop.start();

	if (exit_1()) {
		g.set_page_state('count', --count);
		if (count === 0) {
			g.set_page_state('count', params_list.length);
			g.set_solved('exit1');
			b_exit_1.start();
		} else {
			b_reload.start();
		}
		return;
	}
	// if (exit_2()) {
	// 	g.set_page_state('exit2');
	// 	b_exit_2.start();
	// 	return;
	// }
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
//	if (!can_move_down() && !can_move_up() && !can_move_left() && !can_move_right()) {
//		location.reload();
//	}
};

const move_left = () => {
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
	if (dc === bc && dr === br) {
		--dc;
		d_loop.stop();
		d_left.start();
	}
	if (Rc === bc && Rr === br) {
		--Rc;
		R_loop.stop();
		R_left.start();
	}
	if (Dc === bc && Dr === br) {
		--Dc;
		D_loop.stop();
		D_left.start();
	}
	--bc;
	b_loop.stop();
	b_left.start();
};

const move_right = () => {
	if (rc === bc && rr === br) {
		if (Lc === bc && Lr === br || Dc === bc && Dr === br) {
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
	if (dc === bc && dr === br) {
		++dc;
		d_loop.stop();
		d_right.start();
	}
	if (Lc === bc && Lr === br) {
		++Lc;
		L_loop.stop();
		L_right.start();
	}
	if (Dc === bc && Dr === br) {
		++Dc;
		D_loop.stop();
		D_right.start();
	}
	++bc;
	b_loop.stop();
	b_right.start();
};

const move_up = () => {
	if (rc === bc && rr === br) {
		--rr;
		r_loop.stop();
		r_up.start();
	}
	if (uc === bc && ur === br) {
		if (Lc === bc && Lr === br || Rc === bc && Rr === br || Dc === bc && Dr === br) {
			u_loop.stop();
			u_up.start();
			--ur;
		}
	}
	if (dc === bc && dr === br) {
		--dr;
		d_loop.stop();
		d_up.start();
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
	if (Dc === bc && Dr === br) {
		--Dr;
		D_loop.stop();
		D_up.start();
	}
	--br;
	b_loop.stop();
	b_up.start();
};

const move_down = () => {
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
	if (dc === bc && dr === br) {
		if (Lc === bc && Lr === br || Rc === bc && Rr === br) {
			d_loop.stop();
			d_down.start();
			++dr;
		}
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
//b_exit_1.starts(exit_1_loop, g.delay(.5).starts(g.goto('grid2')));
b_exit_1.starts(exit_1_loop);
b_reload.starts(g.delay(.5).starts(g.goto('grids33_2')));
//b_exit_2.starts(exit_2_loop, g.delay(.5).starts(g.goto('s1')));
//b_exit_3.starts(exit_3_loop, g.delay(.5).starts(g.goto('s1')));

window.addEventListener('load', () => {
	back_loop.start();
	back.start();

	count_loop.start();

	b_loop.start();
	d_loop.start();
	r_loop.start();
	u_loop.start();
	L_loop.start();
	R_loop.start();
	if (g.get_solved('exit1')) exit_1_loop.start();
//	if (g.get_page_state('exit2')) exit_2_loop.start();
//	if (g.get_page_state('exit3')) exit_3_loop.start();
	view();
});
