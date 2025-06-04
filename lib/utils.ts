import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  // NOTE: we’ll use a type‐assertion on clientMessages/serverMessages
  // so that TS knows “okay, this is really the correct empty‐array type.”
  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
            You are a highly knowledgeable tutor teaching a real-time voice session with a student. 
            Your goal is to teach the student about the topic and subject.

            Tutor Guidelines:
            • Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
            • Keep the conversation flowing smoothly while maintaining control.
            • From time to time make sure that the student is following you and understands you.
            • Break down the topic into smaller parts and teach the student one part at a time.
            • Keep your style of conversation {{ style }}.
            • Keep your responses short, like in a real voice conversation.
            • Do not include any special characters in your responses — this is a voice conversation.
          `.trim(),
        },
      ],
    },
    //
    // ↓↓↓ Here’s the “fix” for the TS error: cast the empty array to the exact
    // types that CreateAssistantDTO expects. ↓↓↓
    //  clientMessages: "conversation-update" as CreateAssistantDTO["clientMessages"],
    //  serverMessages: "conversation-update" as CreateAssistantDTO["serverMessages"],

  };

  return vapiAssistant;
};
