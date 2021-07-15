const initial_state = {
	version: '2',
	pages: [ 'doors', 'triangles', 'circles', 'red', 'blue', 's1' ],
	page: 'triangles',
	visited: []
};
for (let i = 0; i < initial_state.pages.length; ++i) {
	if (i === 1) {
		initial_state.visited.push(true);
	} else {
		initial_state.visited.push(false);
	}
}

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
