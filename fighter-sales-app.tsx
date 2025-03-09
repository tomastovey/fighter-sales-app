import * as React from 'react';
import { useState, useEffect } from 'react';

// Custom icon components using SVG
const IconComponents = {
  Ticket: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M13 5v2"/>
      <path d="M13 17v2"/>
      <path d="M13 11v2"/>
    </svg>
  ),
  Video: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="m22 8-6 4 6 4V8Z"/>
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
    </svg>
  ),
  DollarSign: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <line x1="12" x2="12" y1="2" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Award: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  LogOut: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  Users: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  User: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  ChevronRight: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  Facebook: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  ),
  Instagram: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  Share2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
    </svg>
  )
};

// Mock data for demonstration
const mockFighters = [
  { id: 1, name: 'Alex "The Destroyer" Johnson', email: 'alex@example.com', password: 'password123', commission: 10, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: 2, name: 'Maria "Knockout Queen" Rodriguez', email: 'maria@example.com', password: 'password123', commission: 12, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: 3, name: 'Tyson "The Tank" Williams', email: 'tyson@example.com', password: 'password123', commission: 8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tyson' },
];

const mockSalesData = {
  1: { tickets: 87, ppv: 142, revenue: 8940 },
  2: { tickets: 104, ppv: 98, revenue: 7625 },
  3: { tickets: 63, ppv: 78, revenue: 5340 },
};

const mockEvent = {
  name: "Ultimate Fighting Championship 2025",
  date: new Date(2025, 3, 15, 20, 0), // April 15, 2025, 8:00 PM
  ticketPrice: 75,
  ppvPrice: 29.99,
  venue: "Madison Square Garden, New York",
  image: "/api/placeholder/800/400"
};

const mockAchievements = [
  { id: 1, title: '50 Tickets Sold', icon: '🎟️', unlocked: true },
  { id: 2, title: '100 Tickets Sold', icon: '🎟️🎟️', unlocked: true },
  { id: 3, title: '50 PPV Sales', icon: '📺', unlocked: true },
  { id: 4, title: '100 PPV Sales', icon: '📺📺', unlocked: true },
  { id: 5, title: '$5,000 in Revenue', icon: '💰', unlocked: true },
  { id: 6, title: '$10,000 in Revenue', icon: '💰💰', unlocked: false },
];

// Fighter Sales App
const FighterSalesApp = () => {
  // State initialization
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [countdownString, setCountdownString] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [fighters, setFighters] = useState(mockFighters);
  const [salesData, setSalesData] = useState(mockSalesData);
  const [eventSettings, setEventSettings] = useState(mockEvent);
  const [showAddFighterForm, setShowAddFighterForm] = useState(false);
  const [newFighter, setNewFighter] = useState({
    name: '',
    email: '',
    password: 'password123',
    commission: 10
  });
  
  // Initialize leaderboard
  const calculateLeaderboard = () => {
    return fighters.map(fighter => {
      const sales = salesData[fighter.id] || { tickets: 0, ppv: 0, revenue: 0 };
      return {
        id: fighter.id,
        name: fighter.name,
        tickets: sales.tickets || 0,
        ppv: sales.ppv || 0,
        total: (sales.tickets || 0) + (sales.ppv || 0)
      };
    }).sort((a, b) => b.total - a.total);
  };

  const [leaderboard, setLeaderboard] = useState(calculateLeaderboard());

  // Update leaderboard whenever fighters or sales data changes
  useEffect(() => {
    setLeaderboard(calculateLeaderboard());
  }, [fighters, salesData]);

  // Update countdown timer
  useEffect(() => {
    if (currentView !== 'login' && eventSettings && eventSettings.date) {
      const updateCountdown = () => {
        const now = new Date();
        const timeLeft = eventSettings.date - now;
        
        if (timeLeft <= 0) {
          setCountdownString('Event has started!');
          return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        setCountdownString(`${days}d ${hours}h ${minutes}m`);
      };
      
      // Initial update
      updateCountdown();
      const interval = setInterval(updateCountdown, 60000);
      
      return () => clearInterval(interval);
    }
  }, [currentView, eventSettings]);

  // Calculate commission for current user
  const calculateCommission = (userId) => {
    const user = fighters.find(f => f.id === userId);
    const sales = salesData[userId];
    if (!user || !sales) return 0;
    
    return ((sales.revenue || 0) * (user.commission || 0) / 100).toFixed(2);
  };

  // Handle login
  const handleLogin = () => {
    const user = fighters.find(f => f.email === email && f.password === password);
    
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
      setLoginError('');
    } else if (email === 'admin@example.com' && password === 'admin123') {
      setAdminMode(true);
      setCurrentView('admin');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setAdminMode(false);
    setCurrentView('login');
  };

  // Handle copy link
  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Render login view
  const renderLoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Fighter Sales Platform</h1>
          <p className="text-gray-400">Sign in to access your dashboard</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 bg-gray-700 rounded text-white" 
              placeholder="fighter@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 bg-gray-700 rounded text-white" 
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {loginError && (
            <div className="text-red-500 text-sm">{loginError}</div>
          )}
          
          <button 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
            onClick={handleLogin}
          >
            Sign In
          </button>
          
          <div className="mt-4 text-center text-gray-500 text-sm">
            <p>Demo accounts:</p>
            <p>Fighter: alex@example.com / password123</p>
            <p>Admin: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render dashboard view for fighters
  const renderDashboardView = () => {
    if (!currentUser) return null;
    
    const userSales = salesData[currentUser.id] || { tickets: 0, ppv: 0, revenue: 0 };
    
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Top navbar */}
        <nav className="bg-gray-800 shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Fighter Sales Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                <span className="mr-1">Event in:</span>
                <span className="text-white font-bold">{countdownString}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center"
              >
                <IconComponents.LogOut size={16} />
              </button>
            </div>
          </div>
        </nav>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-6">
          {/* Fighter info and stats */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img 
                  src={currentUser.avatar || "/api/placeholder/100/100"} 
                  alt={currentUser.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{currentUser.name}</h2>
                <p className="text-gray-400 mb-4">{currentUser.email}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.Ticket className="inline-block mb-2 text-blue-400" size={24} />
                    <h3 className="text-sm text-gray-400">Tickets Sold</h3>
                    <p className="text-2xl font-bold">{userSales.tickets}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.Video className="inline-block mb-2 text-purple-400" size={24} />
                    <h3 className="text-sm text-gray-400">PPV Sales</h3>
                    <p className="text-2xl font-bold">{userSales.ppv}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.DollarSign className="inline-block mb-2 text-green-400" size={24} />
                    <h3 className="text-sm text-gray-400">Revenue</h3>
                    <p className="text-2xl font-bold">${userSales.revenue}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.Award className="inline-block mb-2 text-yellow-400" size={24} />
                    <h3 className="text-sm text-gray-400">Commission ({currentUser.commission}%)</h3>
                    <p className="text-2xl font-bold">${calculateCommission(currentUser.id)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Your links and sharing */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Your Referral Links</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-blue-400 mb-2">Ticket Sales Link</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    readOnly 
                    value={`https://fighters.example.com/tickets/${currentUser.id}`}
                    className="flex-grow bg-gray-900 p-2 rounded-l text-sm"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r flex items-center transition-colors"
                  >
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button className="bg-blue-800 hover:bg-blue-900 p-2 rounded text-sm flex items-center">
                    <IconComponents.Facebook size={16} className="mr-1" /> Share
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-sm flex items-center">
                    <IconComponents.Twitter size={16} className="mr-1" /> Tweet
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-sm flex items-center">
                    <IconComponents.Instagram size={16} className="mr-1" /> Instagram
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 p-2 rounded text-sm flex items-center">
                    <IconComponents.Share2 size={16} className="mr-1" /> More
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-purple-400 mb-2">PPV Sales Link</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    readOnly 
                    value={`https://fighters.example.com/ppv/${currentUser.id}`}
                    className="flex-grow bg-gray-900 p-2 rounded-l text-sm"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="bg-purple-600 hover:bg-purple-700 px-4 rounded-r flex items-center transition-colors"
                  >
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button className="bg-blue-800 hover:bg-blue-900 p-2 rounded text-sm flex items-center">
                    <IconComponents.Facebook size={16} className="mr-1" /> Share
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-sm flex items-center">
                    <IconComponents.Twitter size={16} className="mr-1" /> Tweet
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-sm flex items-center">
                    <IconComponents.Instagram size={16} className="mr-1" /> Instagram
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 p-2 rounded text-sm flex items-center">
                    <IconComponents.Share2 size={16} className="mr-1" /> More
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Two-column layout for leaderboard and achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leaderboard */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Top Sellers Leaderboard</h2>
              
              <div className="space-y-3">
                {leaderboard.map((fighter, index) => (
                  <div 
                    key={fighter.id}
                    className={`flex items-center p-3 rounded-lg ${
                      fighter.id === currentUser.id ? 'bg-blue-900 bg-opacity-30 border border-blue-400' : 'bg-gray-700'
                    }`}
                  >
                    <div className="mr-3 font-bold text-xl w-6 text-center">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">
                        {fighter.name}
                        {fighter.id === currentUser.id && <span className="text-blue-400 ml-2">(You)</span>}
                      </h3>
                      <div className="text-sm text-gray-400">
                        {fighter.tickets} tickets · {fighter.ppv} PPV
                      </div>
                    </div>
                    <div className="text-2xl font-bold">
                      {fighter.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Your Achievements</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {mockAchievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg text-center ${
                      achievement.unlocked 
                        ? 'bg-yellow-900 bg-opacity-30 border border-yellow-700' 
                        : 'bg-gray-700 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <h3 className={`font-bold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                    <div className="text-xs mt-1">
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render admin view
  const renderAdminView = () => (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top navbar */}
      <nav className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Fighter Sales Platform</h1>
            <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">ADMIN</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <span className="mr-1">Event in:</span>
              <span className="text-white font-bold">{countdownString}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center"
            >
              <IconComponents.LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* Event overview */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-full md:w-1/3 rounded overflow-hidden bg-gray-700 flex-shrink-0">
              <img 
                src={eventSettings.image} 
                alt={eventSettings.name}
                className="w-full h-auto" 
              />
            </div>
            
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-1">{eventSettings.name}</h2>
              <p className="text-gray-400 mb-2">{eventSettings.venue}</p>
              <p className="text-gray-400 mb-4">
                {eventSettings.date.toLocaleDateString()} at {eventSettings.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <IconComponents.Ticket className="inline-block mb-2 text-blue-400" size={24} />
                  <h3 className="text-sm text-gray-400">Total Tickets</h3>
                  <p className="text-2xl font-bold">
                    {Object.values(salesData).reduce((sum, data) => sum + (data.tickets || 0), 0)}
                  </p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <IconComponents.Video className="inline-block mb-2 text-purple-400" size={24} />
                  <h3 className="text-sm text-gray-400">Total PPV</h3>
                  <p className="text-2xl font-bold">
                    {Object.values(salesData).reduce((sum, data) => sum + (data.ppv || 0), 0)}
                  </p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <IconComponents.DollarSign className="inline-block mb-2 text-green-400" size={24} />
                  <h3 className="text-sm text-gray-400">Total Revenue</h3>
                  <p className="text-2xl font-bold">
                    ${Object.values(salesData).reduce((sum, data) => sum + (data.revenue || 0), 0)}
                  </p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <IconComponents.Users className="inline-block mb-2 text-yellow-400" size={24} />
                  <h3 className="text-sm text-gray-400">Active Fighters</h3>
                  <p className="text-2xl font-bold">{fighters.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fighters list */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Fighters</h2>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
              onClick={() => setShowAddFighterForm(true)}
            >
              <IconComponents.User size={16} className="mr-2" /> Add New Fighter
            </button>
          </div>
          
          {showAddFighterForm && (
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <h3 className="font-bold mb-3">Add New Fighter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Fighter Name</label>
                  <input 
                    type="text" 
                    value={newFighter.name}
                    onChange={(e) => setNewFighter({...newFighter, name: e.target.value})}
                    placeholder="John 'The Eagle' Doe"
                    className="w-full bg-gray-600 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    value={newFighter.email}
                    onChange={(e) => setNewFighter({...newFighter, email: e.target.value})}
                    placeholder="fighter@example.com"
                    className="w-full bg-gray-600 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input 
                    type="text" 
                    value={newFighter.password}
                    onChange={(e) => setNewFighter({...newFighter, password: e.target.value})}
                    placeholder="password123"
                    className="w-full bg-gray-600 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Commission (%)</label>
                  <input 
                    type="number" 
                    value={newFighter.commission}
                    onChange={(e) => setNewFighter({...newFighter, commission: parseInt(e.target.value) || 0})}
                    placeholder="10"
                    className="w-full bg-gray-600 p-2 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button 
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowAddFighterForm(false);
                    setNewFighter({
                      name: '',
                      email: '',
                      password: 'password123',
                      commission: 10
                    });
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  onClick={() => {
                    if (newFighter.name && newFighter.email) {
                      // Generate new ID that doesn't exist yet
                      const newId = fighters.length > 0 ? 
                        Math.max(...fighters.map(f => f.id)) + 1 : 1;
                      
                      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${newFighter.name.split(' ')[0]}`;
                      
                      const newFighterComplete = {
                        ...newFighter,
                        id: newId,
                        avatar
                      };
                      
                      // Update fighters list
                      setFighters([...fighters, newFighterComplete]);
                      
                      // Add empty sales data
                      setSalesData({
                        ...salesData,
                        [newId]: {
                          tickets: 0,
                          ppv: 0,
                          revenue: 0
                        }
                      });
                      
                      // Reset form
                      setShowAddFighterForm(false);
                      setNewFighter({
                        name: '',
                        email: '',
                        password: 'password123',
                        commission: 10
                      });
                      
                      // Show success message
                      alert(`Fighter "${newFighterComplete.name}" added successfully!`);
                    }
                  }}
                >
                  Add Fighter
                </button>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-center">Commission</th>
                  <th className="py-3 px-4 text-center">Tickets</th>
                  <th className="py-3 px-4 text-center">PPV</th>
                  <th className="py-3 px-4 text-center">Revenue</th>
                  <th className="py-3 px-4 text-center">Earned</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fighters.map(fighter => {
                  const sales = salesData[fighter.id] || { tickets: 0, ppv: 0, revenue: 0 };
                  const commission = calculateCommission(fighter.id);
                  
                  return (
                    <tr key={fighter.id} className="border-t border-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500 mr-3">
                            <img 
                              src={fighter.avatar} 
                              alt={fighter.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <input
                            type="text"
                            value={fighter.name}
                            onChange={(e) => {
                              const updatedFighters = fighters.map(f => 
                                f.id === fighter.id ? {...f, name: e.target.value} : f
                              );
                              setFighters(updatedFighters);
                            }}
                            className="bg-transparent border-b border-gray-700 focus:border-blue-500 outline-none px-1"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="email"
                          value={fighter.email}
                          onChange={(e) => {
                            const updatedFighters = fighters.map(f => 
                              f.id === fighter.id ? {...f, email: e.target.value} : f
                            );
                            setFighters(updatedFighters);
                          }}
                          className="bg-transparent border-b border-gray-700 focus:border-blue-500 outline-none px-1 w-full"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          value={fighter.commission}
                          onChange={(e) => {
                            const updatedFighters = fighters.map(f => 
                              f.id === fighter.id ? {...f, commission: parseInt(e.target.value) || 0} : f
                            );
                            setFighters(updatedFighters);
                          }}
                          className="bg-transparent border-b border-gray-700 focus:border-blue-500 outline-none px-1 w-16 text-center"
                        />%
                      </td>
                      <td className="py-3 px-4 text-center">{sales.tickets || 0}</td>
                      <td className="py-3 px-4 text-center">{sales.ppv || 0}</td>
                      <td className="py-3 px-4 text-center">${sales.revenue || 0}</td>
                      <td className="py-3 px-4 text-center">${commission}</td>
                      <td className="py-3 px-4 text-center">
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() => {
                            setSelectedFighter(fighter);
                            setCurrentView('fighter-detail');
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Settings Panel */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Event Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3 text-gray-400">Pricing</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Ticket Price ($)</label>
                  <input 
                    type="number" 
                    value={eventSettings.ticketPrice}
                    onChange={(e) => setEventSettings({
                      ...eventSettings,
                      ticketPrice: parseFloat(e.target.value) || 0
                    })}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">PPV Price ($)</label>
                  <input 
                    type="number" 
                    value={eventSettings.ppvPrice}
                    onChange={(e) => setEventSettings({
                      ...eventSettings,
                      ppvPrice: parseFloat(e.target.value) || 0
                    })}
                    step="0.01"
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Default Commission (%)</label>
                  <input 
                    type="number" 
                    value={newFighter.commission}
                    onChange={(e) => {
                      // Update default commission for new fighters
                      setNewFighter({
                        ...newFighter,
                        commission: parseInt(e.target.value) || 0
                      });
                    }}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3 text-gray-400">Event Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Event Name</label>
                  <input 
                    type="text" 
                    value={eventSettings.name}
                    onChange={(e) => setEventSettings({
                      ...eventSettings,
                      name: e.target.value
                    })}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Venue</label>
                  <input 
                    type="text" 
                    value={eventSettings.venue}
                    onChange={(e) => setEventSettings({
                      ...eventSettings,
                      venue: e.target.value
                    })}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Date and Time</label>
                  <input 
                    type="datetime-local" 
                    value="2025-04-15T20:00"
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      if (!isNaN(newDate.getTime())) {
                        setEventSettings({
                          ...eventSettings,
                          date: newDate
                        });
                      }
                    }}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={() => {
                // Show a success message (in a real app, this would save to a database)
                alert("Settings saved successfully!");
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render fighter detail view
  const renderFighterDetailView = () => {
    if (!selectedFighter) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No fighter selected</h2>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => setCurrentView('admin')}
            >
              Back to Admin
            </button>
          </div>
        </div>
      );
    }
    
    const fighterSales = salesData[selectedFighter.id] || { tickets: 0, ppv: 0, revenue: 0 };
    
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Top navbar */}
        <nav className="bg-gray-800 shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Fighter Sales Platform</h1>
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">ADMIN</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('admin')}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded flex items-center"
              >
                <IconComponents.ChevronRight size={16} className="mr-1" /> Back to Admin
              </button>
              <button 
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full flex items-center justify-center"
              >
                <IconComponents.LogOut size={16} />
              </button>
            </div>
          </div>
        </nav>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-6">
          {/* Fighter info */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <img 
                  src={selectedFighter.avatar} 
                  alt={selectedFighter.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{selectedFighter.name}</h2>
                <p className="text-gray-400 mb-4">{selectedFighter.email}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.Ticket className="inline-block mb-2 text-blue-400" size={24} />
                    <h3 className="text-sm text-gray-400">Tickets Sold</h3>
                    <p className="text-2xl font-bold">{fighterSales.tickets || 0}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.Video className="inline-block mb-2 text-purple-400" size={24} />
                    <h3 className="text-sm text-gray-400">PPV Sales</h3>
                    <p className="text-2xl font-bold">{fighterSales.ppv || 0}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.DollarSign className="inline-block mb-2 text-green-400" size={24} />
                    <h3 className="text-sm text-gray-400">Revenue</h3>
                    <p className="text-2xl font-bold">${fighterSales.revenue || 0}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <IconComponents.Award className="inline-block mb-2 text-yellow-400" size={24} />
                    <h3 className="text-sm text-gray-400">Commission ({selectedFighter.commission}%)</h3>
                    <p className="text-2xl font-bold">${calculateCommission(selectedFighter.id)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add sample sales data for demonstration purposes */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sales Data</h2>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                onClick={() => {
                  // Add some random sales for demonstration purposes
                  if (selectedFighter) {
                    const currentSales = salesData[selectedFighter.id] || { tickets: 0, ppv: 0, revenue: 0 };
                    const newTickets = Math.floor(Math.random() * 5) + 1; // 1-5 new tickets
                    const newPPV = Math.floor(Math.random() * 3) + 1; // 1-3 new PPV sales
                    
                    const ticketRevenue = newTickets * eventSettings.ticketPrice;
                    const ppvRevenue = newPPV * eventSettings.ppvPrice;
                    const totalNewRevenue = ticketRevenue + ppvRevenue;
                    
                    const updatedSales = {
                      tickets: (currentSales.tickets || 0) + newTickets,
                      ppv: (currentSales.ppv || 0) + newPPV,
                      revenue: (currentSales.revenue || 0) + totalNewRevenue
                    };
                    
                    setSalesData({
                      ...salesData,
                      [selectedFighter.id]: updatedSales
                    });
                    
                    alert(`Added ${newTickets} tickets and ${newPPV} PPV sales for ${selectedFighter.name}`);
                  }
                }}
              >
                <IconComponents.DollarSign size={16} className="mr-2" /> Add Sample Sales
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Tickets Sold</label>
                <input 
                  type="number" 
                  value={fighterSales.tickets || 0}
                  onChange={(e) => {
                    const newTickets = parseInt(e.target.value) || 0;
                    const updatedSales = {
                      ...fighterSales,
                      tickets: newTickets,
                      // Update revenue based on ticket price
                      revenue: (newTickets * eventSettings.ticketPrice) + ((fighterSales.ppv || 0) * eventSettings.ppvPrice)
                    };
                    
                    setSalesData({
                      ...salesData,
                      [selectedFighter.id]: updatedSales
                    });
                  }}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">PPV Sales</label>
                <input 
                  type="number" 
                  value={fighterSales.ppv || 0}
                  onChange={(e) => {
                    const newPPV = parseInt(e.target.value) || 0;
                    const updatedSales = {
                      ...fighterSales,
                      ppv: newPPV,
                      // Update revenue based on PPV price
                      revenue: ((fighterSales.tickets || 0) * eventSettings.ticketPrice) + (newPPV * eventSettings.ppvPrice)
                    };
                    
                    setSalesData({
                      ...salesData,
                      [selectedFighter.id]: updatedSales
                    });
                  }}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Total Revenue ($)</label>
                <input 
                  type="number" 
                  value={fighterSales.revenue || 0}
                  onChange={(e) => {
                    const updatedSales = {
                      ...fighterSales,
                      revenue: parseFloat(e.target.value) || 0
                    };
                    
                    setSalesData({
                      ...salesData,
                      [selectedFighter.id]: updatedSales
                    });
                  }}
                  className="w-full bg-gray-700 p-2 rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Fighter Settings */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Fighter Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Fighter Name</label>
                  <input 
                    type="text" 
                    value={selectedFighter.name}
                    onChange={(e) => {
                      setSelectedFighter({...selectedFighter, name: e.target.value});
                      // Update in the main fighters array too
                      const updatedFighters = fighters.map(f => 
                        f.id === selectedFighter.id ? {...f, name: e.target.value} : f
                      );
                      setFighters(updatedFighters);
                    }}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    value={selectedFighter.email}
                    onChange={(e) => {
                      setSelectedFighter({...selectedFighter, email: e.target.value});
                      // Update in the main fighters array too
                      const updatedFighters = fighters.map(f => 
                        f.id === selectedFighter.id ? {...f, email: e.target.value} : f
                      );
                      setFighters(updatedFighters);
                    }}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Commission Rate (%)</label>
                  <input 
                    type="number" 
                    value={selectedFighter.commission}
                    onChange={(e) => {
                      const commissionValue = parseInt(e.target.value) || 0;
                      setSelectedFighter({...selectedFighter, commission: commissionValue});
                      // Update in the main fighters array too
                      const updatedFighters = fighters.map(f => 
                        f.id === selectedFighter.id ? {...f, commission: commissionValue} : f
                      );
                      setFighters(updatedFighters);
                    }}
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Reset Password</label>
                  <button 
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      const newPassword = Math.random().toString(36).slice(-8);
                      setSelectedFighter({...selectedFighter, password: newPassword});
                      
                      // Update in the main fighters array too
                      const updatedFighters = fighters.map(f => 
                        f.id === selectedFighter.id ? {...f, password: newPassword} : f
                      );
                      setFighters(updatedFighters);
                      
                      alert(`New password generated: ${newPassword}`);
                    }}
                  >
                    Generate New Password
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-gray-400">Communication</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      id="notify-sales"
                      className="mr-2" 
                    />
                    <label htmlFor="notify-sales">Send sales notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      id="event-reminders"
                      className="mr-2" 
                    />
                    <label htmlFor="event-reminders">Event reminders</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      id="achievement-notifications"
                      className="mr-2" 
                    />
                    <label htmlFor="achievement-notifications">Achievement notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      id="leaderboard-updates"
                      className="mr-2" 
                    />
                    <label htmlFor="leaderboard-updates">Leaderboard updates</label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-bold text-gray-400 mb-2">Notes</h3>
                  <textarea 
                    className="w-full bg-gray-700 p-2 rounded h-32"
                    placeholder="Add notes about this fighter..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button 
                className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (confirm("Are you sure you want to deactivate this fighter's account?")) {
                    // In a real app, we might just flag them as inactive
                    // For this demo, we'll remove them completely
                    const updatedFighters = fighters.filter(f => f.id !== selectedFighter.id);
                    setFighters(updatedFighters);
                    
                    // Go back to admin page
                    setCurrentView('admin');
                    setSelectedFighter(null);
                  }
                }}
              >
                Deactivate Account
              </button>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  // Show a success message (in a real app, this would save to a database)
                  alert("Fighter details saved successfully!");
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
          
          {/* Sales History */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Sales History</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-center">Amount</th>
                    <th className="py-3 px-4 text-center">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mock sales history */}
                  <tr className="border-t border-gray-800">
                    <td className="py-3 px-4">Mar 6, 2025</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">Ticket</span>
                    </td>
                    <td className="py-3 px-4">John Smith</td>
                    <td className="py-3 px-4 text-center">${eventSettings.ticketPrice}</td>
                    <td className="py-3 px-4 text-center">${(eventSettings.ticketPrice * selectedFighter.commission / 100).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-800">
                    <td className="py-3 px-4">Mar 5, 2025</td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">PPV</span>
                    </td>
                    <td className="py-3 px-4">Sarah Johnson</td>
                    <td className="py-3 px-4 text-center">${eventSettings.ppvPrice}</td>
                    <td className="py-3 px-4 text-center">${(eventSettings.ppvPrice * selectedFighter.commission / 100).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-800">
                    <td className="py-3 px-4">Mar 5, 2025</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">Ticket</span>
                    </td>
                    <td className="py-3 px-4">Michael Brown</td>
                    <td className="py-3 px-4 text-center">${eventSettings.ticketPrice}</td>
                    <td className="py-3 px-4 text-center">${(eventSettings.ticketPrice * selectedFighter.commission / 100).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-800">
                    <td className="py-3 px-4">Mar 4, 2025</td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">PPV</span>
                    </td>
                    <td className="py-3 px-4">Emily Wilson</td>
                    <td className="py-3 px-4 text-center">${eventSettings.ppvPrice}</td>
                    <td className="py-3 px-4 text-center">${(eventSettings.ppvPrice * selectedFighter.commission / 100).toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-800">
                    <td className="py-3 px-4">Mar 3, 2025</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">Ticket</span>
                    </td>
                    <td className="py-3 px-4">David Jones</td>
                    <td className="py-3 px-4 text-center">${eventSettings.ticketPrice}</td>
                    <td className="py-3 px-4 text-center">${(eventSettings.ticketPrice * selectedFighter.commission / 100).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render logic - choose the appropriate view based on currentView
  return (
    <div className="font-sans text-gray-100">
      {currentView === 'login' && renderLoginView()}
      {currentView === 'dashboard' && renderDashboardView()}
      {currentView === 'admin' && renderAdminView()}
      {currentView === 'fighter-detail' && renderFighterDetailView()}
    </div>
  );
};

export default FighterSalesApp;
