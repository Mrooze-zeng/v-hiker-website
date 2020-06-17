import Reducer from 'Reducer';
import { createStore } from 'redux';

export default createStore(
	Reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
