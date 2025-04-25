"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { ArticleSummary, getArticles, recordArticleDisplayed } from "@/services/article-service";
import { Button } from "@/components/ui/button";
import { Clock, Link, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
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

  const renderArticle = useCallback(() => {
    if (!currentArticle) {
      return <p>No articles found.</p>;
    }

    handleArticleDisplayed(currentArticle.id);

    return (
      <div className="relative w-full h-full flex flex-col justify-start items-center">
        <ArticleHeader
          title={currentArticle.title}
          onBookmark={() => handleBookmark(currentArticle.id)}
        />
        <ArticleContent
          readingTime={currentArticle.readingTime}
          bluf={currentArticle.bluf}
          summary={currentArticle.summary}
          link={currentArticle.link}
        />
      </div>
    );
  }, [currentArticle, handleBookmark]);

  return (
    <div className="container mx-auto p-4 flex flex-col h-screen">
      {/* Article Display */}
      <div className="flex-1 flex justify-center items-center relative">
        {/* Previous Button */}
        <Button
          variant="destructive"
          className="absolute left-4 rounded-md p-6 transform scale-125"
          onClick={goToPreviousArticle}
          disabled={currentArticleIndex === 0}
        >
          <ChevronLeft className="h-12 w-12 font-bold" />
          <span className="sr-only">Previous</span>
          Previous
        </Button>

        {renderArticle()}

        {/* Next Button */}
        <Button
          variant="destructive"
          className="absolute right-4 rounded-md p-6 transform scale-125"
          onClick={goToNextArticle}
          disabled={currentArticleIndex === articles.length - 1}
        >
          Next
          <ChevronRight className="h-12 w-12 font-bold" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <Toaster />
    </div>
  );
}

interface ArticleDisplayProps {
  article: ArticleSummary;
  onBookmark: (articleId: string) => void;
  onArticleDisplayed: (articleId: string) => void;
}

const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ article, onBookmark, onArticleDisplayed }) => {
  useEffect(() => {
    onArticleDisplayed(article.id);
  }, [article.id, onArticleDisplayed]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <ArticleHeader
        title={article.title}
        onBookmark={() => onBookmark(article.id)}
      />
      <ArticleContent
        readingTime={article.readingTime}
        bluf={article.bluf}
        summary={article.summary}
        link={article.link}
      />
    </div>
  );
};

interface ArticleHeaderProps {
  title: string;
  onBookmark: () => void;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, onBookmark }) => {
  return (
    <div className="relative w-full p-6">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 p-1.5 transform scale-125"
        onClick={onBookmark}
      >
        <Bookmark className="h-6 w-6" />
      </Button>
    </div>
  );
};

interface ArticleContentProps {
  readingTime: number;
  bluf: string;
  summary: string;
  link: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ readingTime, bluf, summary, link }) => {
  return (
    <div className="w-full px-6 py-4 flex flex-col items-center">
      <div className="text-sm text-muted-foreground mb-4">
        <Clock className="mr-2 inline-block h-4 w-4" />
        {readingTime} min read
      </div>
      <div className="font-bold text-lg text-center mb-4 transform scale-125">{bluf}</div>
      <p className="text-md text-gray-700 text-justify">{summary}</p>
      <Button variant="link" asChild className="mt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          Read More
          <Link className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};




