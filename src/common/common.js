export const formatDate = (date) => {
    let today = new Date(date);
    today.setDate(today.getDate());
    let formatDate = 'YYYY-MM-DD';
    formatDate = formatDate.replace(/YYYY/, today.getFullYear());
    formatDate = formatDate.replace(/MM/, ("0"+(today.getMonth() + 1)).slice(-2));
    formatDate = formatDate.replace(/DD/, ("0"+today.getDate()).slice(-2));

    return formatDate;
};