/**
 * Represents a summary of an article.
 */
export interface ArticleSummary {
  /**
   * The unique identifier of the article.
   */
  id: string;
  /**
   * The title of the article.
   */
  title: string;
  /**
   * The Bottom Line Up Front (BLUF) summary of the article.
   */
  bluf: string;
  /**
   * The estimated reading time of the article in minutes.
   */
  readingTime: number;
  /**
   * A brief summary of the article content.
   */
  summary: string;
  /**
   * A link to the full article.
   */
  link: string;
}

/**
 * Represents criteria for filtering articles.
 */
export interface ArticleFilterCriteria {
  /**
   * The maximum reading time in minutes.
   */
  maxReadingTime: number;
  /**
   * A list of tags to filter articles by.
   */
  tags: string[];
}

/**
 * Asynchronously retrieves articles based on the specified filter criteria.
 *
 * @param criteria The criteria to filter articles by.
 * @returns A promise that resolves to an array of ArticleSummary objects.
 */
export async function getArticles(criteria: ArticleFilterCriteria): Promise<ArticleSummary[]> {
  // TODO: Implement this by calling an external API.

  const longSummary = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
  `;

  return [
    {
      id: '1',
      title: 'Sample Article 1',
      bluf: 'This is a sample article summary.',
      readingTime: 5,
      summary: longSummary,
      link: 'https://example.com/article1',
    },
    {
      id: '2',
      title: 'Sample Article 2',
      bluf: 'Another sample article for demonstration.',
      readingTime: 7,
      summary: longSummary,
      link: 'https://example.com/article2',
    },
        {
      id: '3',
      title: 'Sample Article 3',
      bluf: 'Another sample article for demonstration.',
      readingTime: 3,
      summary: longSummary,
      link: 'https://example.com/article3',
    },
        {
      id: '4',
      title: 'Sample Article 4',
      bluf: 'Another sample article for demonstration.',
      readingTime: 9,
      summary: longSummary,
      link: 'https://example.com/article4',
    },
        {
      id: '5',
      title: 'Sample Article 5',
      bluf: 'Another sample article for demonstration.',
      readingTime: 2,
      summary: longSummary,
      link: 'https://example.com/article5',
    },
        {
      id: '6',
      title: 'Sample Article 6',
      bluf: 'Another sample article for demonstration.',
      readingTime: 6,
      summary: longSummary,
      link: 'https://example.com/article6',
    },
  ];
}

/**
 * Asynchronously records that an article was displayed to a user.
 *
 * @param userId The ID of the user.
 * @param articleId The ID of the article displayed.
 * @returns A promise that resolves when the recording is complete.
 */
export async function recordArticleDisplayed(userId: string, articleId: string): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log(`Recorded article ${articleId} display for user ${userId}`);
}

