export const LoginTestData = {
    urls: {
        base: "https://www.saucedemo.com/",
        inventory: "https://www.saucedemo.com/inventory.html"
    },
    credentials: {
        valid: {
            username: "standard_user",
            password: "secret_sauce"
        },
        invalid: {
            username: "locked_out_user",
            username2: "problem_users",
            password: "invalid_password"
        },
        empty: {
            username: "",
            password: ""
        }
    },
    errorMessages: {
        notMatch: "Epic sadface: Username and password do not match any user in this service",
        requiredUsername: "Epic sadface: Username is required",
        requiredPassword: "Epic sadface: Password is required",
        lockedOut: "Epic sadface: Sorry, this user has been locked out."
    }
};