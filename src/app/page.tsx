
'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {Separator} from '@/components/ui/separator';
import {cn} from '@/lib/utils';
import {Slider} from "@/components/ui/slider";
import {Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, User, BookOpen } from "lucide-react";

async function fetchTags(): Promise<string[]> {
  // Simulate an API call to fetch tags with a focus on tech articles.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'JavaScript',
        'React',
        'Node.js',
        'TypeScript',
        'Next.js',
        'GraphQL',
        'Web Development',
        'Software Engineering',
        'Cloud Computing',
        'Data Science',
        'Machine Learning',
      ]);
    }, 500); // Simulate a 0.5-second delay
  });
}

export default function Home() {
  const [readingTime, setReadingTime] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadTags() {
      const tags = await fetchTags();
      setTagsList(tags);
    }

    loadTags();
  }, []);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSubmit = () => {
    router.push(`/articles?readingTime=${readingTime}&tags=${selectedTags.join(',')}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-start min-h-screen p-4">
      {/* Article Selection */}
      <Card className="w-full max-w-2xl mb-4 md:mb-0 md:mr-4">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to LexiQuest!</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label htmlFor="readingTime" className="mb-2 block">
              Select Reading Time (1-10 minutes):
            </Label>
            <Slider
              defaultValue={[readingTime]}
              max={10}
              min={1}
              step={1}
              onValueChange={(value) => setReadingTime(value[0])}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Selected Reading Time: {readingTime} minutes
            </p>
          </div>

          <div>
            <Label>Select Tags:</Label>
            <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tagsList.map(tag => (
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
          <Button onClick={handleSubmit}>Get Articles</Button>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Statistics</CardTitle>
          <CardDescription>Your Reading Journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="https://picsum.photos/50/50" alt="User Avatar" />
              <AvatarFallback><User/></AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <Badge variant="secondary">Sage Reader</Badge>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-2">
            <p>
              <BookOpen className="mr-2 inline-block h-4 w-4" />
              Articles Read: 100
            </p>
            <p>
              <Clock className="mr-2 inline-block h-4 w-4" />
              Total Reading Time: 500 minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

