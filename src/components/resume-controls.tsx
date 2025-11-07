"use client";

import { useResume } from "@/contexts/resume-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { templates, templateColors } from "@/lib/constants";
import ResumeForm from "./resume-form";
import { cn } from "@/lib/utils";
import DownloadButtons from "./download-buttons";

export default function ResumeControls() {
  const { selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor } = useResume();

  return (
    <div className="p-4">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <ResumeForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={cn(
                      "p-2 border-2 rounded-lg transition-all",
                      selectedTemplate === template.id ? "border-primary" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="bg-muted aspect-[3/4] rounded-md flex items-center justify-center">
                       <span className="text-sm font-medium text-muted-foreground">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="design" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Accent Color</h3>
              <div className="grid grid-cols-7 gap-2">
                {templateColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-full aspect-square rounded-full border-2 transition-all",
                      selectedColor === color ? "border-primary" : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-4">
        <DownloadButtons />
      </div>
    </div>
  );
}
