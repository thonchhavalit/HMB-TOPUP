import React, { useState } from 'react';
import { Card, Input, Button, message } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MLIcon, FFIcon, PUBGIcon, LightningIcon } from '../GameIcons/GameIcons';
import './QuickTopUp.css';

interface QuickGame {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  placeholder: string;
}

const quickGames: QuickGame[] = [
  { 
    id: 'ml', 
    name: 'Mobile Legends', 
    icon: <MLIcon size={36} />, 
    color: '#00d9ff',
    placeholder: 'Enter User ID (Server ID)'
  },
  { 
    id: 'ff', 
    name: 'Free Fire', 
    icon: <FFIcon size={36} />, 
    color: '#ff9500',
    placeholder: 'Enter Player ID'
  },
  { 
    id: 'pubg', 
    name: 'PUBG Mobile', 
    icon: <PUBGIcon size={36} />, 
    color: '#ffd700',
    placeholder: 'Enter Player ID'
  },
];

const QuickTopUp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string>('ml');
  const [playerId, setPlayerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickStart = () => {
    if (!playerId.trim()) {
      message.warning('Please enter your Player ID! 🎮');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/topup/${selectedGame}`, { 
        state: { playerId, verified: true } 
      });
    }, 800);
  };

  const currentGame = quickGames.find(g => g.id === selectedGame);

  return (
    <Card className="quick-topup-card">
      <div className="quick-topup-header">
        <LightningIcon size={22} />
        <span>Quick Top-Up</span>
        <span className="quick-badge">⚡ 30s</span>
      </div>

      <div className="quick-games">
        {quickGames.map(game => (
          <button
            key={game.id}
            className={`quick-game-btn ${selectedGame === game.id ? 'active' : ''}`}
            onClick={() => setSelectedGame(game.id)}
            style={{ 
              '--game-color': game.color,
              borderColor: selectedGame === game.id ? game.color : undefined,
              background: selectedGame === game.id ? `${game.color}15` : undefined,
            } as React.CSSProperties}
          >
            <span className="game-icon">{game.icon}</span>
            <span className="game-name">{game.name}</span>
          </button>
        ))}
      </div>

      <div className="quick-input-group">
        <Input
          size="large"
          placeholder={currentGame?.placeholder}
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="quick-input"
          onPressEnter={handleQuickStart}
        />
        <Button 
          type="primary" 
          size="large"
          icon={<RightOutlined />}
          className="quick-btn"
          loading={isLoading}
          onClick={handleQuickStart}
        >
          GO
        </Button>
      </div>

      <div className="quick-tip">
        💡 Tip: Save your ID for instant top-ups next time!
      </div>
    </Card>
  );
};

export default QuickTopUp;
