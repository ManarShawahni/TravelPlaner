// Calculate remaining days until the departing date
const getRdays = (date) => {
    const departing = new Date(date);
    const today = new Date();
    const diffInDays = Math.ceil((departing - today) / (1000 * 60 * 60 * 24));
    console.log(diffInDays);
    return diffInDays;
};

export { getRdays };
