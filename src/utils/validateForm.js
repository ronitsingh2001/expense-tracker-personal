const validateForm = (email, password, fullName = null) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = fullName !== null ? fullName?.length > 0 : true;

    if (!isEmailValid)
        return "Email Id is not valid!";
    else if (!isPasswordValid)
        return "Password is not valid!";
    else if (!isNameValid)
        return "Name is not valid!";
    else
        return null;
};

export default validateForm;