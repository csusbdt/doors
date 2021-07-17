const initial_state = {
	version: '6',
	pages: [ 'doors', 'triangles', 'circles', 'red', 'box', 'car' ],
	page: 'doors',
	visited: [],
	solved: [],
	back: []
};
for (let i = 0; i < initial_state.pages.length; ++i) {
	initial_state.visited.push(false);
	initial_state.solved.push(false);
	initial_state.back.push(null);
}
initial_state.visited[0] = true;

let state = null;

export const get_state = () => state;

export const save_state = () => {
	localStorage.setItem('doors', JSON.stringify(state));
};

export const visited = page => {
	const i = state.pages.indexOf(page);
	if (i === -1) throw new Error('unknown page: ' + page);
	return state.visited[i];
};

export const goto = page => {
	state.page = page;
	const i = state.pages.indexOf(page);
	if (i === -1) throw new Error('unknown page: ' + page);
	state.visited[i] = true;
	save_state();
	location.replace('../' + page);
};


// load state 

let state_string = localStorage.getItem('doors');

if (state_string === null) {
	state = initial_state;
	save_state();
} else {
	state = JSON.parse(state_string);
	if (!('version' in state) || state.version !== initial_state.version) {
		state = initial_state;
		save_state();
	}
}

// check current page

let page = null;
const tokens = location.pathname.split('/');
if (tokens[tokens.length - 1].length === 0) {
	page = tokens[tokens.length - 2];
} else {
	page = tokens[tokens.length - 1];
}

if (page !== state.page) {
	goto(state.page);
}
