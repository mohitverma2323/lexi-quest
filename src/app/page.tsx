"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const tagsList = [
  "Technology",
  "Science",
  "History",
  "Politics",
  "Sports",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
];

export default function Home() {
  const [readingTime, setReadingTime] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = () => {
    router.push(`/articles?readingTime=${readingTime}&tags=${selectedTags.join(',')}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Scroll Sage!</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label htmlFor="readingTime">Select Reading Time (1-10 minutes):</Label>
            <Input
              id="readingTime"
              type="number"
              min="1"
              max="10"
              value={readingTime}
              onChange={(e) => setReadingTime(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Select Tags:</Label>
            <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tagsList.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleTagSelect(tag)}
                  />
                  <Label htmlFor={tag} className="text-sm font-normal">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />
          <Button onClick={handleSubmit}>Show Articles</Button>
        </CardContent>
      </Card>
    </div>
  );
}

