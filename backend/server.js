import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://my-results.vercel.app'); // Replace with your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

// Root endpoint to check if the API is working
app.get('/', (req, res) => {
  res.send('API is working');
});

// Content Security Policy middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
