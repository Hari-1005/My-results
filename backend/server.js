import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:5173" })); // replace with '*' to allow all origins

app.get('/proxy', async(req, res) => {
    const htno = req.query.htno;
    if (!htno) {
        return res.status(400).json({ error: "htno parameter is required" });
      }

    try {
        const response = await axios.get(`https://jntuhresults.up.railway.app/api/academicresult?htno=${htno}`);
        res.json(response.data); // Send the data back to the client
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/', (req, res) => {
    res.send('Api is working')
})

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
    next();
  });
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})