module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('json', (value) => JSON.stringify(value));

  eleventyConfig.addFilter('youtubeIds', (arr) =>
    (arr || []).map(v => {
      const m = String(v).match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
      return m ? m[1] : v
    })
  );

  // Copy static assets to _site without processing them
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
