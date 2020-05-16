const mongoose = require("mongoose");

const disLikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObejctId,
        ref: "User",
    },
    commentId: {
        type: Schema.Types.ObejctId,
        ref: "Comment",
    },
    videoId: {
        type: Schema.Types.ObejctId,
        ref: "Video",
    },
});

const DisLike = mongoose.model("DisLike", disLikeSchema);

module.exports = { DisLike };
