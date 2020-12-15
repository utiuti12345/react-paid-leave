import {createStore} from "redux";
import {
    ADD_PAID_LEAVE,
    DELETE_PAID_LEAVE,
    CHANGE_EMPLOYEE_ID,
    CHANGE_APPROVE_ID,
    CHANGE_PAID_LEAVE,
    CHANGE_VALIDATION_MESSAGE,
    CHANGE_STATUS_MESSAGE,
    CHANGE_PROGRESS,
    CHANGE_ISGOOGLESIGNIN
} from "../actions/PaidLeaveActions";
import {addDate, formatDate} from "../common/common";

const initData = {
    employeeId: '',
    approveId: '',
    paidLeave: [formatDate(new Date()).toString()],
    startDate: formatDate(new Date()).toString(),
    endDate: formatDate(addDate(new Date(), 1)),
    validationMessage: {
        employee: '',
        approve: '',
        default: '',
        period: '',
    },
    statusMessage: {
        open: false,
        type: '',
        requestResponseMessage: '',
    },
    progress: false,
    mode: 'default', // default and period
    isGoogleSignedIn: null,
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
        case CHANGE_VALIDATION_MESSAGE:
            return changeValidationMessageReduce(state, action);
        case CHANGE_STATUS_MESSAGE:
            return changeStatusMessage(state, action);
        case CHANGE_PROGRESS:
            return changeProgress(state, action);
        case CHANGE_ISGOOGLESIGNIN:
            return changeIsGoogleSignedIn(state, action);
        default:
            return state;
    }
}

function addPaidLeaveReduce(state, action) {
    const _paidLeave = [...state.paidLeave];
    let date = formatDate(new Date()).toString();
    _paidLeave.push(date.toString());
    const _message = {
        employee: state.validationMessage.employee,
        approve: state.validationMessage.approve,
        default: '',
        period: state.validationMessage.period,
    };
    return {
        ...state,
        paidLeave: _paidLeave,
        validationMessage: _message,
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
        employee: payload.validationMessage.employee,
        approve: state.validationMessage.approve,
        default: state.validationMessage.default,
        period: state.validationMessage.period,
    };
    return {
        ...state,
        employeeId: payload.employeeId,
        validationMessage: _message,
    };
}

function changeApproveIdReduce(state, action) {
    const payload = action.payload;
    const _message = {
        employee: state.validationMessage.employee,
        approve: payload.validationMessage.approve,
        default: state.validationMessage.default,
        period: state.validationMessage.period,
    };
    return {
        ...state,
        approveId: payload.approveId,
        validationMessage: _message,
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

function changeValidationMessageReduce(state, action) {
    const payload = action.payload;
    return {
        ...state,
        validationMessage: {
            employee: payload.validationMessage.employee,
            approve: payload.validationMessage.approve,
            default: payload.validationMessage.default,
            period: payload.validationMessage.period,
        },
    };
}

function changeStatusMessage(state, action) {
    const payload = action.payload;
    console.log(payload);
    return {
        ...state,
        statusMessage: {
            open: payload.open,
            type: payload.type,
            requestResponseMessage: payload.requestResponseMessage,
        },
    };
}

function changeProgress(state, action) {
    const payload = action.payload;
    return {
        ...state,
        progress: payload.progress,
    };
}

function changeIsGoogleSignedIn(state, action) {
    const payload = action.payload;
    return {
        ...state,
        isGoogleSignedIn: payload.isGoogleSignedIn,
    };
}

export default createStore(paidLeaveReducer);