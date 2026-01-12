import React, { useState, useEffect } from 'react';
import { Badge, Tooltip } from 'antd';
import { GiftFilled, CloseOutlined } from '@ant-design/icons';
import './FloatingReward.css';

interface FloatingRewardProps {
  onClaim?: () => void;
}

const FloatingReward: React.FC<FloatingRewardProps> = ({ onClaim }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Auto expand after 3 seconds
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleClaim = () => {
    setIsExpanded(false);
    onClaim?.();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <div className={`floating-reward ${isExpanded ? 'expanded' : ''}`}>
      <Tooltip title="🎁 Daily Reward!" placement="left" open={!isExpanded}>
        <Badge count="NEW" size="small" offset={[-5, 5]}>
          <button 
            className="reward-trigger"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <GiftFilled className="reward-icon" />
          </button>
        </Badge>
      </Tooltip>

      {isExpanded && (
        <div className="reward-popup">
          <button className="close-btn" onClick={handleClose}>
            <CloseOutlined />
          </button>
          
          <div className="reward-content">
            <div className="reward-emoji">🎁</div>
            <h4>Daily Bonus!</h4>
            <p>Top up today & get <span className="bonus">+5% BONUS</span></p>
            <button className="claim-btn" onClick={handleClaim}>
              Claim Now ⚡
            </button>
          </div>
          
          <div className="reward-timer">
            ⏰ Expires in 23:45:12
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingReward;
