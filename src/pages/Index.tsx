import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, GraduationCap, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-gold mx-auto">
                <GraduationCap className="w-12 h-12 text-secondary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Ask PV</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              A student-built prototype for campus questions and academic planning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="shadow-gold">
                <Link to="/ask">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Explore Q&A
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/plan">
                  <Calendar className="w-5 h-5 mr-2" />
                  Explore Planner
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">One Student Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask PV explores how campus resources, academic preferences, and semester planning could live in one interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-card hover:shadow-purple transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-purple">
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Resource Assistant</CardTitle>
              <CardDescription>
                A Q&A interface designed for sourced campus answers and direct student actions.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-purple transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-purple">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Schedule Planner</CardTitle>
              <CardDescription>
                A guided planning flow for degree rules, time preferences, modality, and credit targets.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-purple transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4 shadow-gold">
                <Sparkles className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle>AI-Ready Interface</CardTitle>
              <CardDescription>
                The chat experience is structured for a future campus retrieval and AI service with citations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-gold transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4 shadow-gold">
                <ShieldCheck className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle>Authenticated Profiles</CardTitle>
              <CardDescription>
                Supabase authentication supports persisted preferences and user-controlled transcript data deletion.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-gold transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center mb-4 shadow-gold">
                <Zap className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                The experience demonstrates direct paths from an answer to advising, registrar, or campus resources.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card hover:shadow-purple transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-purple">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Degree Planning Concept</CardTitle>
              <CardDescription>
                The planner models how degree requirements and student preferences could feed a future schedule engine.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="shadow-purple border-2 border-primary/20">
          <CardContent className="py-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Explore the prototype</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Sign in to view the authenticated profile experience and the hackathon workflows.
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
