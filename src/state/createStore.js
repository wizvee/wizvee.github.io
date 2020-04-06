import { createStore } from 'redux';

const SET_TAG = 'tag/SET_TAG';

export const setTag = (tag) => ({ type: SET_TAG, tag });

const initialState = {
  tag: 'All',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAG:
      return {
        ...state,
        tag: action.tag,
      };
    default:
      return state;
  }
}

export default (preloadedState) => {
  return createStore(reducer, preloadedState);
};
