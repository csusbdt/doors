import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const blue_border = g.loop(g.frames(i_blue_border));
const blue        = g.loop(g.frames(i_blue       ));
const red_border  = g.loop(g.frames(i_red_border ));
const red         = g.loop(g.frames(i_red        ));

const r = [
	g.loop(g.frames(i_r0)),
	g.loop(g.frames(i_r1)),
	g.loop(g.frames(i_r2)),
	g.loop(g.frames(i_r3)),
	g.loop(g.frames(i_r4)),
	g.loop(g.frames(i_r5)),
	g.loop(g.frames(i_r6))
];

const b = [
	g.loop(g.frames(i_b0)),
	g.loop(g.frames(i_b1)),
	g.loop(g.frames(i_b2)),
	g.loop(g.frames(i_b3)),
	g.loop(g.frames(i_b4)),
	g.loop(g.frames(i_b5)),
	g.loop(g.frames(i_b6))
];

const c = [
	g.circle(350,  97, 70),
	g.circle(350, 261, 70),
	g.circle(344, 410, 70),
	g.circle(346, 550, 70),
	g.circle(336, 704, 70),
	g.circle(330, 845, 70),
	g.circle(328, 987, 70)
];

const u = g.touch(g.rect(0, 0, 668, 1080)).make_independent();

const t = new Array(7);

for (let i = 0; i < 7; ++i) {
	t[i] = g.touch(c[i]).make_independent();
}

let s = [1, 1, 1, 0, 2, 2, 2];

const move = (src, dst) => {
	if (s[src] === 1) {
		r[src].stop();
		r[dst].start();
	} else {
		b[src].stop();
		b[dst].start();
	}
	s[dst] = s[src];
	s[src] = 0;
};

t[0].starts(() => {
	if      (s[0] === 1 && s[1] === 0              ) move(0, 1);
	else if (s[0] === 1 && s[1] === 2 && s[2] === 0) move(0, 2);
});

t[1].starts(() => {
	if      (s[1] === 1 && s[2] === 0              ) move(1, 2);
	else if (s[1] === 1 && s[2] === 2 && s[3] === 0) move(1, 3);
	else if (s[1] === 2 && s[0] === 0              ) move(1, 0);
});

t[2].starts(() => {
	if      (s[2] === 1 && s[3] === 0              ) move(2, 3);
	else if (s[2] === 1 && s[3] === 2 && s[4] === 0) move(2, 4);
	else if (s[2] === 2 && s[1] === 0              ) move(2, 1);
	else if (s[2] === 2 && s[1] === 1 && s[0] === 0) move(2, 0);
});

t[3].starts(() => {
	if (s[3] === 1 && s[4] === 0) {
		move(3, 4);
		if (s[5] === 1 && s[6] === 1) {
			t.forEach(o => o.stop());
			u.stop();
			g.set_page_state('red');
			red.start();
			g.delay(1).starts(g.goto('house')).start();	
		}
	} else if (s[3] === 1 && s[4] === 2 && s[5] === 0) move(3, 5);
	else if (s[3] === 2 && s[2] === 0              ) {
		move(3, 2);
		if (s[1] === 2 && s[0] === 2) {
			t.forEach(o => o.stop());
			u.stop();
			g.set_page_state('blue');
			blue.start();
			g.delay(1).starts(g.goto('doors')).start();
		}
	} else if (s[3] === 2 && s[2] === 1 && s[1] === 0) move(3, 1);
});

t[4].starts(() => {
	if      (s[4] === 1 && s[5] === 0              ) move(4, 5);
	else if (s[4] === 1 && s[5] === 2 && s[6] === 0) move(4, 6);
	else if (s[4] === 2 && s[3] === 0              ) move(4, 3);
	else if (s[4] === 2 && s[3] === 1 && s[2] === 0) move(4, 2);
});

t[5].starts(() => {
	if      (s[5] === 1 && s[6] === 0              ) move(5, 6);
	else if (s[5] === 2 && s[4] === 0              ) move(5, 4);
	else if (s[5] === 2 && s[4] === 1 && s[3] === 0) move(5, 3);
});

t[6].starts(() => {
	if      (s[6] === 2 && s[5] === 0              ) move(6, 5);
	else if (s[6] === 2 && s[5] === 1 && s[4] === 0) move(6, 4);
});

const reset = () => {
	s = [1, 1, 1, 0, 2, 2, 2];
	r.forEach(o => o.stop());
	b.forEach(o => o.stop());
	r[0].start();
	r[1].start();
	r[2].start();
	b[4].start();
	b[5].start();
	b[6].start();
};

u.starts(reset);

window.addEventListener('load', () => {
	if (g.get_page_state('red')) {
		red.start();
	} else {
		red_border.start();
	}
	if (g.get_page_state('blue')) {
		blue.start();
	} else {
		blue_border.start();
	}
	reset();
	t.forEach(o => o.start());
	u.start();
});
