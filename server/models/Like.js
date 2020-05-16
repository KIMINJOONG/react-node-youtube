const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
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

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
