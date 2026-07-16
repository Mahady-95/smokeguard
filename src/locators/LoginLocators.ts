export class LoginLocators {

    public static readonly username = [

        "#username",
        "#user",
        "#login",

        "input[name='username']",
        "input[name='user']",
        "input[name='email']",

        "input[type='email']",

        "input[placeholder*='user' i]",
        "input[placeholder*='email' i]"

    ];

    public static readonly password = [

        "#password",

        "#pass",

        "input[type='password']",

        "input[name='password']"

    ];

    public static readonly submit = [

        "button[type='submit']",

        "input[type='submit']",

        "button:has-text('Login')",
        "button:has-text('Log In')",
        "button:has-text('Sign In')"

    ];

}