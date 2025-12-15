import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Mail, Eye, Send, RefreshCw, Shield, BarChart3 } from "lucide-react";

type EmailTemplate = "welcome" | "preference_confirmation" | "password_reset" | "event_registration";

interface PreferenceOptions {
  prefAiNews: boolean;
  prefCourseUpdates: boolean;
  prefEvents: boolean;
  prefTips: boolean;
}

export default function AdminEmails() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>("welcome");
  const [testEmail, setTestEmail] = useState("");
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [preferenceOptions, setPreferenceOptions] = useState<PreferenceOptions>({
    prefAiNews: true,
    prefCourseUpdates: true,
    prefEvents: false,
    prefTips: true,
  });

  const previewMutation = trpc.admin.previewEmailTemplate.useMutation({
    onSuccess: (data) => {
      setPreviewHtml(data.html);
      setIsLoadingPreview(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to load preview");
      setIsLoadingPreview(false);
    },
  });

  const sendTestMutation = trpc.admin.sendTestEmail.useMutation({
    onSuccess: () => {
      toast.success(`Test email sent to ${testEmail}`);
      setIsSending(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send test email");
      setIsSending(false);
    },
  });

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePreview = () => {
    setIsLoadingPreview(true);
    previewMutation.mutate({
      template: selectedTemplate,
      preferences: selectedTemplate === "preference_confirmation" ? preferenceOptions : undefined,
    });
  };

  const handleSendTest = () => {
    if (!testEmail || !testEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSending(true);
    sendTestMutation.mutate({
      template: selectedTemplate,
      recipientEmail: testEmail,
      preferences: selectedTemplate === "preference_confirmation" ? preferenceOptions : undefined,
    });
  };

  const templateDescriptions: Record<EmailTemplate, string> = {
    welcome: "Sent to new newsletter subscribers when they sign up",
    preference_confirmation: "Sent when users update their newsletter preferences",
    password_reset: "Sent when users request to reset their password",
    event_registration: "Sent when users register for workshops, webinars, or events",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
                <p className="text-sm text-gray-500">Preview and test email templates before they go live</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/email-analytics">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Admin Panel
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Select Template
                </CardTitle>
                <CardDescription>
                  Choose an email template to preview or test
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Template</Label>
                  <Select
                    value={selectedTemplate}
                    onValueChange={(value) => {
                      setSelectedTemplate(value as EmailTemplate);
                      setPreviewHtml(null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome Email</SelectItem>
                      <SelectItem value="preference_confirmation">Preference Confirmation</SelectItem>
                      <SelectItem value="password_reset">Password Reset</SelectItem>
                      <SelectItem value="event_registration">Event Registration</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    {templateDescriptions[selectedTemplate]}
                  </p>
                </div>

                {/* Preference Options (only for preference_confirmation) */}
                {selectedTemplate === "preference_confirmation" && (
                  <div className="space-y-3 pt-4 border-t">
                    <Label>Preview Preferences</Label>
                    <p className="text-xs text-gray-500">
                      Select which preferences to show in the preview
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prefAiNews"
                          checked={preferenceOptions.prefAiNews}
                          onCheckedChange={(checked) =>
                            setPreferenceOptions((prev) => ({ ...prev, prefAiNews: !!checked }))
                          }
                        />
                        <label htmlFor="prefAiNews" className="text-sm">AI News & Insights</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prefCourseUpdates"
                          checked={preferenceOptions.prefCourseUpdates}
                          onCheckedChange={(checked) =>
                            setPreferenceOptions((prev) => ({ ...prev, prefCourseUpdates: !!checked }))
                          }
                        />
                        <label htmlFor="prefCourseUpdates" className="text-sm">Course Updates</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prefEvents"
                          checked={preferenceOptions.prefEvents}
                          onCheckedChange={(checked) =>
                            setPreferenceOptions((prev) => ({ ...prev, prefEvents: !!checked }))
                          }
                        />
                        <label htmlFor="prefEvents" className="text-sm">Events & Webinars</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prefTips"
                          checked={preferenceOptions.prefTips}
                          onCheckedChange={(checked) =>
                            setPreferenceOptions((prev) => ({ ...prev, prefTips: !!checked }))
                          }
                        />
                        <label htmlFor="prefTips" className="text-sm">Tips & Tutorials</label>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePreview}
                  className="w-full"
                  disabled={isLoadingPreview}
                >
                  {isLoadingPreview ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Template
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Test Send */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Test Email
                </CardTitle>
                <CardDescription>
                  Send a test email to verify the template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testEmail">Recipient Email</Label>
                  <Input
                    id="testEmail"
                    type="email"
                    placeholder="test@example.com"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Enter your email to receive a test version
                  </p>
                </div>

                <Button
                  onClick={handleSendTest}
                  variant="outline"
                  className="w-full"
                  disabled={isSending || !testEmail}
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Email
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Email Preview</CardTitle>
                <CardDescription>
                  {previewHtml
                    ? `Previewing: ${selectedTemplate === "welcome" ? "Welcome Email" : "Preference Confirmation"}`
                    : "Click 'Preview Template' to see the email"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewHtml ? (
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe
                      srcDoc={previewHtml}
                      className="w-full h-[600px] border-0"
                      title="Email Preview"
                      sandbox="allow-same-origin"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[600px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                    <Mail className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center">
                      Select a template and click "Preview Template"<br />
                      to see how it will look to recipients
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
