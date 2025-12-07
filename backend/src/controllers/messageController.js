const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get conversation between two users
// @route   GET /api/messages/:userId
// @access  Private
exports.getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user.id; // From auth middleware

    const messages = await Message.find({
        $or: [
            { sender: currentUserId, receiver: userId },
            { sender: userId, receiver: currentUserId },
        ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
    });
});
