const { prisma } = require("../../../prisma/client");

// All events in a project
exports.eventsAll = async (req, res) => {

  const { id } = req.params

  try {
    const events = await prisma.project.findUnique({
        where: {
          id: Number(id)
        },
        select: {
            events: true
        }
    });

    res.status(200).json({ success: true, ...events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
