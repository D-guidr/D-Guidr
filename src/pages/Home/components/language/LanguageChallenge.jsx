// src/pages/Home/components/language/LanguageChallenge.jsx
import { useState, useEffect } from 'react';
import { Card } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { Progress } from '../../../../components/common/Progress';
import { useApi } from '../../../../hooks/useApi';
import { Trophy, Clock, Star, Zap, Target } from 'lucide-react';
import './LanguageChallenge.css';

export function LanguageChallenge({ userData }) {
  const { get, post } = useApi();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    loadDailyChallenge();
  }, []);

  useEffect(() => {
    if (challenge?.time_remaining) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [challenge]);

  const loadDailyChallenge = async () => {
    try {
      const data = await get('/api/language/daily-challenge');
      setChallenge(data.challenge || getDefaultChallenge());
      setTimeLeft(data.challenge?.time_remaining || 0);
    } catch (error) {
      console.error('Error loading daily challenge:', error);
      setChallenge(getDefaultChallenge());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultChallenge = () => ({
    id: 'default',
    title: 'Daily German Challenge',
    description: 'Complete today\'s vocabulary quiz and maintain your 7-day streak! 🔥',
    progress: 7,
    total: 10,
    time_remaining: 15 * 60, // 15 minutes in seconds
    streak: 7,
    xp_reward: 50,
    type: 'vocabulary',
    difficulty: 'intermediate'
  });

  const handleStartChallenge = async () => {
    try {
      await post('/api/language/challenges/start', {
        challenge_id: challenge.id
      });
      // Navigate to the challenge page
      window.location.href = `/language/challenge/${challenge.id}`;
    } catch (error) {
      console.error('Error starting challenge:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'green',
      intermediate: 'orange',
      advanced: 'red',
      expert: 'purple'
    };
    return colors[difficulty] || 'gray';
  };

  const getChallengeIcon = (type) => {
    const icons = {
      vocabulary: '📚',
      grammar: '⚔️',
      speaking: '🎤',
      listening: '👂',
      reading: '📖',
      writing: '✍️'
    };
    return icons[type] || '🇩🇪';
  };

  if (loading) {
    return (
      <Card className="language-challenge loading">
        <div className="skeleton-challenge"></div>
      </Card>
    );
  }

  if (!challenge) {
    return null;
  }

  const progressPercentage = (challenge.progress / challenge.total) * 100;
  const isExpired = timeLeft <= 0;
  const isCompleted = challenge.progress >= challenge.total;

  return (
    <Card className={`language-challenge ${isExpired ? 'expired' : ''} ${isCompleted ? 'completed' : ''}`}>
      <div className="challenge-content">
        <div className="challenge-info">
          <div className="challenge-header">
            <div className="challenge-title-section">
              <div className="title-icon">
                <Trophy className="trophy-icon" />
                <h3>{challenge.title}</h3>
              </div>
              
              <div className="challenge-meta">
                <span className={`difficulty-badge ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className="challenge-type">
                  {getChallengeIcon(challenge.type)} {challenge.type}
                </span>
              </div>
            </div>
            
            <div className="streak-display">
              <div className="streak-info">
                <Zap className="streak-icon" />
                <span className="streak-count">{challenge.streak} days</span>
              </div>
              <div className="xp-reward">
                <Star className="xp-icon" />
                <span>+{challenge.xp_reward} XP</span>
              </div>
            </div>
          </div>

          <p className="challenge-description">{challenge.description}</p>

          <div className="progress-section">
            <div className="progress-header">
              <span>Today's Progress</span>
              <span>{challenge.progress}/{challenge.total}</span>
            </div>
            <Progress value={progressPercentage} className="challenge-progress" />
          </div>

          {!isExpired && (
            <div className="time-section">
              <div className="time-info">
                <Clock className="time-icon" />
                <span>Time remaining: {formatTime(timeLeft)}</span>
              </div>
              <div className="completion-badge">
                <Target className="target-icon" />
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>
          )}

          {isExpired && (
            <div className="expired-notice">
              <span>⏰ Challenge expired! New challenge available in:</span>
              <span className="reset-time">12 hours</span>
            </div>
          )}

          {isCompleted && (
            <div className="completed-notice">
              <span>🎉 Challenge completed! Come back tomorrow for a new one.</span>
            </div>
          )}
        </div>

        <div className="challenge-flag">
          <span className="flag-emoji">🇩🇪</span>
        </div>
      </div>

      <div className="challenge-actions">
        <Button
          onClick={handleStartChallenge}
          disabled={isCompleted || isExpired}
          className={`start-button ${isCompleted ? 'completed' : ''} ${isExpired ? 'expired' : ''}`}
          size="sm"
        >
          {isCompleted ? 'Completed' : isExpired ? 'Expired' : 'Continue Challenge'}
        </Button>
        
        {!isCompleted && !isExpired && (
          <Button variant="outline" size="sm" className="practice-button">
            Quick Practice
          </Button>
        )}
      </div>
    </Card>
  );
}