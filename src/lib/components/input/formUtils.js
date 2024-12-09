import { user } from "$lib/store";

export function areFieldsFilled(fields) {
    const keys = Object.keys(fields);
    let check = true;
    keys.forEach(key => { if (fields[key].value === "") { check = false; } })
    return check;
}

// doesn't work cuz of svelte reactivity (idk either)
export function assignUserInputToFields(fields) {
    const keys = Object.keys(fields);
    keys.forEach(key => {
        fields[key].value = document.getElementById(key).value;
    });
}

export async function communicateWithApi(url, callMethod, redirect) {
    let succesful = true;
    try {
        const res = await fetch(url, {method: callMethod});
        let data = await res.json();
        user.set(data);
        window.location.href = redirect;
    } catch (err) {
        succesful = false;
    }
    return succesful;
}