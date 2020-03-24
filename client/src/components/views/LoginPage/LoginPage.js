import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = e => {
        setEmail(e.target.value);
    };

    const onPasswordHandler = e => {
        setPassword(e.target.value);
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh"
            }}
        >
            <form style={{ display: "flex", flexDirection: "column" }}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
