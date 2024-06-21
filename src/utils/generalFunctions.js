export const capitalizeString = (string) => {

    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const updateBtnDisbledState = (amount, category, payee) => {

    if (amount === '' || category === null || payee === null) {
        return true;
    }
    return false;

}