const { prisma } = require("../../../prisma/client");

// All events in a project
exports.all = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();

    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
