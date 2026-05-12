import { isValidPhoneNumber } from "libphonenumber-js";

export const validatePhoneNumber = (value?: string) => {
    if (!value) return "Phone number is required";

    const isValid = isValidPhoneNumber(value);

    if (!isValid) {
        return "Invalid phone number";
    }

    return true;
};