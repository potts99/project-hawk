const { prisma } = require("../../../prisma/client");

// Get all the events from a channelId
exports.ID = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    const channels = await prisma.channel.findMany({
      where: {
        projectId: project.id
      }
    })

    res.status(200).json({ success: true, channels });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
