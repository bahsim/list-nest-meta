import { ASTParser } from './ast-parser';
import { SimilarityScorer } from './similarity-scorer';
import { CodePattern } from './types';

// Debug script to test similarity scoring
async function debugSimilarity() {
  const parser = new ASTParser();
  const scorer = new SimilarityScorer(0.5); // Lower threshold for testing
  
  try {
    // Parse both components
    const authorDetails = parser.parseFile('../../src/components/AuthorDetails.tsx');
    const userProfileCard = parser.parseFile('../../src/components/UserProfileCard.tsx');
    
    console.log('AuthorDetails patterns:', authorDetails);
    console.log('UserProfileCard patterns:', userProfileCard);
    
    if (authorDetails.length > 0 && userProfileCard.length > 0) {
      const authorComponent = authorDetails[0];
      const userComponent = userProfileCard[0];
      
      console.log('\nComparing:');
      console.log('AuthorDetails:', {
        name: authorComponent.name,
        props: authorComponent.props,
        description: authorComponent.description
      });
      
      console.log('UserProfileCard:', {
        name: userComponent.name,
        props: userComponent.props,
        description: userComponent.description
      });
      
      // Test similarity
      const suggestions = scorer.findSimilarPatterns(authorComponent, [userComponent]);
      
      console.log('\nSimilarity results:', suggestions);
      
      if (suggestions.length > 0) {
        const suggestion = suggestions[0];
        console.log('\nDetailed scores:');
        console.log('Structural score:', suggestion.structuralScore);
        console.log('Semantic score:', suggestion.semanticScore);
        console.log('Combined score:', suggestion.combinedScore);
        console.log('Reason:', suggestion.reason);
      } else {
        console.log('\nNo suggestions found. Testing with different threshold...');
        
        // Test with different thresholds
        for (const threshold of [0.3, 0.4, 0.5, 0.6, 0.7]) {
          scorer.setThreshold(threshold);
          const testSuggestions = scorer.findSimilarPatterns(authorComponent, [userComponent]);
          console.log(`Threshold ${threshold}: ${testSuggestions.length} suggestions`);
        }
      }
    }
    
  } catch (error) {
    console.error('Error in debug:', error);
  }
}

debugSimilarity(); 