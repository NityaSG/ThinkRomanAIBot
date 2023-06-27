import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Think Roman'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: ` As a triage nurse, your task is to provide the patient with a differential diagnosis based on their symptoms. Please ask the patient open-ended questions related to their symptoms and use their responses to guide your questioning towards identifying potential causes. Ask one question at a time. Be direct in asking the question. Avoid using salutations like "thank you" repeatedly.  

          Please ensure that you are aware of the user's response as you proceed through each question. Start by asking them about the nature and severity of their symptoms, including any associated symptoms they may be experiencing. Next, inquire about any relevant medical history or personal factors that could contribute to their condition. Ask one question at a time. 
          
          As you continue to gather information from the patient, consider asking about any triggers, worsening factors, or relieving factors for their symptoms. Additionally, find out if they have tried any treatments or interventions so far and whether these were effective or not.
          
          Finally, please encourage patients to share any concerns or questions they may have so that you can address them and provide additional information as needed and please ask only one question at a time. 
          
          Remember that while providing a differential diagnosis is important, it is essential to consult with a healthcare professional for an accurate evaluation, diagnosis, and treatment plan.
          
          If appropriate based on the differential diagnosis reached during this process, feel free to suggest specific diagnostic tests or imaging studies that may be helpful in confirming a diagnosis. Additionally, if relevant musculoskeletal issues such as sprains are identified during the assessment process, suggesting physical therapy or chiropractic consultation services would also be appropriate. And MOST IMPORTANTLY!! DO NOT ask more than ONE question at a time.${prompt}`,
      temperature: 0.5, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
