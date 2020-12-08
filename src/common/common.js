import moment from "moment";

export const formatDate = (date) => {
    return moment(date,'YYYY-MM-DD').format('YYYY-MM-DD');
};

export const addDate = (date,addDays) => {
    const addDate = moment(date,'YYYY-MM-DD').add(addDays,'days').format('YYYY-MM-DD');
    return addDate.toString();
};

export const diffDate = (to,from) => {
    const toDate = moment(to,'YYYY-MM-DD');
    const fromDate = moment(from,'YYYY-MM-DD');
    return toDate.diff(fromDate,'days');
};

// 年度を取得する場合は3ヶ月前を計算する
export const getYear = (date) => {
    return moment(date, 'YYYY-MM-DD').subtract(3, 'months').year().toString();
};