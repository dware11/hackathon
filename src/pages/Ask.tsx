import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, ExternalLink, Calendar, MapPin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ title: string; url: string }>;
  actions?: Array<{ type: string; label: string; url?: string }>;
};

const Ask = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a demo response. Connect the AI API to get real answers from the PV knowledge base.",
        citations: [
          { title: "Advising Guide", url: "https://pvamu.edu/advising" },
          { title: "Course Catalog", url: "https://pvamu.edu/catalog" }
        ],
        actions: [
          { type: "advising", label: "Book Advising", url: "https://pvamu.edu/advising/schedule" },
          { type: "registrar", label: "Open Registrar", url: "https://pvamu.edu/registrar" },
          { type: "map", label: "View Campus Map", url: "https://pvamu.edu/map" }
        ]
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "advising":
        return <Calendar className="w-4 h-4" />;
      case "map":
        return <MapPin className="w-4 h-4" />;
      case "form":
        return <FileText className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Ask PV
          </h1>
          <p className="text-muted-foreground">
            Get answers from Prairie View's knowledge base with citations and quick actions
          </p>
        </div>

        <Card className="shadow-card mb-6">
          <CardContent className="p-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-purple">
                  <Send className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">Ask me anything about Prairie View!</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">Registration deadlines</Badge>
                  <Badge variant="outline">Course prerequisites</Badge>
                  <Badge variant="outline">Financial aid</Badge>
                  <Badge variant="outline">Campus resources</Badge>
                </div>
              </div>
            )}

            {messages.map((message, idx) => (
              <div key={idx} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-4`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/40 space-y-1">
                      <p className="text-xs font-semibold mb-2">Sources:</p>
                      {message.citations.map((citation, i) => (
                        <a
                          key={i}
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {citation.title}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap gap-2">
                      {message.actions.map((action, i) => (
                        <Button
                          key={i}
                          size="sm"
                          variant="secondary"
                          className="gap-2"
                          asChild
                        >
                          <a href={action.url} target="_blank" rel="noopener noreferrer">
                            {getActionIcon(action.type)}
                            {action.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about courses, deadlines, resources..."
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Ask;
