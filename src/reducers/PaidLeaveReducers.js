import {createStore} from "redux";
import {
    ADD_PAID_LEAVE,
    DELETE_PAID_LEAVE,
    CHANGE_EMPLOYEE_ID,
    CHANGE_APPROVE_ID,
    CHANGE_PAID_LEAVE,
    CHANGE_MESSAGE
} from "../actions/PaidLeaveActions";
import {formatDate} from "../common/common";
import moment from "moment";

const initData = {
    employeeId: '',
    approveId: '',
    paidLeave: [formatDate(moment(new Date()).toString())],
    startDate: formatDate(moment(new Date()).toString()),
    endDate: formatDate(moment(new Date()).add(1, 'days').toString()),
    message: {
        employee: '',
        approve: '',
        default: '',
        period: '',
    },
    mode: 'default', // default and period
};

// レデューサー
export function paidLeaveReducer(state = initData, action) {
    switch (action.type) {
        case ADD_PAID_LEAVE:
            return addPaidLeaveReduce(state, action);
        case DELETE_PAID_LEAVE:
            return deletePaidLeaveReduce(state, action);
        case CHANGE_EMPLOYEE_ID:
            return changeEmployeeIdReduce(state, action);
        case CHANGE_APPROVE_ID:
            return changeApproveIdReduce(state, action);
        case CHANGE_PAID_LEAVE:
            return changePaidLeaveReduce(state, action);
        case CHANGE_MESSAGE:
            return changeMessageReduce(state, action);
        default:
            return state;
    }
}

function addPaidLeaveReduce(state, action) {
    const _paidLeave = [...state.paidLeave];
    let date = formatDate(new Date().toString());
    _paidLeave.push(date.toString());
    const _message = {
        employee: state.message.employee,
        approve: state.message.approve,
        default: '',
        period: state.message.period,
    };
    return {
        ...state,
        paidLeave: _paidLeave,
        message: _message,
    };
}

function deletePaidLeaveReduce(state, action) {
    const payload = action.payload;
    const _paidLeave = [...state.paidLeave];
    _paidLeave.splice(payload.index, 1);

    return {
        ...state,
        paidLeave: _paidLeave,
    };
}

function changeEmployeeIdReduce(state, action) {
    const payload = action.payload;
    const _message = {
        employee: payload.message.employee,
        approve: state.message.approve,
        default: state.message.default,
        period: state.message.period,
    };
    return {
        ...state,
        employeeId: payload.employeeId,
        message: _message,
    };
}

function changeApproveIdReduce(state, action) {
    const payload = action.payload;
    const _message = {
        employee: state.message.employee,
        approve: payload.message.approve,
        default: state.message.default,
        period: state.message.period,
    };
    return {
        ...state,
        approveId: payload.approveId,
        message: _message,
    };
}

function changePaidLeaveReduce(state, action) {
    const payload = action.payload;

    if (!payload.isStartDate && !payload.isEndDate) {
        const _paidLeave = [...state.paidLeave];
        _paidLeave[payload.index] = payload.date;

        return {
            ...state,
            paidLeave: _paidLeave,
        };
    } else if (payload.isStartDate && !payload.isEndDate) {
        return {
            ...state,
            startDate: payload.date,
        };
    } else if (!payload.isStartDate && payload.isEndDate) {
        return {
            ...state,
            endDate: payload.date,
        };
    }
    return state;
}

function changeMessageReduce(state, action) {
    const payload = action.payload;
    return {
        ...state,
        message: {
            employee: payload.message.employee,
            approve: payload.message.approve,
            default: payload.message.default,
            period: payload.message.period,
        },
    };
}

export default createStore(paidLeaveReducer);