const initial_state = {
	page: 'grid1',
	version: '7',
	grid1: { back: 'doors', arrow1: false, arrow2: false },
	doors: { back: 'grid1', circle: false, square: false, triangle: false }
};

let state = null;

export const get_state = page => {
	if (typeof(page) === 'undefined') {
		return state;
	} else {
		return state[page];
	}
};

export const save_state = () => {
	localStorage.setItem('doors', JSON.stringify(state));
};

// export const goto = page => {
// 	state.page = page;
// //	const i = state.pages.indexOf(page);
// //	if (i === -1) throw new Error('unknown page: ' + page);
// //	state.visited[i] = true;
// 	save_state();
// 	location.replace('../' + page);
// };


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
		location.replace('../' + state.page);
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
	location.replace('../' + state.page);
}
