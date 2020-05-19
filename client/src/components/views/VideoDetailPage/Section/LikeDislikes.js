import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import axios from "axios";

const LikeDislikes = ({ video, videoId, userId }) => {
    const [likes, setLikes] = useState(0);
    const [likeAction, setLikeAction] = useState(null);

    const [dislikes, setDisLikes] = useState(0);
    const [dislikeAction, setDisLikeAction] = useState(null);
    let variable = {};
    if (video) {
        variable = { videoId, userId };
    } else {
        variable = { commentId, userId };
    }
    useEffect(() => {
        axios.post("/api/like/getLikes", variable).then((response) => {
            if (response.data.success) {
                setLikes(response.data.likes.length);

                response.data.likes.map((like) => {
                    if (like.userId === userId) {
                        setLikeAction("liked");
                    }
                });
            } else {
                alert("실패");
            }
        });

        axios.post("/api/like/getDislikes", variable).then((response) => {
            if (response.data.success) {
                setDisLikes(response.data.dislikes.length);

                response.data.likes.map((like) => {
                    if (like.userId === userId) {
                        setDisLikes("disliked");
                    }
                });
            } else {
                alert("실패");
            }
        });
    }, []);
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like"></Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}>
                    {likes}
                </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="DisLike"></Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}>
                    {dislikes}
                </span>
            </span>
        </div>
    );
};

export default LikeDislikes;
