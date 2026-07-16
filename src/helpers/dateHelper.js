function formatDate(date) {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1,
    ).padStart(2, '0');

    const day = String(
        date.getDate(),
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function createLoanDates() {
    const loanDate = new Date();
    const returnDate = new Date(loanDate);

    returnDate.setDate(returnDate.getDate() + 14);

    return {
        loanDate: formatDate(loanDate),
        returnDate: formatDate(returnDate),
    };
}