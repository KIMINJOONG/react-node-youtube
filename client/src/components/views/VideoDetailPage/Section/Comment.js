import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";

const Comment = (props) => {
    const videoId = props.postId;
    const user = useSelector((state) => state.user);
    const [commentValue, setCommentValue] = useState("");

    const handleClick = (e) => {
        setCommentValue(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId,
        };

        axios.post("/api/comment/saveComment", variables).then((response) => {
            if (response.data.success) {
                console.log(response.data);

                props.refreshFunction(response.data.result);
            } else {
                alert("코멘트를 저장하지못했습니다");
            }
        });
    };
    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            {props.commentLists &&
                props.commentLists.map(
                    (comment, index) =>
                        !comment.responseTo && (
                            <SingleComment
                                refreshFunction={props.refreshFunction}
                                key={index}
                                comment={comment}
                                postId={props.postId}
                            />
                        )
                )}

            <form style={{ display: "flex" }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />

                <br />
                <button
                    style={{ width: "20%", height: "52px" }}
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Comment;
