// export default async function handler(req, res) {
//   const { prompt } = req.query;

//   console.log(prompt);

//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   try {
//     const response = await fetch(
//       `http://127.0.0.1:8000/generate?prompt=${encodeURIComponent(
//         prompt + " nail art"
//       )}&num_images=4`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to generate images");
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
