const { prisma } = require("../../../prisma/client");

exports.feed = async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await prisma.events.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ success: true, feed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
