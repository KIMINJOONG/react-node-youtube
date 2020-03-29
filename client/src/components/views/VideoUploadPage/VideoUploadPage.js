import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";

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

const videoUploadPage = () => {
    const [videoTitle, setVideoTitle] = useState("");
    const [description, setDescription] = useState("");
    const [private, setPrivate] = useState(0);
    const [category, setCategory] = useState("Film & Animation");

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

    return (
        <div style={{ maxWidth: "700px", margin: "2rem atuo" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Dropzone onDrop multiple maxSize>
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

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default videoUploadPage;
