import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Brain, Search, Target, BookOpen, Rocket, Trophy, Cpu, Database, Network, Zap } from 'lucide-react';

const LoadingScreen = ({ company = "your target company" }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(15); // 15 seconds estimate

  const loadingMessages = [
    { 
      text: `Analyzing ${company} interview patterns...`, 
      icon: Brain, 
      color: "from-blue-500 to-blue-600",
      duration: 2000
    },
    { 
      text: "Searching through thousands of interview questions...", 
      icon: Search, 
      color: "from-blue-500 to-blue-700",
      duration: 2500
    },
    { 
      text: "Assessing your skill level and quiz results...", 
      icon: Target, 
      color: "from-blue-500 to-indigo-600",
      duration: 2000
    },
    { 
      text: "Generating Data Structures & Algorithms questions...", 
      icon: Cpu, 
      color: "from-green-500 to-emerald-600",
      duration: 3000
    },
    { 
      text: "Preparing Operating Systems fundamentals...", 
      icon: Database, 
      color: "from-purple-500 to-pink-600",
      duration: 2500
    },
    { 
      text: "Compiling Database Management questions...", 
      icon: Database, 
      color: "from-orange-500 to-red-600",
      duration: 2500
    },
    { 
      text: "Building Computer Networks section...", 
      icon: Network, 
      color: "from-teal-500 to-cyan-600",
      duration: 2500
    },
    { 
      text: "Our AI is finalizing your personalized roadmap...", 
      icon: Sparkles, 
      color: "from-blue-400 to-indigo-500",
      duration: 2000
    },
    { 
      text: "Almost ready! Optimizing your study path...", 
      icon: Rocket, 
      color: "from-blue-500 to-blue-700",
      duration: 1500
    },
    { 
      text: "Building your pathway to success...", 
      icon: Trophy, 
      color: "from-yellow-500 to-amber-600",
      duration: 1500
    }
  ];

  useEffect(() => {
    let messageIndex = 0;
    
    const messageTimer = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setCurrentMessage(messageIndex);
    }, loadingMessages[messageIndex].duration);

    // More realistic progress simulation for 15 seconds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95; // Hold at 95% until actual completion
        }
        
        // Slower progression at the beginning, faster in the middle
        let increment;
        if (prev < 30) {
          increment = 2.0; // Slow start
        } else if (prev < 90) {
          increment = 3.0; // Faster middle
        } else {
          increment = 0.5; // Slow finish
        }
        
        return Math.min(prev + increment, 95);
      });
    }, 200); // Update every 200ms for smoother progress

    // Update estimated time countdown
    const timeInterval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const CurrentIcon = loadingMessages[currentMessage].icon;

  const getTimeEstimateText = () => {
    if (estimatedTime > 7) return "This may take 10-15 seconds...";
    if (estimatedTime > 4) return "Almost there! Just a few more seconds...";
    if (estimatedTime > 0) return "Finalizing your roadmap...";
    return "Any moment now...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-12 text-center relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-blue-100 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-indigo-100 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-50 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="relative space-y-8">
          {/* Main Loading Animation */}
          <div className="flex justify-center">
            <div className="relative w-28 h-28">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              
              {/* Spinning Ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-600 rounded-full animate-spin"></div>
              
              {/* Middle Ring */}
              <div className="absolute inset-2 border-4 border-transparent border-b-indigo-400 border-l-indigo-500 rounded-full animate-spin delay-1000" style={{ animationDirection: 'reverse' }}></div>
              
              {/* Inner Circle */}
              <div className={`absolute inset-4 bg-gradient-to-br ${loadingMessages[currentMessage].color} rounded-full flex items-center justify-center shadow-lg`}>
                <CurrentIcon className="w-8 h-8 text-white" />
              </div>
              
              {/* Floating Elements */}
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-blue-400 animate-bounce" />
              <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-indigo-300 animate-bounce delay-500" />
              <Zap className="absolute top-1/2 -right-2 w-4 h-4 text-yellow-400 animate-pulse delay-700" />
            </div>
          </div>

          {/* Status Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Creating Your Roadmap
              </h3>
              <p className="text-blue-600 font-semibold">
                for {company}
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700 animate-pulse">
                {loadingMessages[currentMessage].text}
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{getTimeEstimateText()}</span>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-600">
                <span>AI Generation Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out shadow-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Starting...</span>
                <span>Almost done!</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
            {[
              { label: "Questions", value: "200+", icon: Target },
              { label: "Topics", value: "15+", icon: BookOpen },
              { label: "Steps", value: "5", icon: Rocket },
              { label: "Success Rate", value: "75%", icon: Trophy }
            ].map((stat, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <stat.icon className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Processing Steps */}
          <div className="pt-6 border-t border-blue-100">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>DSA</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>OS</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>DBMS</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Networks</span>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 italic">
              "Quality roadmaps take time - your personalized plan is being crafted with care!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;