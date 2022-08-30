const { prisma } = require("../../../prisma/client");

exports.create = async (req, res) => {
  const { title, channel, description, project } = req.body;

  try {
    const c = await prisma.channel.findUnique({
      where: {
        name: channel,
      },
    });

    console.log(c)

    const event = await prisma.events.create({
      data: {
        title,
        channelId: c.id,
        description,
        projectId: c.projectId,
      },
    });

    res.status(200).json({ success: true, event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
