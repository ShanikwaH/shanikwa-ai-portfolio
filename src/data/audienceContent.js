export const getAudienceContent = (section, audienceMode) => {
  const content = {
    overview: {
      executive: {
        title: "Strategic Data Solutions That Drive Bottom-Line Results",
        description: "I transform complex data into actionable insights that directly impact your organization's profitability, efficiency, and competitive advantage. Try the working tools below to see real data analysis in action.",
        highlights: ["23% average revenue increase", "15% cost reduction", "94% stakeholder satisfaction"]
      },
      technical: {
        title: "Advanced Analytics & Machine Learning Implementation",
        description: "Full-stack data scientist with expertise in Python, R, SQL, cloud platforms (AWS, Azure, GCP), and modern ML frameworks. All tools below are fully functional - upload your data to test them.",
        highlights: ["MLOps deployment", "Real-time data processing", "Advanced statistical modeling"]
      },
      client: {
        title: "Your Data Story, Simplified and Actionable",
        description: "I help you understand what your data is telling you about your business, customers, and opportunities. Upload your own data to see how I can help you make better decisions.",
        highlights: ["Clear, visual reports", "Plain-English insights", "Actionable recommendations"]
      }
    }
  };
  return content[section]?.[audienceMode] || content.overview[audienceMode];
};
