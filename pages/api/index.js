import Cors from "nextjs-cors";
import * as fs from "fs";
import path from "path";

export default async function handler(req, res) {
  await Cors(req, res); // Enable CORS

  try {
    const filePath = path.join(process.cwd(), "JSON", "q-vercel-python.json");
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    const names = req.query.name;
    const namesArray = Array.isArray(names) ? names : [names];

    const marks = namesArray.map((name) => {
      const record = data.find((item) => item.name === name);
      return record ? record.marks : null;
    });

    if (marks.some((mark) => mark !== null)) {
      res.status(200).json({ marks });
    } else {
      res.status(404).json({ error: "No matching records found" });
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
