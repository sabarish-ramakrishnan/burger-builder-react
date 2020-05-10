

export const getCurrentDate = (separator = '') => {

    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const formattedDate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
    const formattedTime = `${hours < 10 ? `0${hours}` : `${hours}`}${`:`}${minutes < 10 ? `0${minutes}` : `${minutes}`}${`:`}${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
    return formattedDate + ' ' + formattedTime;
    //return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}${` `}${hours < 10 ? `0${hours}` : `${hours}`}${`:`}${minutes < 10 ? `0${minutes}` : `${minutes}`}${`:`}${seconds < 10 ? `0${seconds}` : `${seconds}`}`
}

export const updateObject = (originalObject, updatedFields) => {
    return {
        ...originalObject,
        ...updatedFields
    }
}


export const validate = (formElement) => {
    let isValid = true;
    const val = formElement.value;

    const rules = formElement.validation;
    if (!rules)
        return isValid;

    if (rules.required) {
        isValid = val !== '' && isValid;
    }
    if (rules.maxlength) {
        isValid = val.length <= rules.maxlength && isValid;
    }
    if (rules.minlength) {
        isValid = val.length >= rules.minlength && isValid;
    }

    return isValid;
}