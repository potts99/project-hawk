const { prisma } = require("../../../prisma/client");

exports.create = async (req, res) => {
  const { name, projectId } = req.body;

  try {
    const channel = await prisma.channel.create({
      data: {
        name: name,
        projectId: Number(projectId),
      },
    });

    res.status(200).json({ success: true, channel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
