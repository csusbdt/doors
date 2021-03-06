const cols = 3;
const rows = 3;

const objs    = [];
const hazards = [];

function c_hazard_left (c, r) { this.c = c; this.r = r; }
function c_hazard_right(c, r) { this.c = c; this.r = r; }
function c_hazard_up   (c, r) { this.c = c; this.r = r; }
function c_hazard_down (c, r) { this.c = c; this.r = r; }

c_hazard_left.prototype.blocked = function(...os) {
	return os.some(o => o.constructor !== c_left1 && o.constructor !== c_left2)
};

c_hazard_right.prototype.blocked = function(...os) {
	return os.some(o => o.constructor !== c_right1 && o.constructor !== c_right2)
};

c_hazard_up.prototype.blocked = function(...os) {
	return os.some(o => o.constructor !== c_up1 && o.constructor !== c_up2)
};

c_hazard_down.prototype.blocked = function(...os) {
	return os.some(o => o.constructor !== c_down1 && o.constructor !== c_down2)
};

function c_object(c, r) {
	if (c < 0 || c >= cols || r < 0 || r >= rows) {
		throw new Error('coordinates not in grid');
	}
	this.c = c;
	this.r = r;
}

function can(m) {
	let d1 = null;
	let d2 = null;
	let s1 = null;
	let s2 = null;
	let potential_hazards = null;
	if (m === 'left') {
		if (c === 0) return false;
		d1 = objs.find(o => o.c === c - 1 && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor));
		if (d1 && d1.constructor !== c_right1) return false;
		d2 = objs.find(o => o.c === c - 1 && o.r === r && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor));
		if (d2 && d2.constructor !== c_right2) return false;
		s2 = objs.find(o => o.c === c && o.r === r && [c_right2, c_up2, c_down2].includes(o.constructor));
		if (s2 && (d1 || d2)) return false;
		s1 = s2 ? 
			objs.find(o => o.c === c && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor)) :
			objs.find(o => o.c === c && o.r === r && [         c_right1, c_up1, c_down1].includes(o.constructor))
		if (d1 && s1) return false;
		potential_hazards = hazards.filter(h => h.c === c - 1 && h.r === r);
	} else if (m === 'right') {
		if (c === cols - 1) return false;
		d1 = objs.find(o => o.c === c + 1 && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor));
		if (d1 && d1.constructor !== c_left1) return false;
		d2 = objs.find(o => o.c === c + 1 && o.r === r && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor));
		if (d2 && d2.constructor !== c_left2) return false;
		s2 = objs.find(o => o.c === c && o.r === r && [c_left2, c_up2, c_down2].includes(o.constructor));
		if (s2 && (d1 || d2)) return false;
		s1 = s2 ? 
			objs.find(o => o.c === c && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor)) :
			objs.find(o => o.c === c && o.r === r && [c_left1,           c_up1, c_down1].includes(o.constructor))
		if (d1 && s1) return false;
		potential_hazards = hazards.filter(h => h.c === c + 1 && h.r === r);
	} else if (m === 'up') {
		if (r === 0) return false;
		d1 = objs.find(o => o.c === c && o.r === r - 1 && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor));
		if (d1 && d1.constructor !== c_down1) return false;
		d2 = objs.find(o => o.c === c && o.r === r - 1 && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor));
		if (d2 && d2.constructor !== c_down2) return false;
		s2 = objs.find(o => o.c === c && o.r === r && [c_left2, c_right2, c_down2].includes(o.constructor));
		if (s2 && (d1 || d2)) return false;
		s1 = s2 ? 
			objs.find(o => o.c === c && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor)) :
			objs.find(o => o.c === c && o.r === r && [c_left1, c_right1, c_up1         ].includes(o.constructor))
		if (d1 && s1) return false;
		potential_hazards = hazards.filter(h => h.c === c && h.r === r - 1);
	} else if (m === 'down') {
		if (r === rows - 1) return false;
		d1 = objs.find(o => o.c === c && o.r === r + 1 && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor));
		if (d1 && d1.constructor !== c_up1) return false;
		d2 = objs.find(o => o.c === c && o.r === r + 1 && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor));
		if (d2 && d2.constructor !== c_up2) return false;
		s2 = objs.find(o => o.c === c && o.r === r && [c_left2, c_right2, c_up2].includes(o.constructor));
		if (s2 && (d1 || d2)) return false;
		s1 = s2 ? 
			objs.find(o => o.c === c && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor)) :
			objs.find(o => o.c === c && o.r === r && [c_left1, c_right1,        c_down1].includes(o.constructor))
		if (d1 && s1) return false;
		potential_hazards = hazards.filter(h => h.c === c && h.r === r + 1);
	}
	for (let i = 0; i < potential_hazards.length; ++i) {
		const h = potential_hazards[i];
		if ([d1, d2, s1, s2].some(o => o && h.blocked(o))) {
			continue;
		} else {
			return false;
		}
	}
	return true;
}

