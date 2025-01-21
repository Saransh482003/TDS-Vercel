// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import *  as fs from "fs"
import path from "path"
export default async function handler(req, res) {
  try{
    const filePath = path.join("public","q-vercel-python.json")
    const fileData = await fs.promises.readFile(filePath,"utf-8")
    const data = JSON.parse(fileData)
    const { name, marks } = req.query;
    const match = data.find(
      (item) => item.name === name && item.marks === parseInt(marks, 10)
    );
    if (match) {
      res.status(200).json(match); 
    } else {
      res.status(404).json({ error: "No matching record found" });
    }
  }
  catch (error){
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } 
}
