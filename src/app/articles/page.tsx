"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { ArticleSummary, getArticles, recordArticleDisplayed } from "@/services/article-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Link, Bookmark, User, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const readingTime = Number(searchParams.get('readingTime')) || 5;
  const tags = searchParams.get('tags')?.split(',') || [];
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const userId = "user123"; // Placeholder user ID

  const { toast } = useToast();

  useEffect(() => {
    loadArticles();
  }, [readingTime, tags]);

  const loadArticles = async () => {
    const articles = await getArticles({
      maxReadingTime: readingTime,
      tags: tags,
    });
    setArticles(articles);
  };

  const handleArticleDisplayed = async (articleId: string) => {
    try {
      await recordArticleDisplayed(userId, articleId);
    } catch (error) {
      console.error("Error recording article display:", error);
    }
  };

  const handleBookmark = (articleId: string) => {
    toast({
      title: "Bookmark added!",
      description: "Article saved to your profile.",
    });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      {/* Article Selection */}
      <div className="md:w-3/4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Curated Articles</h1>

        <Separator className="mb-4" />

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((article) => {
            handleArticleDisplayed(article.id);
            return (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>
                    <Clock className="mr-2 inline-block h-4 w-4" />
                    {article.readingTime} min read
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold">BLUF: {article.bluf}</p>
                  <p>{article.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="link" asChild>
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Read More
                      <Link className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleBookmark(article.id)}>
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* User Statistics */}
      <div className="md:w-1/4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
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
      <Toaster/>
    </div>
  );
}

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
)
