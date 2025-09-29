import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getImageUrl as getImageUrlUtil } from "../utils/imageUtils";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  Tag,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { newsAPI } from "../services/apiService";
import ImageSlider from "../components/ImageSlider";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch the news article
        const response = await newsAPI.getById(id);

        if (response.success) {
          setNews(response.data);

          // Fetch related news (same category, excluding current article)
          const relatedResponse = await newsAPI.getAll({
            category: response.data.category,
            limit: 3,
          });

          if (relatedResponse.success) {
            // Filter out the current article
            const related = relatedResponse.data.filter(
              (item) => item._id !== id
            );
            setRelatedNews(related.slice(0, 3));
          }
        } else {
          setError("News article not found");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  const getImageUrl = (newsItem) => {
    // Check for images array first (new format)
    if (newsItem?.images && newsItem.images.length > 0) {
      const firstImage = newsItem.images[0];
      if (firstImage.url) {
        // If it's a full URL starting with http, use it directly
        if (firstImage.url.startsWith("http")) {
          return firstImage.url;
        }

        // If it's just a filename, construct static URL
        return getImageUrlUtil(firstImage.url);
      }
    }

    // Fallback to single image (backward compatibility)
    if (newsItem?.image) {
      // If image.url exists
      if (newsItem.image.url) {
        // If it's a full URL starting with http, use it directly
        if (newsItem.image.url.startsWith("http")) {
          return newsItem.image.url;
        }

        // If it's just a filename, construct static URL
        return getImageUrlUtil(newsItem.image.url);
      }

      // If image is just a string (filename), construct static URL
      if (typeof newsItem.image === "string") {
        return getImageUrlUtil(newsItem.image);
      }

      // If image has filename property (like faculty model), construct static URL
      if (newsItem.image.filename) {
        return getImageUrlUtil(newsItem.image.filename);
      }
    }

    // Fallback image
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      newsItem?.title || "News"
    )}&background=3B82F6&color=white&size=800x400`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = encodeURIComponent(news?.title || "");

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Article Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The news article you're looking for doesn't exist."}
          </p>
          <Link
            to="/news"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/news"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm mb-4"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to News
            </Link>

            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium capitalize">
                {news.category}
              </span>
              <span>•</span>
              <span>{estimateReadTime(news.content)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-6 leading-tight">
                {news.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{news.author?.name || "Admin"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye size={16} />
                    <span>{news.views || 0} views</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 mr-2">Share:</span>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Share on Facebook"
                  >
                    <Facebook size={16} />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-2 text-blue-400 hover:bg-blue-50 rounded"
                    title="Share on Twitter"
                  >
                    <Twitter size={16} />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-2 text-blue-700 hover:bg-blue-50 rounded"
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={16} />
                  </button>
                </div>
              </div>

              {/* Featured Images */}
              <div className="mb-6">
                {news.images && news.images.length > 0 ? (
                  <ImageSlider
                    images={news.images}
                    alt={news.title}
                    className=""
                    showThumbnails={true}
                  />
                ) : (
                  <div
                    className="relative overflow-hidden rounded-lg bg-gray-100"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={getImageUrl(news)}
                      alt={news.image?.alt || news.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          news.title
                        )}&background=3B82F6&color=white&size=800x400`;
                      }}
                    />
                  </div>
                )}
              </div>
            </header>

            {/* Article Body */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              {/* Tags */}
              {news.tags && news.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center flex-wrap gap-2">
                    <Tag className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600 mr-2">Tags:</span>
                    {news.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-gray-800 mb-8">
                Related News
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link
                    key={item._id}
                    to={`/news/${item._id}`}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={getImageUrl(item)}
                        alt={item.image?.alt || item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            item.title
                          )}&background=3B82F6&color=white&size=400x250`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium capitalize">
                          {item.category}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          <span>{formatDate(item.publishDate)}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.excerpt ||
                          item.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) +
                            (item.content.length > 150 ? "..." : "")}
                      </p>
                      <div className="flex items-center text-primary-600 text-sm font-medium mt-3 group-hover:text-primary-700">
                        <span>Read more</span>
                        <ChevronRight
                          size={14}
                          className="ml-1 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;
