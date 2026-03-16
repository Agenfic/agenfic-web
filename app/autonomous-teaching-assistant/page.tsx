import type { Metadata } from "next";
import AutonomousTeachingAssistant from "@/components/autonomous-teaching-assistant-landing";

export const metadata: Metadata = {
  title: "Autonomous Teaching Assistant | Agenfic",
  description:
    "AI-powered knowledge base for tuition centres. Instant answers, smart quiz generation, and learning analytics — built for tutors, students, and centre operators."
};

export default function AutonomousTeachingAssistantPage() {
  return <AutonomousTeachingAssistant />;
}
