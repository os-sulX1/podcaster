import type { GeneratePodcastProps } from "@/types";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from 'uuid';
import { generateUploadUrl } from "@/convex/files";
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

const useGeneratePodcast = ({ audio, setAudio, setAudioDuration, setAudioStorageId, setVoicePrompt, voiceType, voicePrompt }: GeneratePodcastProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcast.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio('');
    if (!voicePrompt) {
      toast({
        title: 'Please provide a voiceType to generate a podcast',
        variant: 'destructive'
      });
      return setIsGenerating(false);
    }
    try {
      const res = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([res], { type: 'audio/mpeg' });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const AudioUrl = await getAudioUrl({ storageId }) as string;
      setAudio(AudioUrl);
      setIsGenerating(false);

      toast({
        title: 'Podcast generated successfully'
      });
    } catch (error) {
      console.log('Error: generating podcast ', error)
      //todo:show error message
			toast({
				title:'Error , creating a podcast',
				variant:'destructive',

			})
    }

  }

  return {
    isGenerating:false,
    generatePodcast
  }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const {isGenerating , generatePodcast} = useGeneratePodcast(props)

	return (
		<div className="">
			<div className="flex flex-col gap-2.5 ">
				<Label className="text-16 font-bold text-white-1 ">
					AI Prompt to generate Podcast
				</Label>
				<Textarea
					className="input-class font-light focus-visible:ring-offset-orange-1"
					placeholder="Provide text to generate audio"
					rows={5}
					onChange={e => props.setVoicePrompt(e.target.value) }
					value={props.voicePrompt}
				/>
			</div>
			<div className="mt-5 w-full max-w-[200px]">
				<Button
					type="submit"
					className="text-16  bg-orange-1 py-4 font-bold text-white-1 "
					onClick={generatePodcast}
				>
					{isGenerating ? (
						<div className="p-4">
							<p className="mr-7"> Generating </p>
							<Loader
								size={20}
								className="animate-spin bg-white/25  border-dashed border-4"
							/>
						</div>
					) : (
						"Generate"
					)}
				</Button>
			</div>
			{props.audio && (
  <audio
    controls
    src={props.audio}
    autoPlay
    className="mt-5"
    onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
  >
    {/* Add a track element for captions if available */}
    <track kind="captions" src="captions.vtt" srcLang="en" label="English captions" />
    Your browser does not support the audio element.
  </audio>
)}

		</div>
	);
};

export default GeneratePodcast;
