// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    // Construct the file path
    const filePath = path.join(process.cwd(), "JSON", "q-vercel-python.json");
    // Read and parse the JSON file
    const fileData = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(fileData);

    // Get 'name' query parameter(s)
    const names = req.query.name;

    // Ensure 'names' is an array
    const namesArray = Array.isArray(names) ? names : [names];

    // Initialize an array to store marks
    const marks = namesArray.map((name) => {
      const record = data.find((item) => item.name === name);
      return record ? record.marks : null; // Return marks if found, else null
    });

    // Check if any marks were found
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
