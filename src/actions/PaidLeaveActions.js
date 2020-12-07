export const ADD_PAID_LEAVE = "ADD_PAID_LEAVE";
export const DELETE_PAID_LEAVE = "DELETE_PAID_LEAVE";
export const CHANGE_EMPLOYEE_ID = "CHANGE_EMPLOYEE_ID";
export const CHANGE_APPROVE_ID = "CHANGE_APPROVE_ID";
export const CHANGE_PAID_LEAVE = "CHANGE_PAID_LEAVE";
export const CHANGE_MESSAGE = "CHANGE_MESSAGE";

export const addPaidLeave = (payload) => ({
    type:ADD_PAID_LEAVE,
    payload
});

export const deletePaidLeave = (payload) => ({
    type:DELETE_PAID_LEAVE,
    payload
});

export const changeEmployeeId = (payload) => ({
    type:CHANGE_EMPLOYEE_ID,
    payload
});

export const changeApproveId = (payload) => ({
    type:CHANGE_APPROVE_ID,
    payload
});

export const changePaidLeave = (payload) => ({
    type:CHANGE_PAID_LEAVE,
    payload
});

export const changeMessage = (payload) => ({
    type:CHANGE_MESSAGE,
    payload
});