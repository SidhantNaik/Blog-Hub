import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Content moderation using toxic-bert model
export const moderateContent = async (text) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/unitary/toxic-bert",
      {
        headers: { 
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();
    
    // Check if content is inappropriate
    // Result contains scores for different categories like toxicity, obscene, threat, etc.
    const toxicityThreshold = 0.7; // You can adjust this threshold
    
    const isToxic = result[0].some(category => 
      category.score > toxicityThreshold
    );

    return {
      isAppropriate: !isToxic,
      details: result[0]
    };
  } catch (error) {
    console.error("Content moderation error:", error);
    throw new Error("Failed to moderate content");
  }
};

// Grammar checking using gector model
export const checkGrammar = async (text) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/grammarly/gector",
      {
        headers: { 
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();
    
    return {
      correctedText: result[0],
      hasErrors: result[0] !== text
    };
  } catch (error) {
    console.error("Grammar check error:", error);
    throw new Error("Failed to check grammar");
  }
};

// Combined check for both moderation and grammar
export const validateContent = async (text) => {
  const [moderationResult, grammarResult] = await Promise.all([
    moderateContent(text),
    checkGrammar(text)
  ]);

  return {
    isValid: moderationResult.isAppropriate,
    moderationDetails: moderationResult.details,
    grammarSuggestions: grammarResult.correctedText,
    hasGrammarErrors: grammarResult.hasErrors
  };
};