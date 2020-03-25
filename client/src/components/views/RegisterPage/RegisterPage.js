import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

const RegisterPage = props => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = e => {
        setEmail(e.target.value);
    };

    const onPasswordHandler = e => {
        setPassword(e.target.value);
    };

    const onConfirmPasswordHandler = e => {
        setConfirmPassword(e.target.value);
    };

    const onNameHandler = e => {
        setName(e.target.value);
    };

    const onSubmitHandler = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }

        let body = {
            email,
            password,
            name
        };

        dispatch(registerUser(body)).then(response => {
            if (response.payload.success) {
                props.history.push("/login");
            } else {
                alert("Failed to sign up");
            }
        });
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
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={onConfirmPasswordHandler}
                />
                <br />
                <button>회원가입</button>
            </form>
        </div>
    );
};

export default RegisterPage;
