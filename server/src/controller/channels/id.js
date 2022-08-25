const { prisma } = require("../../../prisma/client");

// Get all the events from a channelId
exports.ID = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channelEvents = await prisma.channel.findUnique({
      where: {
        id: Number(channelId),
      },
      select: {
        events: true,
      },
    });

    res.status(200).json({ success: true, channelEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
