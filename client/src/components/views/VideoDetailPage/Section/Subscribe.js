import React, { useEffect, useState } from "react";
import axios from "axios";

const Subscribe = ({ userTo, userFrom }) => {
    const [subscribeNumber, SetsubscribeNumber] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    useEffect(() => {
        let variable = {
            userTo,
        };
        axios
            .post(
                `http://localhost:5000/api/subscribe/subscribeNumber`,
                variable
            )
            .then((response) => {
                if (response.data.success) {
                    SetsubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert("구독자 수 정보를 받아오지 못했습니다.");
                }
            });

        let subscribedVariable = {
            userTo,
            userFrom: localStorage.getItem("userId"),
        };
        axios
            .post(
                `http://localhost:5000/api/subscribe/subscribed`,
                subscribedVariable
            )
            .then((response) => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    alert("정보를 받아오지 못했습니다.");
                }
            });
    }, []);

    const onSubscribe = () => {
        let subscribedVariable = {
            userTo,
            userFrom,
        };
        if (subscribed) {
            axios
                .post(
                    `http://localhost:5000/api/subscribe/unSubscribe`,
                    subscribedVariable
                )
                .then((response) => {
                    if (response.data.success) {
                        SetsubscribeNumber(subscribeNumber - 1);
                        setSubscribed(!subscribed);
                    } else {
                        alert("구독 취소하는데 실패하였습니다.");
                    }
                });
        } else {
            axios
                .post(
                    `http://localhost:5000/api/subscribe/subscribe`,
                    subscribedVariable
                )
                .then((response) => {
                    if (response.data.success) {
                        SetsubscribeNumber(subscribeNumber + 1);
                        setSubscribed(!subscribed);
                    } else {
                        alert("구독 하는데 실패하였습니다.");
                    }
                });
        }
    };
    return (
        <div>
            <button
                style={{
                    backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
                    borderRadius: "4px",
                    color: "white",
                    padding: "10px 16px",
                    fontWeight: "500",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                }}
                onClick={onSubscribe}
            >
                {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    );
};

export default Subscribe;
