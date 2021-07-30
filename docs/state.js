const initial_state = {
	page: 'grid3',
	version: '10'
};

let state = null;

export const save_state = () => {
	localStorage.setItem('doors', JSON.stringify(state));
};

// load state

let state_string = localStorage.getItem('doors');

if (state_string === null) {
	state = initial_state;
} else {
	state = JSON.parse(state_string);
	if (!('version' in state)) {
		state = initial_state;
	} else {
		if (state.version !== initial_state.version) {
			state = initial_state;
		}	
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
	save_state();
	location.replace('../' + state.page);
}

export const get_state = (page, key) => {
	if (page === undefined) {
		return state;
	}
	if (!(page in state)) {
		state[page] = {};
	}
	if (key === undefined) {
		return state[page];
	}
	if (!(key in state[page])) {
		state[page][key] = false;
	}
	return state[page][key];
};

export const set_state = (page, key, value) => {
	if (key === undefined) {
		throw new Error('set_state called without key');
	}
	if (value === undefined) {
		value = true;
	}
	if (!(page in state)) {
		state[page] = {};
	}
	state[page][key] = value;
	save_state();
};

export const get_page = () => {
	return state.page;
};

export const get_page_state = key => {
	const page_state = get_state(get_page());
	if (!(key in page_state)) {
		return false;
	} else {
		return page_state[key];
	}
};

export const set_page_state = (key, value) => {
	if (value === undefined) {
		value = true;
	}
	set_state(get_page(), key, value);
};
