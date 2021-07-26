import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const box_frames = g.frames(i_box);
const l1_frames = g.frames(i_l1);
const l2_frames = g.frames(i_l2);
const r1_frames = g.frames(i_r1);
const r2_frames = g.frames(i_r2);
const u1_frames = g.frames(i_u1);
const u2_frames = g.frames(i_u2);
const d1_frames = g.frames(i_d1);
const d2_frames = g.frames(i_d2);

const border = g.loop(g.frames(i_border));
const grid   = g.loop(g.frames(i_grid  ));

const b_loop  = g.loop(g.frames(i_box));
const d1_loop = g.loop(g.frames(i_d1));
const u1_loop = g.loop(g.frames(i_u1));
const l2_loop = g.loop(g.frames(i_l2));

// const b_down = g.once(g.frames(i_blank)).starts(() => {
// 	b_loop.dy += 50;
// });

const t = [ new Array(4), new Array(4) ];
for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		const x = 140 + c * 200;
		const y = 135 + r * 200;
		t[c][r] = g.touch(g.rect(x, y, x + 200, y + 200));
	}
}

const b  = { c: 0, r: 0};
const u1 = { c: 0, r: 3};

// const step_down = () => {	
// };

for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		t[c][r].starts(() => {
			const with_u1  = u1.c === b.c && u1.r === b.r;
			if (b.c < c) {
				// go right
				if (with_u1) u1.c += 1;
				b.c += 1;
			} else if (b.c > c) {
				// go left
				if (with_u1) u1.c -= 1;
				b.c -= 1;
			} else if (b.r < r) {
				// go down
				if (with_u1) u1.r += 1;
				b.r += 1;
			} else {
				// go up
				b.r -= 1;
			}
			view();
		});
	}
}

const view = () => {
	b_loop.set_dx(b.c   * 200);
	b_loop.set_dy(b.r   * 200);
	u1_loop.set_dx(u1.c * 200);
	u1_loop.set_dy(u1.r * 200);

	const with_u1     = u1.c === b.c && u1.r === b.r;
	const over_u1     = u1.c === b.c && u1.r === b.r + 1;
	const under_u1    = u1.c === b.c && u1.r === b.r - 1;
	const left_of_u1  = u1.c === b.c + 1 && u1.r === b.r;
	const right_of_u1 = u1.c === b.c - 1 && u1.r === b.r;

	if (!with_u1 && b.c === 0 && b.r === 3) {
		g.delay(.5).starts(() => {
			b_loop.set_dx(b.c - 190);
		}).start();
		return;
	}

	if (b.c > 0) {
		// consider left
		if (!right_of_u1) {
			t[b.c - 1][b.r].start();
		}
	}
	if (b.c < 1) {
		// consider right
		if (!left_of_u1) {
			t[b.c + 1][b.r].start();

		}
	}
	if (b.r < 3) {
		// consider down
		t[b.c][b.r + 1].start();
	}
	if (b.r > 0) {
		//consider up
		if (!under_u1) {
			t[b.c][b.r - 1].start();
		}
	}
}

window.addEventListener('load', () => {
	grid.start();
	border.start();
	b_loop.start();
	u1_loop.start();
	view();
});
