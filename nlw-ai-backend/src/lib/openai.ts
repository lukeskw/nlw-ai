import 'dotenv/config'
import { OpenAI } from 'openai'
export const openai = new OpenAI({
  organization: 'org-NZvRa4tdSpCbc1DEdjONRR1n',
  apiKey: process.env.OPENAI_KEY,
})