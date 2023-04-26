import {useState} from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/router";
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    function handleToggle() {
        setDarkMode(!darkMode);
    }

    const router = useRouter();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleBack = () => {
        router.push("/register").then(r =>
            console.log(r));
    };

    const login = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "User logged in") {
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("role", data.data.role);
                    router.push("/home").then(r => console.log(r));
                } else if (data.errors[0].msg === "Invalid credentials") {
                    alert("Invalid credentials");
                } else {
                    alert("Fill in all fields");
                }
            })
            .catch((err) => console.log(err));
    };


    return (
        <div>
            <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleToggle}
                    >
                        {darkMode ? <span>&#x2600; </span> : <span>&#127769;</span>}
                    </button>
                </div>
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email"
                                       className={`${darkMode ? 'text-white' : 'text-gray-900'} block text-sm font-medium leading-6`}>
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmail}
                                        autoComplete="email"
                                        required
                                        className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className={`${darkMode ? 'text-white' : 'text-gray-900'} block text-sm font-medium leading-6`}>
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#"
                                           className={`${darkMode ? 'text-indigo-400 hover:text-indigo-500' : 'text-indigo-600 hover:text-indigo-500'} font-semibold`}>
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={handlePassword}
                                        autoComplete="current-password"
                                        required
                                        className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className={`${darkMode ? 'bg-indigo-500 hover:bg-indigo-400 focus-visible:ring-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-indigo-600'} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus:outline
                                    -none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    onClick={login}
                                >
                                    Sign in
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className={`${darkMode ? 'bg-indigo-500 hover:bg-indigo-400 focus-visible:ring-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:ring-indigo-600'} flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus:outline
                                    -none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    onClick={handleBack}
                                >
                                    Register
                                </button>
                            </div>
                            <div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Login;
