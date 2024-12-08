export function areFieldsFilled(fields) {
    const keys = Object.keys(fields);
    let check = true;
    keys.forEach(key => {
        if (fields[key].value === "") {
            check = false;
        }
    })
    console.log("check:", check)
    if (check) {
        return true;
    }
    return false;
}