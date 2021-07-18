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

const b_down = g.once(g.frames(i_blank)).starts(() => {
	b_loop.dy += 50;
})

const t = [ new Array(4), new Array(4) ];
for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		const x = 140 + c * 200;
		const y = 135 + r * 200;
		t[c][r] = g.touch(g.rect(x, y, x + 200, y + 200));
	}
}

const b  = { c: 0, r: 0};
const d1 = { c: 1, r: 1};

const step_down = () => {	
};

for (let c = 0; c < t.length; ++c) {
	for (let r = 0; r < t[0].length; ++r) {
		t[c][r].starts(() => {
			const with_d1 = d1.c === b.c && d1.r === b.r;
			if (b.c < c) {
				b.c += 1;
				if (with_d1) d1.c = b.c;
			} else if (b.c > c) {
				b.c -= 1;
				if (with_d1) d1.c = b.c;
			} else if (b.r < r) {
				b.r += 1;
			} else {
				b.r -= 1;
				if (with_d1) d1.r = b.r;
			}
			view();
		});
	}
}

const view = () => {
	b_loop.set_dx(b.c   * 200);
	b_loop.set_dy(b.r   * 200);
	d1_loop.set_dx(d1.c * 200);
	d1_loop.set_dy(d1.r * 200);
	if (b.c === 0 && b.r === t[0].length - 1 && (d1.c !== 0 || d1.r !== t[0].length)) {
		g.delay(.5).starts(() => {
			b_loop.set_dx(b.c - 190);
		}).start();
		return;
	}
	if (b.c > 0) {
		// left
		if (d1.c !== b.c - 1 || d1.r !== b.r) {
			t[b.c - 1][b.r].start();
		}
	}
	if (b.c < t.length - 1) {
		// right
		if (d1.c !== b.c + 1 || d1.r !== b.r) {
			t[b.c + 1][b.r].start();
		}
	}
	if (b.r < t[0].length - 1) {
		// down
		if (d1.c !== b.c || d1.r !== b.r + 1) {
			t[b.c][b.r + 1].start();
		}
	}
	if (b.r > 0) {
		t[b.c][b.r - 1].start();
	}
}

window.addEventListener('load', () => {
	grid.start();
	border.start();
	b_loop.start();
	d1_loop.start();
	view();
});
