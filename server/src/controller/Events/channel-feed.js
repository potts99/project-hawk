const { prisma } = require("../../../prisma/client");

// Get all the events from a channelId
exports.channelFeed = async (req, res) => {
  const { id } = req.params;

  try {
    const channel = await prisma.channel.findUnique({
      where: {
        id,
      },
    });

    const events = await prisma.events.findMany({
      where: {
        channelId: channel.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
