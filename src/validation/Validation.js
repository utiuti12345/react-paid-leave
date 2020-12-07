const EMPLOYEE_ERROR_MESSAGE = '社員名を選択してください。';
const APPROVE_ERROR_MESSAGE = '承認者を選択してください。';
const DEFAULT_ERROR_MESSAGE = '日程を確認してください。';
const PERIOD_ERROR_MESSAGE = '日程を確認してください。';

const employeeValidation = (id) => {
    if (id === '') return EMPLOYEE_ERROR_MESSAGE;
    return '';
};

const approveValidation = (id) => {
    if (id === '') return APPROVE_ERROR_MESSAGE;
    return '';
};

const paidLeaveValidation = (paidLeave) =>{
    if (paidLeave.length === 0) return DEFAULT_ERROR_MESSAGE;
    return '';
};

const periodValidation = (period) =>{
    if (period.startDate >= period.endDate) return PERIOD_ERROR_MESSAGE;
    return '';
};

class Validation {
    static formValidate = (type, value) => {
        switch (type) {
            case 'employeeId':
                return employeeValidation(value);
            case 'approveId':
                return approveValidation(value);
            case 'paidLeave':
                return paidLeaveValidation(value);
            case 'period':
                return periodValidation(value);
            default:
                return '';
        }
    };
}

export default Validation;