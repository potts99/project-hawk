const { prisma } = require("../../../prisma/client");

exports.create = async (req, res) => {
  const { title, channel, description, project } = req.body;

  try {
    const p = await prisma.project.findUnique({
      where: {
        name: project,
      },
    });

    const c = await prisma.channel.findMany({
      where: {
        name: channel,
        projectId: p.id,
      },
    });

    const event = await prisma.events.create({
      data: {
        title,
        channelId: c[0].id,
        description,
        projectId: c[0].projectId,
      },
    });

    res.status(200).json({ success: true, event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
