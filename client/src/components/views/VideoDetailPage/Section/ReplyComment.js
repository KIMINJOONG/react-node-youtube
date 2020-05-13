import React, { Fragment, useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props) => {
    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComments, setOpenReplyComments] = useState(false);
    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        });

        setChildCommentNumber(commentNumber);
    }, [props.commentLists]);

    const renderReplyComment = (parentCommentId) => {
        props.commentLists.map((comment, index) => (
            <Fragment>
                {comment.responseTo === parentCommentId && (
                    <div style={{ width: "80%", marginLeft: "40px" }}>
                        <SingleComment
                            refreshFunction={props.refreshFunction}
                            key={index}
                            comment={comment}
                            postId={props.postId}
                        />
                        <ReplyComment
                            refreshFunction={props.refreshFunction}
                            postId={props.videoId}
                            parentCommentId={comment._id}
                            commentLists={props.commentLists}
                        />
                    </div>
                )}
            </Fragment>
        ));
    };

    const onHandleChange = () => {
        setOpenReplyComments(!openReplyComments);
    };
    return (
        <div
            style={{ fontSize: "14px", margin: 0, color: "gray" }}
            onClick={onHandleChange}
        >
            {childCommentNumber > 0 && (
                <p>View {childCommentNumber} more comment(s)</p>
            )}

            {openReplyComments && renderReplyComment(props.parentCommentId)}
        </div>
    );
};

export default ReplyComment;
