export interface UserPromptParams {
  title: string;
  keywords: string[];
  content: string;
  platform: string;
}

export const GITHUBDESCRIPTION = ``;

export const TWITTERINSTRUCTIONS = `
1. **Input Analysis:**
    - Read the provided blog post in its entirety to absorb the content.
    - Summarize the main arguments and key points.

2. **Generate Introduction Tweet:**
    - Create an introductory tweet that captures the essence of the blog post and hooks the reader’s interest.

3. **Content Breakdown:**
    - Break down the blog content into discrete sections that can be converted into individual tweets.
    - Ensure each tweet remains under the 280-character limit.

4. **Engagement Techniques:**
    - Incorporate relevant questions, statistics, or quotes to maintain reader engagement throughout the thread.

5. **Thread Coherence:**
    - Number each tweet to maintain thread coherence.
    - Ensure each tweet is understandable on its own but also contributes to the overall narrative.

6. **Conclusion and Call to Action:**
    - Conclude with a tweet prompting further action from the reader, such as visiting a link, sharing the thread, or commenting.

7. **Proofreading:**
    - Review the thread for grammatical accuracy, coherence, and adherence to Twitter’s 280-character limit per tweet.
    
 EXAMPLE THREAD:

  #### Twitter Thread:
  1. Machine learning is transforming industries by enabling systems to learn from data. 🧠💡 Here’s how it’s making a difference in healthcare. (1/8)
  2. In healthcare, predictive models built with machine learning can identify patient risks early, leading to better outcomes. 🏥✨ (2/8)
  3. These models analyze vast amounts of data, from patient history to genetic info, to make accurate predictions. 📊🧬 (3/8)
  4. For instance, machine learning can predict the likelihood of diseases like diabetes or heart conditions before they become critical. ❤️📈 (4/8)
  5. This early detection allows for timely intervention and personalized treatment plans, ultimately saving lives. ⏰💊 (5/8)
  6. Hospitals use machine learning to optimize resource allocation, ensuring that patients get the care they need when they need it. 🏥🔄 (6/8)
  7. As data grows, so will the accuracy and capability of these predictive models, continuously improving healthcare outcomes. 📈🔍 (7/8)
  8. Want to know more about machine learning in healthcare? Read our full blog post here: [Link] #MachineLearning #HealthcareInnovation (8/8)
`;

export const generateSystemPrompt = ({
  platform,
  instructions,
}: {
  platform: string;
  instructions: string;
}) => `
    **System Prompt:**

    You are an expert social media marketeer tasked with transforming long-form blog entries into concise posts tailored for ${platform}. 
    Your goal is to create professional, engaging, and insightful posts using only the content provided in the blogs. 

    **Instructions:**
    ${instructions}

    **Required Inputs:**
    1. **Blog Title:** The title of the blog post.
    2. **Keywords:** Trending keywords for this social media platform.
    3. **Blog Content:** The original long-form blog entry.

    ---
    **Example Prompt:**
    **Blog Title:** "AI powered voice chat in June 2024: Lipstick on a pig"
    **Keywords:** ["ai voice chat, ai voice"]
    **Blog Content:** 
    [long-form blog content here]
`;

export const generateUserPrompt = ({
  title,
  keywords,
  content,
  platform,
}: UserPromptParams) => `
**User Prompt:**

Transform the following long-form blog content into a concise social media post tailored for ${platform}. The post should be engaging, and insightful. 

**Required Inputs:**

- **Blog Title:** ${title}
- **Keywords:** ${keywords}
- **Blog Content:** /n ${content} /n
`;
