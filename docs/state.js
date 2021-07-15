const initial_state = {
	version: '1',
	pages: [ 'doors', 'triangles', 'circles', 'red', 'blue', 'squares', 's1', 's2' ],
	page: 'triangles',
	visited: [ false, true, false, false, false, false, false, false ]
};

let state = null;

export const get_state = () => state;

export const save_state = () => {
	localStorage.setItem('doors', JSON.stringify(state));
};

export const goto = page => {
	state.page = page;
	state.visited[state.pages.indexOf(page)] = true;
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
