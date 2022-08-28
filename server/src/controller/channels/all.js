const { prisma } = require("../../../prisma/client");

exports.all = async (req, res) => {
  try {
    const channel = await prisma.channel.findMany({});

    res.status(200).json({ success: true, channel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
