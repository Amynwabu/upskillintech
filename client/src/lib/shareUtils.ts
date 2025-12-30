import type { LearningPath } from "@/data/quizData";

const SITE_URL = window.location.origin;
const QUIZ_URL = `${SITE_URL}/#quiz`;

export interface ShareContent {
  text: string;
  url: string;
  hashtags?: string[];
}

export function generateShareContent(learningPath: LearningPath): ShareContent {
  const pathEmojis: Record<string, string> = {
    beginner: "📚",
    intermediate: "⚡",
    advanced: "🚀",
    business: "💼"
  };

  const emoji = pathEmojis[learningPath.id] || "🎯";
  
  const text = `I just discovered my perfect AI learning path: ${emoji} ${learningPath.title}! Take the quiz to find yours at UpskillinTech.`;
  
  return {
    text,
    url: QUIZ_URL,
    hashtags: ["AI", "MachineLearning", "TechEducation", "UpskillinTech"]
  };
}

export function getTwitterShareUrl(content: ShareContent): string {
  const params = new URLSearchParams({
    text: content.text,
    url: content.url,
    hashtags: content.hashtags?.join(",") || ""
  });
  
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function getLinkedInShareUrl(content: ShareContent): string {
  const params = new URLSearchParams({
    url: content.url
  });
  
  // LinkedIn doesn't support pre-filled text via URL, but we can share the URL
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

export function getFacebookShareUrl(content: ShareContent): string {
  const params = new URLSearchParams({
    u: content.url,
    quote: content.text
  });
  
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  
  // Fallback for older browsers
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand("copy");
      textArea.remove();
      resolve();
    } catch (error) {
      textArea.remove();
      reject(error);
    }
  });
}
