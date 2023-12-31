# upload.ai
_The project consists of a generator of descriptions and titles for YouTube videos based on the transcription of the content._

## Technologies used
- React.JS
- TailwindCSS
- Typescript
- shadcn/ui
- FFmpeg WASM
- Axios
- Lucide React
- Vite
- PrismaORM
- Fastify
- Zod

## Services Used
- Github
- OPENAI API

## System Features
- Upload a video with @fastify/multipart
- Connect with OpenAI whisper-1 ai
- Transcription of the video using whisper-1
- Multiple pre made prompts to guide you
- Temperature slider to adjust the outcome of the prompt

## Getting Started
- First, clone the repo.
- Make sure you have `Node.js` and `npm` installed
- Install frontend and backend dependencies with `yarn` or `npm|pnpm`
- Run the migrations on the backend with `npx prisma migrate dev`
- Run the seeder on the backend with `yarn prisma db seed`
- Rename .env.example to .env and change OPENAI_KEY with the API Key of your OpenAI account
- Then  open the frontend and backend, and simply run
```
yarn dev
```

Then open your [localhost](http://localhost:5173/) with your browser and voilà. You'll have access to the application


## How to use

### Here's the homepage
![Screenshot of the homepage](/README/home.png)

### Select a video for transcription
![Screenshot of the transcripted video](/README/transcription.png)

### Choose between pre made prompts, you can alter it if you like
![Screenshot of the prompts](/README/main-prompt.png)

### Here's the completed prompts, generated by whisper-1 AI
![Screenshot of the completed prompt](/README/completed-prompt.png)

## Authors
Lucas Porfirio: @lukeskw (https://github.com/lukeskw)
Please follow my github and join us! Thanks to visiting me and good coding!