import g from '../canvasapp.js';

g.set_design_size(668, 1080);

const b_frames = g.frames(i_b);
const o_frames = g.frames(i_o);
const p_frames = g.frames(i_p);

const b00 = g.loop(b_frames, 10, -200,   0);
const b01 = g.loop(b_frames, 10, -200, 200);
const b02 = g.loop(b_frames, 10, -200, 400);
const b10 = g.loop(b_frames, 10,    0,   0);
const b11 = g.loop(b_frames, 10,    0, 200);
const b12 = g.loop(b_frames, 10,    0, 400);

const o10 = g.loop(o_frames, 10, 0,    0);
const o11 = g.loop(o_frames, 10, 0,  200);

const p11 = g.loop(p_frames, 10, 0, -200);
const p12 = g.loop(p_frames, 10, 0,    0);

const arrow1 = g.loop(g.frames(i_arrow1));
const arrow2 = g.loop(g.frames(i_arrow2));

const t00 = g.touch(g.rect(104, 184, 320, 384));
const t01 = g.touch(g.rect(104, 394, 320, 604));
const t02 = g.touch(g.rect(104, 630, 320, 811));

const t10 = g.touch(g.rect(320, 184, 526, 384));
const t11 = g.touch(g.rect(320, 394, 526, 604));
const t12 = g.touch(g.rect(320, 630, 526, 811));

t00.stops(b10, b01).starts(b00, t10, t01);
t01.stops(b00, b11, b02).starts(b01, t00, t11, t02);
t02.stops(b12, b01).starts(b02, t01, t12);

t10.starts(() => {
	if (b00.started()) {
		b00.stop();
		if (o11.started()) {
			b10.start();
			g.delay(.6).starts(() => b10.stop()).start();
			g.delay(1.2).starts(g.goto('doors')).start();
			const s = g.get_state('grid1');
			s.arrow1 = true;
			arrow1.start();
			g.save_state();
			return;
		}
	} else {
		b11.stop();
		o11.stop();
		o10.start();
	}
	b10.start();
	t00.start();
	if (p12.started()) {
		t11.start();
	}
});

t11.starts(() => {
	if (b10.started()) {
		b10.stop();
		o10.stop();
		o11.start();
	} else if (b01.started()) {
		b01.stop();
	} else {
		b12.stop();
		p12.stop();
		p11.start();
	}
	b11.start();
	if (o11.started()) {
		t10.start();
	} else if (p11.started()) {
		t12.start();
	}
	t01.start();
});

t12.starts(() => {
	if (b02.started()) {
		b02.stop();
		if (p11.started()) {
			b12.start();
			g.delay(.6).starts(() => b12.stop()).start();
			g.delay(1.2).starts(g.goto('doors')).start();
			const s = g.get_state('grid1');
			s.arrow2 = true;
			g.save_state();
			arrow2.start();
			return;
		}
	} else {
		b11.stop();
		p11.stop();
		p12.start();
	}
	b12.start();
	t02.start();
	if (o10.started()) {
		t11.start();
	}
});

//const arrow1_touch = g.touch(g.circle(600, 280, 50)).make_independent().starts(g.goto('doors'));
//const arrow2_touch = g.touch(g.circle(600, 700, 50)).make_independent().starts(g.goto('doors'));

window.addEventListener('load', () => {
	b11.start();
	o10.start();
	p12.start();
	t01.start();
	if (g.get_state('grid1').arrow1) {
		arrow1.start();
	}
	if (g.get_state('grid1').arrow2) {
		arrow2.start();
	}
});
