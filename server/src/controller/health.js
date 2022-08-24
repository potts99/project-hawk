exports.healthCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "server healthy :)" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
