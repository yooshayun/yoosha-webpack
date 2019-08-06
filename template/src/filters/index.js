export function formatDate (now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return year + '-' + month + '-' + date;
}

export function formDateTime (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};
