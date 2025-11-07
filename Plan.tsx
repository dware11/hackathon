import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, ChevronRight, ChevronLeft, Download, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STEPS = ["Upload Transcript", "Degree Rules", "Preferences", "Results"];

const Plan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Schedule Planner
          </h1>
          <p className="text-muted-foreground">
            Generate conflict-free schedules based on your transcript and preferences
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`flex items-center gap-2 ${idx <= currentStep ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${idx <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {idx + 1}
                  </div>
                  <span className="hidden sm:inline">{step}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <ChevronRight className="mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{STEPS[currentStep]}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Upload your transcript PDF or enter courses manually"}
              {currentStep === 1 && "Select your major and catalog year"}
              {currentStep === 2 && "Set your scheduling preferences"}
              {currentStep === 3 && "Review your generated schedules"}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop your transcript PDF
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF (max 5MB)
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-muted-foreground">or</span>
                </div>
                <Button variant="outline" className="w-full">
                  Enter Courses Manually
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Major</label>
                  <select className="w-full p-2 border border-border rounded-lg">
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Business</option>
                    <option>Nursing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Catalog Year</label>
                  <select className="w-full p-2 border border-border rounded-lg">
                    <option>2024-2025</option>
                    <option>2023-2024</option>
                    <option>2022-2023</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time Windows</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Morning (8:00 AM - 12:00 PM)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Afternoon (12:00 PM - 5:00 PM)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Evening (5:00 PM - 9:00 PM)
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Modality Preference</label>
                  <select className="w-full p-2 border border-border rounded-lg">
                    <option>Any</option>
                    <option>In-person only</option>
                    <option>Online only</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Credit Target</label>
                  <input
                    type="number"
                    defaultValue={15}
                    min={12}
                    max={18}
                    className="w-full p-2 border border-border rounded-lg"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {[1, 2, 3].map((scheduleNum) => (
                    <Card key={scheduleNum} className="border-2 hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Schedule Option {scheduleNum}</CardTitle>
                          <Badge variant="secondary">15 Credits</Badge>
                        </div>
                        <CardDescription>
                          Balanced schedule with minimal conflicts
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>CS 3310 - Data Structures</span>
                            <span className="text-muted-foreground">MWF 10:00-10:50</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>MATH 2413 - Calculus I</span>
                            <span className="text-muted-foreground">TR 9:30-10:45</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>ENGL 1302 - Composition II</span>
                            <span className="text-muted-foreground">MWF 2:00-2:50</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-2">
                            <Copy className="w-4 h-4" />
                            Copy CRNs
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export .ics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === STEPS.length - 1}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Plan;
