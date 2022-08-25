const { prisma } = require("../../../prisma/client");

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name: name,
      },
    });

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
