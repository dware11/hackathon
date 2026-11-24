import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Save, Trash2 } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    email: "",
    major: "",
    catalog_year: "",
    credit_target: 15,
    preferred_modality: "any",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await (supabase as any)
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (data) {
      setProfile({
        email: data.email || "",
        major: data.major || "",
        catalog_year: data.catalog_year || "",
        credit_target: data.credit_target || 15,
        preferred_modality: data.preferred_modality || "any",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await (supabase as any)
      .from("profiles")
      .update({
        major: profile.major,
        catalog_year: profile.catalog_year,
        credit_target: profile.credit_target,
        preferred_modality: profile.preferred_modality,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Profile updated successfully" });
    }
    setLoading(false);
  };

  const handleDeleteTranscript = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await (supabase as any)
      .from("transcript_rows")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Transcript data deleted" });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your academic information and preferences
          </p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Your major, catalog year, and scheduling preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catalog">Catalog Year</Label>
                <Input
                  id="catalog"
                  value={profile.catalog_year}
                  onChange={(e) => setProfile({ ...profile, catalog_year: e.target.value })}
                  placeholder="2024-2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credit Target per Semester</Label>
                <Input
                  id="credits"
                  type="number"
                  min={12}
                  max={18}
                  value={profile.credit_target}
                  onChange={(e) => setProfile({ ...profile, credit_target: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modality">Preferred Modality</Label>
                <select
                  id="modality"
                  value={profile.preferred_modality}
                  onChange={(e) => setProfile({ ...profile, preferred_modality: e.target.value })}
                  className="w-full p-2 border border-border rounded-lg"
                >
                  <option value="any">Any</option>
                  <option value="in-person">In-person only</option>
                  <option value="online">Online only</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <Button onClick={handleSave} disabled={loading} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Data Management</CardTitle>
              <CardDescription>
                Manage your stored transcript and schedule data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Delete your uploaded transcript data. This action cannot be undone.
                </p>
                <Button variant="destructive" onClick={handleDeleteTranscript} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Transcript Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
