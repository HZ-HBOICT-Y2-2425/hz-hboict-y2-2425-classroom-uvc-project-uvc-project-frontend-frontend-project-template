export function areFieldsFilled(fields) {
    const keys = Object.keys(fields);
    let check = true;
    keys.forEach(key => { if (fields[key].value === "") { check = false; } })
    return check
}

export function assignUserInputToFields(fields) {
    const keys = Object.keys(fields);
    keys.forEach(key => { fields[key].value = document.getElementById(key).value; });
}