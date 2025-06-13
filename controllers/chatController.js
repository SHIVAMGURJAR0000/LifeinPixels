const fs = require("fs");

exports.parseChatFile = (req, res) => {
  const content = fs.readFileSync(req.file.path, "utf-8");

  const messages = [];

  content.split("\n").forEach((line) => {
    const match = line.match(
      /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s+([\d:]+(?:\s?[apAP][mM]| [apAP][mM]))\s+-\s+(.*?):\s+(.*)$/
    );

    if (match) {
      messages.push({
        timestamp: `${match[1]} ${match[2]}`,
        sender: match[3],
        message: match[4],
      });
    }
  });

  return res.json({ parsed: messages });
};
