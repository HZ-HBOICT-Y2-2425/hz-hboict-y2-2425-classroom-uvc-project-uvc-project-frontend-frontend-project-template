export function areFieldsFilled(object) {
    const values = Object.values(object);
    const index = values.findIndex(value => value === "");
    if (index === -1) {
        return true;
    }
    return false;
}

export const baseInputClasses = "w-full px-4 py-2 mb-4 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border";