function move(m) {
	const s1 = objs.find(o => o.c === c && o.r === r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor));
	const s2 = objs.find(o => o.c === c && o.r === r && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor));
	if (m === 'left') {
		--c;
		if (s2 && s2.constructor !== c_left2) {
			--s2.c;
			if (s1) --s1.c;
		} else if (s1 && s1.constructor !== c_left1) --s1.c;
	} else if (m === 'right') {
		++c;
		if (s2 && s2.constructor !== c_right2) {
			++s2.c;
			if (s1) ++s1.c;
		} else if (s1 && s1.constructor !== c_right1) ++s1.c;
	} else if (m === 'up') {
		--r;
		if (s2 && s2.constructor !== c_up2) {
			--s2.r;
			if (s1) --s1.r;
		} else if (s1 && s1.constructor !== c_up1) --s1.r;
	} else if (m === 'down') {
		++r;
		if (s2 && s2.constructor !== c_down2) {
			++s2.r;
			if (s1) ++s1.r;
		} else if (s1 && s1.constructor !== c_down1) ++s1.r;
	}
}

function c_left1(c, r) {
	c_object.call(this, c, r);
	this.cohabitables   = [ c_box, c_left2, c_right2, c_up2, c_down2 ];
}

function c_right1(c, r) {
	c_object.call(this, c, r);
}

function c_up1(c, r) {
	c_object.call(this, c, r);
}

function c_down1(c, r) {
	c_object.call(this, c, r);
}

function c_left2(c, r) {
	c_object.call(this, c, r);
}

function c_right2(c, r) {
	c_object.call(this, c, r);
}

function c_up2(c, r) {
	c_object.call(this, c, r);
}

function c_down2(c, r) {
	c_object.call(this, c, r);
}

c_left1.prototype  = Object.create(c_object.prototype);
c_right1.prototype = Object.create(c_object.prototype);
c_up1.prototype    = Object.create(c_object.prototype);
c_down1.prototype  = Object.create(c_object.prototype);
c_left2.prototype  = Object.create(c_object.prototype);
c_right2.prototype = Object.create(c_object.prototype);
c_up2.prototype    = Object.create(c_object.prototype);
c_down2.prototype  = Object.create(c_object.prototype);

Object.defineProperty(c_left1.prototype , 'constructor', { value: c_left1 , enumerable: false, writable: true });
Object.defineProperty(c_right1.prototype, 'constructor', { value: c_right1, enumerable: false, writable: true });
Object.defineProperty(c_up1.prototype   , 'constructor', { value: c_up1   , enumerable: false, writable: true });
Object.defineProperty(c_down1.prototype , 'constructor', { value: c_down1 , enumerable: false, writable: true });
Object.defineProperty(c_left2.prototype , 'constructor', { value: c_left2 , enumerable: false, writable: true });
Object.defineProperty(c_right2.prototype, 'constructor', { value: c_right2, enumerable: false, writable: true });
Object.defineProperty(c_up2.prototype   , 'constructor', { value: c_up2   , enumerable: false, writable: true });
Object.defineProperty(c_down2.prototype , 'constructor', { value: c_down2 , enumerable: false, writable: true });

function state() {
	let s = '' + c + r;
	for (let i = 0; i < objs.length; ++i) {
		const o = objs[i];
		if (o instanceof c_object) {
			s = s + o.c + o.r;
		}
	}
	return s;
}

function expand(s) {
	let j = 0;
	c = parseInt(s.charAt(j++));
	r = parseInt(s.charAt(j++));
	for (let i = 0; i < objs.length; ++i) {
		const o = objs[i];
		if (o instanceof c_object) {
			o.c = parseInt(s.charAt(j++));
			o.r = parseInt(s.charAt(j++));
		}
	}
}

function goal() {
	if (c !== goal_c || r != goal_r) return false;
	for (let i = 0; i < objs.length; ++i) {
		const o = objs[i];
		if (o.c !== c || o.r !== r) continue;
		if (goal_dir === 'left') {
			if ([c_right1, c_up1, c_down1, c_right2, c_up2, c_down2].includes(o.constructor)) return false;
		} else if (goal_dir === 'right') {
			if ([c_left1, c_up1, c_down1, c_left2, c_up2, c_down2].includes(o.constructor)) return false;
		} else if (goal_dir === 'up') {
			if ([c_left1, c_right1, c_down1, c_left2, c_right2, c_down2].includes(o.constructor)) return false;
		} else if (goal_dir === 'down') {
			if ([c_left1, c_right1, c_up1, c_left2, c_right2, c_up2].includes(o.constructor)) return false;
		} else throw new Error();
	}
	return true;
}

