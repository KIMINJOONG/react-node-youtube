import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Title from "antd/lib/skeleton/Title";
import { Row, Col, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";

const LandingPage = props => {
    const [video, setVideo] = useState([]);

    const onClickHandler = () => {
        axios
            .get(`http://localhost:5000/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login");
                } else {
                    alert("로그아웃 실패");
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/video/getVideos")
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.videos);
                } else {
                    alert("비디오 가져오기를 실패 했습니다.");
                }
            });
    }, []);

    const renderCards = video.map((video, index) => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);
        return (
            <Col lg={6} md={8} xs={24}>
                <a href={`/video/post/${video._id}`}>
                    <div style={{ position: "relative" }}>
                        <img
                            style={{ width: "100%" }}
                            src={`http://localhost:5000/${video.thumbnail}`}
                        />
                        <div className="duration">
                            <span>
                                {minutes} : {seconds}
                            </span>
                        </div>
                    </div>
                </a>
                <br />
                <Meta
                    avatar={<Avatar src={video.writer.image} />}
                    title={video.title}
                    description=""
                />
                <span>{video.writer.name}</span>
                <span style={{ marginLeft: "3rem" }}>{video.views}</span> -{" "}
                <span>{moment(vidoe.createdAt)}</span>
                <span></span>
            </Col>
        );
    });

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <Title level={2}>Recommended</Title>
            <hr />
            <Row gutter={[32, 16]}>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: "relative" }}>
                        <div className="duration"></div>
                    </div>
                    <br />
                    <Meta description="" />
                </Col>
            </Row>
        </div>
    );
};

export default withRouter(LandingPage);
