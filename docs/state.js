const initial_state = {
	version: '0',
	page: 'triangles',
	visited: ['triangles']
};

let state = null;

let state_string = localStorage.getItem('doors');

if (state_string === null) {
	state = initial_state;
	localStorage.setItem('doors', JSON.stringify(state));
} else {
	state = JSON.parse(state_string);
	if (!('version' in state) || state.version !== initial_state.version) {
		state = initial_state;
		localStorage.setItem('doors', JSON.stringify(state));
	}
}

let page = null;
const tokens = location.pathname.split('/');
if (tokens[tokens.length - 1].length === 0) {
	page = tokens[tokens.length - 2];
} else {
	page = tokens[tokens.length - 1];
}

if (page !== state.page) {
	location.replace('../' + state.page);
}

export const goto = page => {
	if (!state.visited.includes(page)) {
		state.visited.push(page);
	}
	state.page = page;
	localStorage.setItem('doors', JSON.stringify(state));
	location.replace('../' + page);
};

export const number_of_visited_pages = () => {
	return state.visited.length;
};
