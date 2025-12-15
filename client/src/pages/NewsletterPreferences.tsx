import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Newspaper, GraduationCap, Calendar, Lightbulb, ArrowLeft, Check, Loader2 } from "lucide-react";
import { Link } from "wouter";

interface PreferenceCategory {
  id: keyof typeof defaultPreferences;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const defaultPreferences = {
  prefAiNews: true,
  prefCourseUpdates: true,
  prefEvents: true,
  prefTips: true,
};

const categories: PreferenceCategory[] = [
  {
    id: "prefAiNews",
    label: "AI News & Insights",
    description: "Stay updated with the latest AI trends, breakthroughs, and industry news",
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    id: "prefCourseUpdates",
    label: "Course Updates",
    description: "Get notified about new courses, curriculum updates, and learning opportunities",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    id: "prefEvents",
    label: "Events & Webinars",
    description: "Receive invitations to workshops, webinars, and community events",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    id: "prefTips",
    label: "Tips & Resources",
    description: "Weekly tips, tutorials, and curated resources to boost your AI skills",
    icon: <Lightbulb className="h-5 w-5" />,
  },
];

export default function NewsletterPreferences() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const tokenFromUrl = searchParams.get("token");
  const emailFromUrl = searchParams.get("email");

  const [email, setEmail] = useState(emailFromUrl || "");
  const [token, setToken] = useState(tokenFromUrl || "");
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const preferencesQuery = trpc.newsletter.getPreferences.useQuery(
    { email: email || undefined, token: token || undefined },
    { 
      enabled: isAuthenticated && (!!email || !!token),
      retry: false,
    }
  );

  const updatePreferencesMutation = trpc.newsletter.updatePreferences.useMutation();
  const requestLinkMutation = trpc.newsletter.requestPreferencesLink.useMutation();

  // Load preferences when authenticated
  useEffect(() => {
    if (preferencesQuery.data) {
      setPreferences({
        prefAiNews: preferencesQuery.data.prefAiNews,
        prefCourseUpdates: preferencesQuery.data.prefCourseUpdates,
        prefEvents: preferencesQuery.data.prefEvents,
        prefTips: preferencesQuery.data.prefTips,
      });
    }
  }, [preferencesQuery.data]);

  // Auto-authenticate if token is in URL
  useEffect(() => {
    if (tokenFromUrl) {
      setIsAuthenticated(true);
    }
  }, [tokenFromUrl]);

  const handleLookup = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLookingUp(true);
    try {
      const result = await requestLinkMutation.mutateAsync({ email });
      if (result.token) {
        setToken(result.token);
        setIsAuthenticated(true);
        toast.success("Email verified! You can now manage your preferences.");
      }
    } catch (error: any) {
      toast.error(error.message || "Email not found in our newsletter list");
    } finally {
      setIsLookingUp(false);
    }
  };

  const handlePreferenceChange = (categoryId: keyof typeof defaultPreferences, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: checked,
    }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePreferencesMutation.mutateAsync({
        email: email || undefined,
        token: token || undefined,
        ...preferences,
      });
      setSaveSuccess(true);
      toast.success("Preferences saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const selectAll = () => {
    setPreferences({
      prefAiNews: true,
      prefCourseUpdates: true,
      prefEvents: true,
      prefTips: true,
    });
    setSaveSuccess(false);
  };

  const deselectAll = () => {
    setPreferences({
      prefAiNews: false,
      prefCourseUpdates: false,
      prefEvents: false,
      prefTips: false,
    });
    setSaveSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container py-12 max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Newsletter Preferences</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Customize your email experience. Choose the content categories you'd like to receive from UpskillinTech.
          </p>
        </div>

        {/* Email Lookup Section */}
        {!isAuthenticated && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Verify Your Email</CardTitle>
              <CardDescription>
                Enter your email address to manage your newsletter preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleLookup} disabled={isLookingUp}>
                  {isLookingUp ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences Section */}
        {isAuthenticated && (
          <>
            {preferencesQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-green-500" />
              </div>
            ) : preferencesQuery.error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="py-6 text-center">
                  <p className="text-red-600">Failed to load preferences. Please try again.</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Current Email Display */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-800 font-medium">Managing preferences for:</p>
                    <p className="text-green-700">{preferencesQuery.data?.email || email}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mb-6">
                  <Button variant="outline" size="sm" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={deselectAll}>
                    Deselect All
                  </Button>
                </div>

                {/* Category Cards */}
                <div className="space-y-4 mb-8">
                  {categories.map((category) => (
                    <Card
                      key={category.id}
                      className={`cursor-pointer transition-all ${
                        preferences[category.id]
                          ? "border-green-300 bg-green-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handlePreferenceChange(category.id, !preferences[category.id])}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-lg ${
                              preferences[category.id]
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {category.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Label
                                htmlFor={category.id}
                                className="text-base font-medium cursor-pointer"
                              >
                                {category.label}
                              </Label>
                              <Checkbox
                                id={category.id}
                                checked={preferences[category.id]}
                                onCheckedChange={(checked) =>
                                  handlePreferenceChange(category.id, checked as boolean)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Save Button */}
                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-8 bg-black hover:bg-gray-800"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved!
                      </>
                    ) : (
                      "Save Preferences"
                    )}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    You can update your preferences anytime by visiting this page.
                  </p>
                </div>
              </>
            )}
          </>
        )}

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-gray-500">
            Want to unsubscribe completely?{" "}
            <Link href="/newsletter/unsubscribe" className="text-green-600 hover:underline">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
