import express from 'express';
import { Ollama } from 'ollama';
const app = express();
const port = 3000;
import cors from "cors";
const OLLAMA_API_KEY = "f2cbadd69d764dadb91891a7e8c49b69.iH52kXPTW4zGrDUltoM4b50y";

const ollama = new Ollama({
    host: 'https://ollama.com',
    headers: { Authorization: 'Bearer ' + OLLAMA_API_KEY }
})

//adding cors
app.use(cors({
    origin: '*',
}));

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Forward Server is running!');
});


app.post("/api/ai-insight", async (req: any, res: any) => {
    try {
        const { prompt } = req.body;
        const response = await ollama.chat({
            model: 'deepseek-v3.1:671b-cloud',
            messages: [{
                role: 'user',
                content: prompt
            }]
        });
        return res.json({
            success: true,
            response: response?.message?.content
        })
    } catch (error) {
        return res.json({
            success: false,
            response: null
        })
    }
})


app.post("api/trend/analysis", (req: any, res: any) => {
    try {

    } catch (error) {

    }
})

app.listen(port, () => {
    console.log(`Server listening at at ${port}`)
});

