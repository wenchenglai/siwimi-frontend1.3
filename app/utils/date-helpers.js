function formatDate(date, format) {
    if (date) {
        return window.moment(date).format(format);
    } else {
        return "";
    }
}

export default {
  formatDate
};