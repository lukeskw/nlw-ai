import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { FileVideo, Loader2, RotateCcw, Upload, X } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success' | 'error'

interface VideoFormProps {
  onVideoUploaded: (id: string) => void
}

const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Enviando...',
  success: 'Sucesso!',
  error: 'Ocorreu um erro'

}

export function VideoForm(props: VideoFormProps){
  const [ videoFile, setVideoFile ] = useState<File | null>(null)
  const [ status, setStatus ] = useState<Status>('waiting')
  const promptInputRef = useRef<HTMLTextAreaElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>){
    console.log('here i am')
    const { files } = event.currentTarget

    console.log(files)

    if(!files){
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video:File){
    console.log('convert started')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('progress', progress => {
      console.log('convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], {type: 'audio/mpeg'})

    const audioFile = new File([audioFileBlob], 'audio.mp3', {type: 'audio/mpeg'})

    console.log('convert finished')

    return audioFile

  }


  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    try{
    event.preventDefault()
    const prompt = promptInputRef.current?.value

    if(!videoFile){
      return
    }

    setStatus('converting')

    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    const response = await api.post('/videos', data)

    const videoId = response.data.video.id

    setStatus('generating')

    await api.post(`/videos/${videoId}/transcription`, {
      prompt
    })

    setStatus('success')

    props.onVideoUploaded(videoId)

  } catch(e){
    setStatus('error')
  }

  }

  function handleResetForm(){
    setVideoFile(null)
    setStatus('waiting')

    if (promptInputRef.current) {
      promptInputRef.current.value = "";
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleResetVideo(){
    setVideoFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const previewURL = useMemo(()=>{
    if(!videoFile){
      return null
    }
    return URL.createObjectURL(videoFile)
  },[videoFile])


  return (
    <form onSubmit={handleUploadVideo} className="space-y-4">
      <div className="relative">
    { videoFile ? (<>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-default">
        <Button onClick={handleResetVideo} className="cursor-default" variant="destructive" >
          <X className="h-4 w-4"/>
        </Button>
      </div>
    </>)
      : ''
    }
    <label
    htmlFor="video"
    className="relative border flex rounded-md aspect-video cursor-pointer border-dashed z-10
    text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-secondary"
    >
      {
        videoFile ? (
            <video src={previewURL} controls={false} className=""/>
        ) : (
          <>
            <FileVideo className="w-4 h-4"/>
            Selecione um vídeo
          </>
      )}
    </label>
    </div>
    <input ref={fileInputRef} type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected}/>
    <Separator />

    <div className="space-y-1">
      <Label htmlfor="transcription-prompt">Prompt de Transcrição</Label>
      <Textarea
        disabled={status !== 'waiting'}
        ref={promptInputRef}
        id="transcription-prompt"
        className="h-20 leading-relaxed resize-none"
        placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
      />
    </div>
      {
        status === 'success' || status === 'error' ? (
          <div className="flex items-center justify-center">
              <Button
                disabled
                type="submit"
                data-success={status==='success'}
                data-error={status==='error'}
                className="w-[85%] data-[success=true]:bg-emerald-400
                data-[error=true]:bg-red-500
                data-[error=true]:text-white
                rounded-r-none
                "
                >
                  {statusMessages[status]}
              </Button>
              <Button
                type="submit"
                data-success={status==='success'}
                data-error={status==='error'}
                className="w-[15%] data-[success=true]:bg-emerald-400
                data-[error=true]:bg-red-500
                data-[error=true]:text-white
                rounded-l-none
                "
                onClick={handleResetForm}>
                  <RotateCcw className="w-4 h-4"/>
              </Button>
          </div>
        ) : (
          <Button
        disabled={status !== 'waiting'}
        type="submit"
        className="w-full">
          {
            status === 'waiting' ? (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Carregar vídeo
              </>
            ) : (
              <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
              <span>{statusMessages[status]}</span>
              </>
            )
          }
          </Button>
        )
      }
  </form>
  )
}