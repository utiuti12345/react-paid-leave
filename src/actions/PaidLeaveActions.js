export const ADD_PAID_LEAVE = "ADD_PAID_LEAVE";
export const DELETE_PAID_LEAVE = "DELETE_PAID_LEAVE";
export const CHANGE_EMPLOYEE_ID = "CHANGE_EMPLOYEE_ID";
export const CHANGE_APPROVE_ID = "CHANGE_APPROVE_ID";
export const CHANGE_PAID_LEAVE = "CHANGE_PAID_LEAVE";
export const CHANGE_VALIDATION_MESSAGE = "CHANGE_VALIDATION_MESSAGE";
export const CHANGE_STATUS_MESSAGE = "CHANGE_STATUS_MESSAGE";
export const CHANGE_PROGRESS = "CHANGE_PROGRESS";

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

export const changeValidationMessage = (payload) => ({
    type:CHANGE_VALIDATION_MESSAGE,
    payload
});

export const changeStatusMessage = (payload) => ({
    type:CHANGE_STATUS_MESSAGE,
    payload
});

export const changeProgress = (payload) => ({
    type:CHANGE_PROGRESS,
    payload
});