function visit(s) {
	++visits;
	const p = paths.get(s);
	if (solution !== null && solution.length <= p.length + 1) {
		return;
	}
	const child_states_to_visit = [];
	['left', 'right', 'up', 'down'].forEach(m => {
		expand(s);
		if (!can(m)) return;
		move(m);
		const child_state = state();
		if (paths.has(child_state) && paths.get(child_state).length <= p.length + 1) {
			return;
		}
		const child_path = p.concat(m);
//		console.log(child_path);
		paths.set(child_state, child_path);
		if (goal()) {
			solution = child_path;
		} else {
			child_states_to_visit.push(child_state);
		}
	});
	child_states_to_visit.forEach(s => visit(s));
}

let goal_c   = 0;
let goal_r   = 2;
let goal_dir = 'left';
let c        = -1;
let r        = -1;
const paths  = new Map();
let visits   = 0;
let solution = null;
let output   = '';

function loop() {
	for (let d2_c = 0; d2_c < cols; ++d2_c) for (let d2_r = 0; d2_r < rows; ++d2_r) {
		for (let r2_c = 0; r2_c < cols; ++r2_c) for (let r2_r = 0; r2_r < rows; ++r2_r) {
			for (let l2_c = 0; l2_c < cols; ++l2_c) for (let l2_r = 0; l2_r < rows; ++l2_r) 
			for (let d1_c = 0; d1_c < cols; ++d1_c) for (let d1_r = 0; d1_r < rows; ++d1_r) 
			for (let u1_c = 0; u1_c < cols; ++u1_c) for (let u1_r = 0; u1_r < rows; ++u1_r)
			for (let r1_c = 0; r1_c < cols; ++r1_c) for (let r1_r = 0; r1_r < rows; ++r1_r) {
				paths.clear();
				objs.length = 0;
				hazards.length = 0;
				solution = null;
				visits = 0;
				if (goal()) continue; // degenerate case
				if (objs.some(o => o.c === r1_c && o.r === r1_r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor))) continue;
				objs.push(new c_right1(r1_c, r1_r));
				if (objs.some(o => o.c === u1_c && o.r === u1_r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor))) continue;
				objs.push(new c_up1(u1_c, u1_r));
				if (objs.some(o => o.c === d1_c && o.r === d1_r && [c_left1, c_right1, c_up1, c_down1].includes(o.constructor))) continue;
				objs.push(new c_down1(d1_c, d1_r));
				if (objs.some(o => o.c === l2_c && o.r === l2_r && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor))) continue;
				objs.push(new c_left2(l2_c, l2_r));
				if (objs.some(o => o.c === r2_c && o.r === r2_r && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor))) continue;
				objs.push(new c_right2(r2_c, r2_r));
				if (objs.some(o => o.c === d2_c && o.r === d2_r && [c_left2, c_right2, c_up2, c_down2].includes(o.constructor))) continue;
				objs.push(new c_down2(d2_c, d2_r));

				const potential_hazards  = hazards.filter(h => h.c === c && h.r === r);
				const potential_blockers = objs.filter(o => o.c === c && o.r === r);
				let hazard_free = true;
				for (let i = 0; i < potential_hazards.length; ++i) {
					const h = potential_hazards[i];
					if (potential_blockers.some(o => o && h.blocked(o))) {
						continue;
					} else {
						hazard_free = false;
						break;
					}
				}
				if (!hazard_free) continue;
				
				const initial_state = state();
				paths.set(state(), []);
				visit(state());
				if (solution !== null && solution.length > 35) {
					console.log(solution.length, initial_state, output);
				}
			}
		}
	}
}

const hazard_list = [
	//	[[2, 2, 'right']],
	//	[[2, 2, 'down']]
	[]
	];
	
const goal_list = [
//	[0, 0, 'left'], 
//	[0, 2, 'left'],
	[0, 1, 'left'] 
];

function scan_box() {
	for (let x_c = 0; x_c < cols; ++x_c) 
	for (let x_r = 0; x_r < rows; ++x_r) {
		c = x_c;
		r = x_r;
		loop();
	}
}

function goals() {
	goal_list.forEach(a => {
		output += ' ' + a;
		goal_c = a[0];
		goal_r = a[1];
		goal_dir = a[2];
		loop();
	});
}

hazard_list.forEach(a => {
	output = '';
	hazards.length = 0;
	a.forEach(h => {
		output += ' ' + h;
		if (h[2] === 'left') {
			hazards.push(new c_hazard_left(h[0], h[1]));
		} else if (h[2] === 'right') {
			hazards.push(new c_hazard_right(h[0], h[1]));
		} else if (h[2] === 'up') {
			hazards.push(new c_hazard_up(h[0], h[1]));
		} else if (h[2] === 'down') {
			hazards.push(new c_hazard_down(h[0], h[1]));
		} else throw new Error();
	});
	goals();
});
