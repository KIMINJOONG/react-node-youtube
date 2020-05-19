import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import LikeDislikes from "./LikeDislikes";

const SingleComment = ({ postId, refreshFunction }) => {
    const user = useSelector((state) => state.user);
    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    };

    const onHandleChange = (e) => {
        setCommentValue(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId,
            responseTo: props.comment._id,
        };

        axios.post("/api/comment/saveComment", variables).then((response) => {
            if (response.data.success) {
                console.log(response.data);
                setCommentValue("");
                setOpenReply(false);
                refreshFunction(response.data.result);
            } else {
                alert("코멘트를 저장하지못했습니다");
            }
        });
    };
    const actions = [
        <LikeDislikes
            userId={localStorage.getItem("userId")}
            commentId={props.comment._id}
        />,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
            Reply to
        </span>,
    ];
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />

            {openReply && (
                <form style={{ display: "flex" }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: "100%", borderRadius: "5px" }}
                        onChange={onHandleChange}
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
            )}
        </div>
    );
};

export default SingleComment;
