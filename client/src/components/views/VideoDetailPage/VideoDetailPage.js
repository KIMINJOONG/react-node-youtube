import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";

const VideoDetailPage = (props) => {
    const videoId = props.match.params.videoId;
    const variable = { videoId };
    const [videoDetail, setVideoDetail] = useState({});

    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .post(`http://localhost:5000/api/video/getVideoDetail`, variable)
            .then((response) => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert("비디오 정보를 가져오기를 실패했습니다.");
                }
            });

        axios.post("/api/comment/getcomments", variable).then((response) => {
            if (response.data.success) {
                setComments(response.data.comments);
            } else {
                alert("코멘트 정보를 가져오는 것을 실패 하였습니다.");
            }
        });
    }, []);

    const refreshFunction = (newComment) => {
        setComments(comments.concat(newComment));
    };

    if (videoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: "100%", padding: "3rem 4rem" }}>
                        <video
                            style={{ width: "100%" }}
                            src={`http://localhost:5000/${videoDetail.filePath}`}
                            controls
                        />

                        <List.Item
                            actions={[
                                <LikeDislikes
                                    video
                                    userId={localStorage.getItem("userId")}
                                    videoId={videoId}
                                />,
                                <Subscribe
                                    userTo={videoDetail.writer}
                                    userFrom={localStorage.getItem("userId")}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={videoDetail.writer.image} />
                                }
                                title={videoDetail.writer.name}
                                description={videoDetail.description}
                            />
                        </List.Item>

                        <Comment
                            refreshFunction={refreshFunction}
                            commentLists={comments}
                            postId={videoId}
                        />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        );
    } else {
        return <div>...loading</div>;
    }
};

export default VideoDetailPage;
