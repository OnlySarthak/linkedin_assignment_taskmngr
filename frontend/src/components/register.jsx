import { useState } from "react";
import { validateRegisterData } from "../utils/validation";



const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!email || !password || !name) {
            setError("All fields are required");
            return;
        }

        const isValid = validateRegisterData(email, password, name);
        if (!isValid) {
            setError("Invalid email, password");
            return;
        }

        const response = await fetch( import.meta.env.VITE_BACKEND_API_URL + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, username : name })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "/login";
        } else {
            setError(data.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register</legend>
                <label className="label">Name</label>
                <input 
                    type="text"
                    className="input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="label">Email</label>
                <input 
                    type="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label">Password</label>
                <input 
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="text-error">{error}</div>}
                <button className="btn btn-neutral mt-4" onClick={() => handleRegister()}>Register</button>
                <div className="divider">OR</div>
                <button className="btn btn-ghost mt-4" onClick={() => window.location.href = "/login"}>Back to Login</button>
            </fieldset>
        </div>
    )
}   

export default Register