export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
  scores: {
    beginner?: number;
    intermediate?: number;
    advanced?: number;
    business?: number;
    technical?: number;
  };
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: string;
  recommendedCourses: string[];
  icon: string;
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "experience",
    question: "What's your current experience with AI?",
    description: "Help us understand where you're starting from",
    options: [
      {
        id: "exp-none",
        text: "Complete beginner - I'm just getting started",
        value: "none",
        scores: { beginner: 3, technical: 0 }
      },
      {
        id: "exp-basic",
        text: "Basic understanding - I know some concepts",
        value: "basic",
        scores: { beginner: 2, intermediate: 1, technical: 1 }
      },
      {
        id: "exp-intermediate",
        text: "Intermediate - I've used AI tools before",
        value: "intermediate",
        scores: { intermediate: 3, technical: 2 }
      },
      {
        id: "exp-advanced",
        text: "Advanced - I have hands-on AI project experience",
        value: "advanced",
        scores: { advanced: 3, technical: 3 }
      }
    ]
  },
  {
    id: "goal",
    question: "What's your primary goal?",
    description: "What do you want to achieve with AI?",
    options: [
      {
        id: "goal-career",
        text: "Advance my career with AI skills",
        value: "career",
        scores: { intermediate: 2, technical: 2 }
      },
      {
        id: "goal-business",
        text: "Transform my business with AI automation",
        value: "business",
        scores: { business: 3, intermediate: 1 }
      },
      {
        id: "goal-learn",
        text: "Learn AI fundamentals and concepts",
        value: "learn",
        scores: { beginner: 2, intermediate: 1 }
      },
      {
        id: "goal-build",
        text: "Build AI-powered applications",
        value: "build",
        scores: { advanced: 3, technical: 3 }
      }
    ]
  },
  {
    id: "role",
    question: "Which best describes your role?",
    description: "This helps us tailor recommendations",
    options: [
      {
        id: "role-student",
        text: "Student or Recent Graduate",
        value: "student",
        scores: { beginner: 2, technical: 1 }
      },
      {
        id: "role-professional",
        text: "Working Professional",
        value: "professional",
        scores: { intermediate: 2, business: 1 }
      },
      {
        id: "role-business",
        text: "Business Owner or Entrepreneur",
        value: "business",
        scores: { business: 3, intermediate: 1 }
      },
      {
        id: "role-developer",
        text: "Developer or Technical Role",
        value: "developer",
        scores: { advanced: 2, technical: 3 }
      },
      {
        id: "role-educator",
        text: "Educator or Trainer",
        value: "educator",
        scores: { intermediate: 2, beginner: 1 }
      }
    ]
  },
  {
    id: "time",
    question: "How much time can you dedicate weekly?",
    description: "Be realistic about your availability",
    options: [
      {
        id: "time-1-3",
        text: "1-3 hours per week",
        value: "1-3",
        scores: { beginner: 1 }
      },
      {
        id: "time-4-6",
        text: "4-6 hours per week",
        value: "4-6",
        scores: { intermediate: 1 }
      },
      {
        id: "time-7-10",
        text: "7-10 hours per week",
        value: "7-10",
        scores: { intermediate: 1, advanced: 1 }
      },
      {
        id: "time-10plus",
        text: "10+ hours per week",
        value: "10+",
        scores: { advanced: 2, technical: 1 }
      }
    ]
  },
  {
    id: "learning-style",
    question: "What's your preferred learning style?",
    description: "How do you learn best?",
    options: [
      {
        id: "style-video",
        text: "Video tutorials and demonstrations",
        value: "video",
        scores: { beginner: 1 }
      },
      {
        id: "style-hands-on",
        text: "Hands-on projects and practice",
        value: "hands-on",
        scores: { intermediate: 2, technical: 1 }
      },
      {
        id: "style-reading",
        text: "Reading documentation and articles",
        value: "reading",
        scores: { intermediate: 1, advanced: 1 }
      },
      {
        id: "style-mentorship",
        text: "One-on-one mentorship and guidance",
        value: "mentorship",
        scores: { business: 1, advanced: 1 }
      }
    ]
  }
];

export const learningPaths: Record<string, LearningPath> = {
  beginner: {
    id: "beginner",
    title: "AI Fundamentals Path",
    description: "Perfect for beginners! Start with the basics and build a strong foundation in AI concepts, tools, and practical applications.",
    level: "Beginner",
    recommendedCourses: [
      "Getting Started with AI: A Beginner's Guide",
      "AI Tools for Everyday Tasks",
      "Introduction to Machine Learning"
    ],
    icon: "BookOpen",
    color: "from-blue-500 to-cyan-500"
  },
  intermediate: {
    id: "intermediate",
    title: "AI Professional Path",
    description: "Take your skills to the next level with intermediate courses focused on real-world applications and career advancement.",
    level: "Intermediate",
    recommendedCourses: [
      "AI for Business Automation",
      "Advanced AI Tools & Techniques",
      "Building AI-Powered Workflows"
    ],
    icon: "Zap",
    color: "from-purple-500 to-pink-500"
  },
  advanced: {
    id: "advanced",
    title: "AI Developer Path",
    description: "Master advanced AI development with hands-on projects, deep learning, and building production-ready AI applications.",
    level: "Advanced",
    recommendedCourses: [
      "Building AI Applications from Scratch",
      "Deep Learning & Neural Networks",
      "AI System Architecture & Deployment"
    ],
    icon: "Rocket",
    color: "from-orange-500 to-red-500"
  },
  business: {
    id: "business",
    title: "AI Business Transformation Path",
    description: "Transform your business with AI automation, strategy, and implementation focused on ROI and practical outcomes.",
    level: "Business-Focused",
    recommendedCourses: [
      "AI Strategy for Business Leaders",
      "Automating Business Processes with AI",
      "AI ROI & Implementation Planning"
    ],
    icon: "Briefcase",
    color: "from-green-500 to-teal-500"
  }
};

export function calculateLearningPath(answers: Record<string, string>): string {
  const scores = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    business: 0,
    technical: 0
  };

  // Calculate scores based on answers
  quizQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      const option = question.options.find((opt) => opt.value === answer);
      if (option) {
        Object.entries(option.scores).forEach(([key, value]) => {
          scores[key as keyof typeof scores] += value || 0;
        });
      }
    }
  });

  // Determine the best path
  // Business path takes priority if score is high
  if (scores.business >= 5) {
    return "business";
  }

  // Technical/Advanced path
  if (scores.advanced >= 6 || scores.technical >= 6) {
    return "advanced";
  }

  // Intermediate path
  if (scores.intermediate >= 5) {
    return "intermediate";
  }

  // Default to beginner
  return "beginner";
}
