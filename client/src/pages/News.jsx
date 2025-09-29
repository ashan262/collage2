import React from "react";
import NewsGrid from "../components/NewsGrid";
import PageHero from "../components/PageHero";

const News = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero
        title="News & Updates"
        subtitle="Stay Connected with F.G Degree College for Boys Kohat"
        description="Stay informed with the latest news, announcements, and events from F.G Degree College for Boys Kohat. Discover our achievements, upcoming activities, and important information for students, faculty, and parents."
        height="h-64 md:h-80"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News & Updates" },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop"
      />

      {/* News Grid */}
      <NewsGrid showFilters={true} />
    </div>
  );
};

export default News;
