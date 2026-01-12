import React, { useState, useEffect } from 'react';
import { Avatar, Tag } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import './LiveActivity.css';

interface Activity {
  id: number;
  user: string;
  avatar: string;
  game: string;
  amount: string;
  time: string;
  gameColor: string;
}

const gameColors: Record<string, string> = {
  'Mobile Legends': '#00d9ff',
  'Free Fire': '#ff9500',
  'PUBG Mobile': '#ffd700',
  'Genshin Impact': '#a855f7',
  'Valorant': '#ff4655',
  'Call of Duty': '#00ff88',
};

const generateActivity = (id: number): Activity => {
  const users = [
    'Sokha***', 'Dara***', 'Pich***', 'Vanna***', 'Kosal***',
    'Bopha***', 'Chea***', 'Mony***', 'Srey***', 'Visal***',
    'Kakada***', 'Ratana***', 'Sophal***', 'Theary***', 'Navy***'
  ];
  const games = ['Mobile Legends', 'Free Fire', 'PUBG Mobile', 'Genshin Impact'];
  const amounts = ['86💎', '172💎', '257💎', '706💎', '100💰', '310💰', '520💰'];
  const times = ['Just now', '10s ago', '30s ago', '1m ago', '2m ago'];

  const game = games[Math.floor(Math.random() * games.length)];
  
  return {
    id,
    user: users[Math.floor(Math.random() * users.length)],
    avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${id}`,
    game,
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    time: times[Math.floor(Math.random() * times.length)],
    gameColor: gameColors[game] || '#ff2d78',
  };
};

const LiveActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    generateActivity(1),
    generateActivity(2),
    generateActivity(3),
  ]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setActivities(prev => {
          const newActivity = generateActivity(Date.now());
          return [newActivity, ...prev.slice(0, 2)];
        });
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-activity">
      <div className="live-header">
        <ThunderboltFilled className="live-icon" />
        <span>Live Top-ups</span>
        <span className="live-dot"></span>
      </div>
      <div className={`activity-list ${isVisible ? 'visible' : 'hidden'}`}>
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="activity-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Avatar src={activity.avatar} size={32} />
            <div className="activity-info">
              <span className="activity-user">{activity.user}</span>
              <span className="activity-action">topped up</span>
              <Tag 
                color={activity.gameColor} 
                className="activity-game"
                style={{ 
                  background: `${activity.gameColor}20`,
                  borderColor: activity.gameColor,
                  color: activity.gameColor 
                }}
              >
                {activity.amount}
              </Tag>
            </div>
            <span className="activity-time">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivity;
