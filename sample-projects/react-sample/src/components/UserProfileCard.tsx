import React from 'react';

/**
 * Displays a user's profile information in a card format
 */
interface UserProfileCardProps {
  userId: string;
  showAvatar: boolean;
  onClick?: () => void;
}

export function UserProfileCard({ userId, showAvatar, onClick }: UserProfileCardProps) {
  return (
    <div className="user-profile-card" onClick={onClick}>
      {showAvatar && (
        <div className="avatar">
          <img src={`/avatars/${userId}.jpg`} alt="User avatar" />
        </div>
      )}
      <div className="user-info">
        <h3>User {userId}</h3>
        <p>Profile information goes here</p>
      </div>
    </div>
  );
} 