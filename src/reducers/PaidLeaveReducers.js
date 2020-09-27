

const initData = {
    data: [],
    message: 'please type message',
    mode: 'default',
    fdata: []
};

// レデューサー
export function memoReducer(state = initData, action) {
    switch (action.type) {
        case 'ADD':
            return state;
        default:
            return state;
    }
}