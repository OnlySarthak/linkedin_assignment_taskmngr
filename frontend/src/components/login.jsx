import React, { useState } from "react";
import { validateLoginData } from "../utils/validation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        window.location.href = "/register";
    }
    
    const handleLogin = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        const isValid = validateLoginData(email, password);
        if (!isValid) {
            setError("Invalid email or password");
            return;
        }

        const response = await fetch( (import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api") + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },            
            credentials: "include",           
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            
            alert("Login successful!");
            window.location.href = "/"; 
        } else {
            setError(data.error || data.message || "Login failed");
        }

    };


    return (
        <div className="flex items-center justify-center h-screen">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

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

                <button className="btn btn-neutral mt-4" onClick={() => handleLogin()}>Login</button>
                <div className="divider">OR</div>
                <button className="btn btn-ghost mt-4" onClick={handleRegister}>Register</button>
            </fieldset>
        </div>
    )
}

export default Login