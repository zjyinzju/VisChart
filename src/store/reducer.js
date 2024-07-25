
// 不同请求的处理
// reducer.js

// reducer.js

const initialState = {
  category: 'seaSurface',
  // 其他状态
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    // 其他处理
    default:
      return state;
  }
}

export { initialState, reducer };

export default reducer;
