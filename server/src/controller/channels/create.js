const { prisma } = require("../../../prisma/client");

exports.create = async (req, res) => {
  const { name, project } = req.body;

  try {
    const channel = await prisma.channel.create({
      data: {
        name: name,
        projectId: project
      },
    });

    res.status(200).json({ success: true, channel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
