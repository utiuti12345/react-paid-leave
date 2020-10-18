import {createStore} from "redux";
import {
    ADD_PAID_LEAVE,
    DELETE_PAID_LEAVE,
    CHANGE_EMPLOYEE_ID,
    CHANGE_APPROVE_ID,
    CHANGE_PAID_LEAVE
} from "../actions/PaidLeaveActions";

const initData = {
    employeeId: '',
    approveId: '',
    paidLeave: [],
    startDate: '',
    endDate: '',
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
            console.log(action);
            return changePaidLeaveReduce(state,action);
        default:
            return state;
    }
}

function addPaidLeaveReduce(state, action) {
    const _paidLeave = [...state.paidLeave];
    _paidLeave.push('');

    return {
        employeeId: state.employeeId,
        approveId: state.approveId,
        paidLeave: _paidLeave,
        startDate: state.startDate,
        endDate: state.endDate,
        mode: state.mode, // default and period
    };
}

function deletePaidLeaveReduce(state, action) {
    const payload = action.payload;
    const _paidLeave = [...state.paidLeave];
    _paidLeave.splice(payload.index, 1);

    return {
        employeeId: action.employeeId,
        approveId: state.approveId,
        paidLeave: _paidLeave,
        startDate: state.startDate,
        endDate: state.endDate,
        mode: state.mode, // default and period
    };
}

function changeEmployeeIdReduce(state, action) {
    const payload = action.payload;
    console.log(payload.employeeId);
    return {
        employeeId: payload.employeeId,
        approveId: state.approveId,
        paidLeave: state.paidLeave,
        startDate: state.startDate,
        endDate: state.endDate,
        mode: state.mode, // default and period
    };
}

function changeApproveIdReduce(state, action) {
    const payload = action.payload;
    return {
        employeeId: state.employeeId,
        approveId: payload.approveId,
        paidLeave: state.paidLeave,
        startDate: state.startDate,
        endDate: state.endDate,
        mode: state.mode, // default and period
    };
}

function changePaidLeaveReduce(state, action) {
    const payload = action.payload;

    if(!payload.isStartDate && !payload.isEndDate){
        const _paidLeave = [...state.paidLeave];
        _paidLeave[payload.index] = payload.date;

        return {
            employeeId: state.employeeId,
            approveId: state.approveId,
            paidLeave: _paidLeave,
            startDate: state.startDate,
            endDate: state.endDate,
            mode: state.mode, // default and period
        };
    }else if(payload.isStartDate && !payload.isEndDate){
        console.log(payload.date);
        return {
            employeeId: state.employeeId,
            approveId: state.approveId,
            paidLeave: state.paidLeave,
            startDate: payload.date,
            endDate: state.endDate,
            mode: state.mode, // default and period
        };
    }else if(!payload.isStartDate && payload.isEndDate){
        console.log(payload.date);
        return {
            employeeId: state.employeeId,
            approveId: state.approveId,
            paidLeave: state.paidLeave,
            startDate: state.startDate,
            endDate: payload.date,
            mode: state.mode, // default and period
        };
    }
    return state;
}

export default createStore(paidLeaveReducer);