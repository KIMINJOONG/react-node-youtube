import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    { value: 0, label: "private" },
    { value: 1, label: "public" }
];

const CategoryOptions = [
    {
        value: 0,
        label: "Film & Animation"
    },
    {
        value: 1,
        label: "Autos & Vichcle"
    },
    {
        value: 2,
        label: "music"
    },
    {
        value: 3,
        label: "pets and animals"
    }
];

const videoUploadPage = props => {
    const user = useSelector(state => state.user);
    const [videoTitle, setVideoTitle] = useState("");
    const [description, setDescription] = useState("");
    const [private, setPrivate] = useState(0);
    const [category, setCategory] = useState("Film & Animation");
    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnailPath, setThumbnailPath] = useState("");

    const onTitleChange = e => {
        setVideoTitle(e.target.value);
    };

    const onDescriptChange = e => {
        setDescription(e.target.value);
    };

    const onPrivateChange = e => {
        setPrivate(e.target.value);
    };

    const onCategoryChange = e => {
        setCategory(e.target.value);
    };

    const onDrop = files => {
        let formData = new FormData();
        const config = {
            header: { "content-type": "multipart/form-data" }
        };
        formData.append("file", files[0]);

        axios
            .post(
                "http://localhost:5000/api/video/uploadfiles",
                formData,
                config
            )
            .then(response => {
                if (response.data.success) {
                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    };

                    setFilePath(response.data.url);
                    axios
                        .post(
                            "http://localhost:5000/api/video/thumbnail",
                            variable
                        )
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.url);
                            } else {
                                alert("비디오 업로드 실패");
                            }
                        });
                } else {
                    alert("비디오 업로드 실패");
                }
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        const variables = {
            writer: user.userData._id,
            title: videoTitle,
            description: description,
            privacy: private,
            filePath: filePath,
            category: category,
            duration: duration,
            thumbnail: thumbnailPath
        };
        axios
            .post("http://localhost:5000/api/video/uploadVideo", variables)
            .then(response => {
                if (response.data.success) {
                    message.success("성공적으로 업로드를 했습니다.");

                    setTimeout(() => {
                        props.history.push("/");
                    }, 3000);
                } else {
                    alert("비디오 업로드에 실패 했습니다.");
                }
            });
    };

    return (
        <div style={{ maxWidth: "700px", margin: "2rem atuo" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Dropzone onDrop={onDrop} multiple={false} maxSize>
                        {({ getRootProps, getInputProps }) => (
                            <div
                                style={{
                                    width: "300px",
                                    height: "240px",
                                    border: "1px solid lightgray",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps} />
                            </div>
                        )}
                    </Dropzone>

                    {thumbnailPath && (
                        <div>
                            <img
                                src={`http://localhost:5000/${thumbnailPath}`}
                                alt="thumbnail"
                            />
                        </div>
                    )}

                    <div>
                        <img src alt />
                    </div>
                </div>

                <br />
                <br />

                <label>Title</label>
                <Input onChange={onTitleChange} value={videoTitle} />

                <br />
                <br />

                <label>Description</label>
                <TextArea onChange={onDescriptChange} value={description} />

                <br />
                <br />

                <select onChange={onPrivateChange} value={private}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange={onCategoryChange} value={category}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default videoUploadPage;
