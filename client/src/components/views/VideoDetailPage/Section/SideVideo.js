import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

const SideVideo = () => {
    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/video/getVideos")
            .then((response) => {
                if (response.data.success) {
                    setSideVideos(response.data.videos);
                } else {
                    alert("비디오 가져오기를 실패 했습니다.");
                }
            });
    }, []);

    const renderSideVideo = sideVideos.map((video, index) => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);
        return (
            <div
                key={index}
                style={{
                    display: "flex",
                    marginBottom: "1rem",
                    padding: "0 2rem",
                }}
            >
                <div style={{ width: "40%", marginBottom: "1rem" }}>
                    <a href>
                        <img
                            style={{ width: "100%", height: "100%" }}
                            src={`http://localhost:5000/${video.thumbnail}`}
                            alt
                        />
                    </a>
                </div>

                <div style={{ width: "50%" }}>
                    <a href style={{ color: "gray" }}>
                        <span style={{ fontSize: "1rem", color: "black" }}>
                            {video.title}
                        </span>
                        <span>{video.writer.name}</span>
                        <br />
                        <span>{video.views} views</span>
                        <br />
                        <span>
                            {minutes} : {seconds}
                        </span>
                        <br />
                    </a>
                </div>
            </div>
        );
    });
    return (
        <Fragment>
            <div style={{ marginTop: "3rem" }} />
            {renderSideVideo}
        </Fragment>
    );
};

export default SideVideo;
