"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { ArticleSummary, getArticles, recordArticleDisplayed } from "@/services/article-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Link, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Toaster, toast } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const readingTime = Number(searchParams.get('readingTime')) || 5;
  const tags = searchParams.get('tags')?.split(',') || [];
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
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

  const goToPreviousArticle = () => {
    setCurrentArticleIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToNextArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
      Math.min(prevIndex + 1, articles.length - 1)
    );
  };

  const currentArticle = articles[currentArticleIndex];

  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      <div className="flex justify-between items-center h-full">
        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousArticle}
          disabled={currentArticleIndex === 0}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Article Display */}
        {currentArticle ? (
          <Card className="w-full h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{currentArticle.title}</CardTitle>
              <CardDescription>
                <Clock className="mr-2 inline-block h-4 w-4" />
                {currentArticle.readingTime} min read
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold">BLUF: {currentArticle.bluf}</p>
              <p>{currentArticle.summary}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="link" asChild>
                <a
                  href={currentArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Read More
                  <Link className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleBookmark(currentArticle.id)}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <p>No articles found.</p>
        )}

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextArticle}
          disabled={currentArticleIndex === articles.length - 1}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
      <Toaster />
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
