import React from 'react';

/**
 * Displays author information in a card format
 */
interface AuthorDetailsProps {
  authorId: string;
  showAvatar: boolean;
  onClick?: () => void;
}

export function AuthorDetails({ authorId, showAvatar, onClick }: AuthorDetailsProps) {
  return (
    <div className="author-details" onClick={onClick}>
      {showAvatar && (
        <div className="avatar">
          <img src={`/authors/${authorId}.jpg`} alt="Author avatar" />
        </div>
      )}
      <div className="author-info">
        <h3>Author {authorId}</h3>
        <p>Author information goes here</p>
      </div>
    </div>
  );
} 