import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import type { LearningPath } from "@/data/quizData";
import {
  generateShareContent,
  getTwitterShareUrl,
  getLinkedInShareUrl,
  getFacebookShareUrl,
  copyToClipboard
} from "@/lib/shareUtils";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  learningPath: LearningPath;
}

export default function SocialShareButtons({ learningPath }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const shareContent = generateShareContent(learningPath);

  const handleShare = (platform: string, url: string) => {
    window.open(url, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(`${shareContent.text} ${shareContent.url}`);
      setCopied(true);
      toast.success("Copied to clipboard!", {
        description: "Share link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy", {
        description: "Please try again or copy the link manually.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-semibold text-lg mb-2">Share Your Results</h4>
        <p className="text-sm text-muted-foreground">
          Let others know about your AI learning journey!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {/* Twitter */}
        <Button
          onClick={() => handleShare("Twitter", getTwitterShareUrl(shareContent))}
          className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white flex items-center gap-2"
          size="lg"
        >
          <Twitter className="w-5 h-5" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>

        {/* LinkedIn */}
        <Button
          onClick={() => handleShare("LinkedIn", getLinkedInShareUrl(shareContent))}
          className="bg-[#0A66C2] hover:bg-[#004182] text-white flex items-center gap-2"
          size="lg"
        >
          <Linkedin className="w-5 h-5" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>

        {/* Facebook */}
        <Button
          onClick={() => handleShare("Facebook", getFacebookShareUrl(shareContent))}
          className="bg-[#1877F2] hover:bg-[#0c63d4] text-white flex items-center gap-2"
          size="lg"
        >
          <Facebook className="w-5 h-5" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        {/* Copy Link */}
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="flex items-center gap-2"
          size="lg"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-5 h-5" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
