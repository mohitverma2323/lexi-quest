"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { ArticleSummary, getArticles, recordArticleDisplayed } from "@/services/article-service";
import { Button } from "@/components/ui/button";
import { Clock, Link, Bookmark, ChevronLeft, ChevronRight, BookOpen, User } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const readingTime = Number(searchParams.get('readingTime')) || 5;
  const tags = searchParams.get('tags')?.split(',') || [];
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const userId = "user123"; // Placeholder user ID

  const { toast } = useToast();

  // Stats state
  const [articlesReadToday, setArticlesReadToday] = useState(0);
  const [readingTimeToday, setReadingTimeToday] = useState(0);
  const [readerLevel, setReaderLevel] = useState("Beginner");
  const [totalPoints, setTotalPoints] = useState(0);
  const [statsAnimationKey, setStatsAnimationKey] = useState(0); // Key to trigger animation

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
    updateStats(); // Update stats on next article
    setStatsAnimationKey(prevKey => prevKey + 1); // Trigger animation
  };

  const updateStats = () => {
    // Logic to update stats - replace with actual data
    setArticlesReadToday(articlesReadToday + 1);
    setReadingTimeToday(readingTimeToday + (currentArticle?.readingTime || 0));
    setTotalPoints(totalPoints + 10);

    if (articlesReadToday > 5) {
      setReaderLevel("Intermediate");
    } else if (articlesReadToday > 10) {
      setReaderLevel("Advanced");
    }
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
    <div className="container mx-auto p-4 flex h-screen">
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

      {/* Stats Component */}
      <motion.div
        key={statsAnimationKey}
        variants={statsVariants}
        initial="hidden"
        animate="visible"
        className="w-1/4 p-4 bg-secondary rounded-md shadow-md ml-8 sticky top-4 h-fit"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">How is it going?</h2>
        <Separator className="mb-4" />
        <div className="space-y-2">
          <p>
            <BookOpen className="mr-2 inline-block h-4 w-4" />
            Articles Read Today: {articlesReadToday}
          </p>
          <p>
            <Clock className="mr-2 inline-block h-4 w-4" />
            Reading Time Today: {readingTimeToday} minutes
          </p>
          <p>
            <User className="mr-2 inline-block h-4 w-4" />
            Reader Level: <Badge variant="secondary">{readerLevel}</Badge>
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 inline-block mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h5.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5H9.75v-2.25a.75.75 0 000-1.5h5.25z"
                clipRule="evenodd"
              />
            </svg>
            Total Points: {totalPoints}
          </p>
        </div>
      </motion.div>

      <Toaster />
    </div>
  );
}

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


