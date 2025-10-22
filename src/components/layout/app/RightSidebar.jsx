// src/components/layout/RightSidebar.jsx
import { useState, useEffect } from 'react';
import { Card } from '../../common/Card';
import { Avatar } from '../../common/Avatar';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { useApi } from '../../../hooks/useApi';
import { 
  Plus, 
  TrendingUp, 
  Calendar, 
  Users, 
  Briefcase,
  MessageCircle,
  ExternalLink,
  Gamepad2,
  Clock
} from 'lucide-react';
import './RightSidebar1.css';

export function RightSidebar({ userData }) {
  const { get, post } = useApi();
  const [suggestions, setSuggestions] = useState([]);
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [games, setGames] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRightSidebarData();
  }, []);

  const loadRightSidebarData = async () => {
    try {
      const [
        suggestionsData,
        eventsData,
        jobsData,
        chatRoomsData,
        groupsData,
        gamesData,
        trendingData
      ] = await Promise.all([
        get('/api/suggestions/buddies?limit=3'),
        get('/api/events/upcoming?limit=3'),
        get('/api/jobs/recommended?limit=3'),
        get('/api/chat/rooms'),
        get('/api/groups/popular?limit=3'),
        get('/api/games/active'),
        get('/api/trending/topics?limit=4')
      ]);

      setSuggestions(suggestionsData.users || []);
      setEvents(eventsData.events || []);
      setJobs(jobsData.jobs || []);
      setChatRooms(chatRoomsData.rooms || []);
      setGroups(groupsData.groups || []);
      setGames(gamesData.games || []);
      setTrendingTopics(trendingData.topics || []);
    } catch (error) {
      console.error('Error loading right sidebar data:', error);
      setSuggestions(getDefaultSuggestions());
      setEvents(getDefaultEvents());
      setJobs(getDefaultJobs());
      setChatRooms(getDefaultChatRooms());
      setGroups(getDefaultGroups());
      setGames(getDefaultGames());
      setTrendingTopics(getDefaultTrendingTopics());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultSuggestions = () => [
    {
      id: 1,
      name: "Neha Gupta",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
      title: "MS at TU Munich",
      mutual_connections: 12
    },
    {
      id: 2,
      name: "Karthik Iyer",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      title: "Software Engineer at BMW",
      mutual_connections: 8
    },
    {
      id: 3,
      name: "Deepa Singh",
      avatar_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
      title: "PhD at Heidelberg",
      mutual_connections: 15
    }
  ];

  const getDefaultEvents = () => [
    {
      id: 1,
      title: "Berlin Tech Meetup",
      date: "2024-10-20",
      attendees_count: 45,
      category: "Networking"
    },
    {
      id: 2,
      title: "Diwali Celebration Munich",
      date: "2024-10-24",
      attendees_count: 120,
      category: "Cultural"
    },
    {
      id: 3,
      title: "German Job Fair",
      date: "2024-10-28",
      attendees_count: 200,
      category: "Career"
    }
  ];

  const getDefaultJobs = () => [
    {
      id: 1,
      title: "Software Developer",
      company: "SAP",
      location: "Berlin",
      salary_range: "€55k-€75k",
      match_score: 92
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Siemens",
      location: "Munich",
      salary_range: "€50k-€65k",
      match_score: 87
    },
    {
      id: 3,
      title: "Product Manager",
      company: "BMW",
      location: "Stuttgart",
      salary_range: "€60k-€80k",
      match_score: 78
    }
  ];

  const getDefaultChatRooms = () => [
    { level: "A1", active_users: 12, color: "green" },
    { level: "A2", active_users: 8, color: "blue" },
    { level: "B1", active_users: 15, color: "purple" }
  ];

  const getDefaultGroups = () => [
    { id: 1, name: "Berlin Indians", members_count: 1240, icon: "🏙️" },
    { id: 2, name: "Tech Professionals", members_count: 890, icon: "💻" },
    { id: 3, name: "Cooking Enthusiasts", members_count: 456, icon: "🍳" }
  ];

  const getDefaultGames = () => [
    { id: 1, name: "Grammar Battle", online_players: 234, icon: "⚔️" },
    { id: 2, name: "Vocabulary Quiz", online_players: 156, icon: "🧠" },
    { id: 3, name: "Pronunciation Master", online_players: 89, icon: "🎤" }
  ];

  const getDefaultTrendingTopics = () => [
    { tag: "VisaUpdate2025", posts_count: 2300 },
    { tag: "TechJobsGermany", posts_count: 1800 },
    { tag: "StudentLifeMunich", posts_count: 1200 },
    { tag: "GermanLearning", posts_count: 945 }
  ];

  const handleAddConnection = async (userId) => {
    try {
      await post('/api/connections/request', { user_id: userId });
      setSuggestions(prev => prev.filter(user => user.id !== userId));
      // Show success message
      console.log('Connection request sent');
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await post(`/api/groups/${groupId}/join`);
      setGroups(prev => prev.filter(group => group.id !== groupId));
      // Show success message
      console.log('Joined group successfully');
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEventColor = (category) => {
    const colors = {
      'Networking': 'blue',
      'Cultural': 'green',
      'Career': 'purple',
      'Educational': 'orange',
      'Social': 'pink'
    };
    return colors[category] || 'gray';
  };

  if (loading) {
    return (
      <div className="right-sidebar">
        <div className="sidebar-loading">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="right-sidebar">
      <div className="sidebar-content">
        {/* D-Buddies Suggestions */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Connect with D-Buddies</h3>
            <Users className="header-icon" />
          </div>
          <div className="card-content">
            {suggestions.map((person) => (
              <div key={person.id} className="suggestion-item">
                <Avatar 
                  src={person.avatar_url} 
                  fallback={person.name.charAt(0)}
                  size="small"
                />
                <div className="suggestion-info">
                  <p className="suggestion-name">{person.name}</p>
                  <p className="suggestion-title">{person.title}</p>
                  <p className="suggestion-mutual">
                    {person.mutual_connections} mutual connections
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="add-button"
                  onClick={() => handleAddConnection(person.id)}
                >
                  <Plus className="add-icon" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="link" size="sm" className="card-footer">
            View all suggestions
          </Button>
        </Card>

        {/* Language Chat Rooms */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Language Chat Rooms</h3>
            <MessageCircle className="header-icon" />
          </div>
          <div className="card-content">
            {chatRooms.map((room) => (
              <button
                key={room.level}
                className="chat-room-button"
                onClick={() => window.location.href = `/chat/${room.level.toLowerCase()}`}
              >
                <div className="room-info">
                  <div className={`room-status-dot ${room.color}`}></div>
                  <span>{room.level} German</span>
                </div>
                <Badge variant="secondary" className="room-badge">
                  {room.active_users} active
                </Badge>
              </button>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="card-footer"
            onClick={() => window.location.href = '/chat'}
          >
            Join a Room
          </Button>
        </Card>

        {/* Learning Games */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Learning Games</h3>
            <Gamepad2 className="header-icon" />
          </div>
          <div className="card-content">
            {games.map((game) => (
              <button
                key={game.id}
                className="game-button"
                onClick={() => window.location.href = `/games/${game.id}`}
              >
                <div className="game-info">
                  <span className="game-icon">{game.icon}</span>
                  <div className="game-details">
                    <p className="game-name">{game.name}</p>
                    <p className="game-players">{game.online_players} online</p>
                  </div>
                </div>
                <ExternalLink className="external-icon" />
              </button>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Upcoming Events</h3>
            <Calendar className="header-icon" />
          </div>
          <div className="card-content">
            {events.map((event) => (
              <div 
                key={event.id}
                className="event-item"
                onClick={() => window.location.href = `/events/${event.id}`}
              >
                <div className={`event-border border-${getEventColor(event.category)}`}></div>
                <div className="event-content">
                  <p className="event-title">{event.title}</p>
                  <div className="event-meta">
                    <p className="event-date">{formatEventDate(event.date)}</p>
                    <Badge variant="secondary" className="event-badge">
                      {event.attendees_count} going
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" size="sm" className="card-footer">
            View all events
          </Button>
        </Card>

        {/* Recommended Jobs */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Jobs for You</h3>
            <Briefcase className="header-icon" />
          </div>
          <div className="card-content">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="job-item"
                onClick={() => window.location.href = `/jobs/${job.id}`}
              >
                <div className="job-header">
                  <p className="job-title">{job.title}</p>
                  <Badge className={`match-badge match-${job.match_score > 90 ? 'high' : job.match_score > 80 ? 'medium' : 'low'}`}>
                    {job.match_score}% match
                  </Badge>
                </div>
                <p className="job-company">{job.company}</p>
                <div className="job-footer">
                  <p className="job-location">{job.location}</p>
                  <p className="job-salary">{job.salary_range}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" size="sm" className="card-footer">
            View all jobs
          </Button>
        </Card>

        {/* Groups & Communities */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Groups & Communities</h3>
            <TrendingUp className="header-icon" />
          </div>
          <div className="card-content">
            {groups.map((group) => (
              <button
                key={group.id}
                className="group-button"
                onClick={() => handleJoinGroup(group.id)}
              >
                <div className="group-info">
                  <span className="group-icon">{group.icon}</span>
                  <div className="group-details">
                    <p className="group-name">{group.name}</p>
                    <p className="group-members">{group.members_count} members</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="join-button">
                  <Plus className="join-icon" />
                </Button>
              </button>
            ))}
          </div>
          <Button variant="link" size="sm" className="card-footer">
            Discover more groups
          </Button>
        </Card>

        {/* Trending Topics */}
        <Card className="sidebar-card">
          <div className="card-header">
            <h3>Trending Topics</h3>
            <TrendingUp className="header-icon" />
          </div>
          <div className="card-content">
            {trendingTopics.map((topic, index) => (
              <div key={topic.tag} className="topic-item">
                <p className="topic-tag">#{topic.tag}</p>
                <p className="topic-count">{topic.posts_count} posts</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}