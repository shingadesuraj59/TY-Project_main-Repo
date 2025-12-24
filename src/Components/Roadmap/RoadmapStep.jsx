// import React, { useEffect } from 'react';
// import { 
//   ChevronDown, 
//   ChevronRight, 
//   CheckCircle2, 
//   Circle, 
//   ExternalLink, 
//   Play, 
//   Book,
//   Code2,
//   Brain,
//   Target,
//   Zap,
//   FileText,
//   Database,
//   Cpu,
//   Network
// } from 'lucide-react';

// const RoadmapStep = ({ 
//   step, 
//   stepIndex, 
//   isExpanded, 
//   progress, 
//   onToggle, 
//   onQuestionToggle,
//   getDifficultyColor 
// }) => {

//   // Close any open answer popovers when clicking outside
//   useEffect(() => {
//     const handleDocumentClick = (e) => {
//       const openDetails = document.querySelectorAll('details[data-answer][open]');
//       openDetails.forEach((el) => {
//         if (!el.contains(e.target)) {
//           el.removeAttribute('open');
//         }
//       });
//     };
//     document.addEventListener('click', handleDocumentClick);
//     return () => document.removeEventListener('click', handleDocumentClick);
//   }, []);

//   const getStepIcon = (stepIndex) => {
//     const icons = [Code2, Brain, Target, Database, Cpu, Network, FileText];
//     const Icon = icons[stepIndex % icons.length];
//     return Icon;
//   };

//   const StepIcon = getStepIcon(stepIndex);

//   // Get question count for display
//   const getQuestionCount = () => {
//     if (step.questions && Array.isArray(step.questions)) {
//       return step.questions.length;
//     } else if (step.core_questions && Array.isArray(step.core_questions)) {
//       return step.core_questions.reduce((total, topic) => {
//         return total + (topic.questions ? topic.questions.length : 0);
//       }, 0);
//     }
//     return 0;
//   };

//   const questionCount = getQuestionCount();

//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
//       {/* Step Header */}
//       <div 
//         className="cursor-pointer p-6 hover:bg-gray-50/80 transition-all duration-200"
//         onClick={onToggle}
//       >
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             {/* Step Number & Icon */}
//             <div className="relative">
//               <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br ${
//                 stepIndex === 0 ? 'from-blue-500 to-indigo-600' :
//                 stepIndex === 1 ? 'from-green-500 to-emerald-600' :
//                 stepIndex === 2 ? 'from-purple-500 to-pink-600' :
//                 stepIndex === 3 ? 'from-orange-500 to-red-600' :
//                 stepIndex === 4 ? 'from-teal-500 to-cyan-600' :
//                 'from-gray-500 to-slate-600'
//               }`}>
//                 <StepIcon className="w-7 h-7" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                 {step.step}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-xl md:text-2xl font-bold text-gray-900">
//                 {step.title}
//               </h3>
//               <div className="flex items-center space-x-4 text-sm text-gray-600">
//                 <span>{questionCount} questions</span>
//                 <span>•</span>
//                 <span>{progress.completed}/{progress.total} completed</span>
//                 <span>•</span>
//                 <span className={`font-semibold ${progress.percentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
//                   {progress.percentage}% done
//                 </span>
//                 {step.core_questions && (
//                   <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
//                     Theory
//                   </span>
//                 )}
//                 {step.questions && (
//                   <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
//                     Coding
//                   </span>
//                 )}
//               </div>
//               {step.description && (
//                 <p className="text-gray-600 text-sm max-w-2xl">
//                   {step.description}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* Progress Circle */}
//             <div className="relative w-16 h-16">
//               <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
//                 <path
//                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeDasharray="100, 100"
//                   className="text-gray-200"
//                 />
//                 <path
//                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeDasharray={`${progress.percentage}, 100`}
//                   className={progress.percentage === 100 ? 'text-green-500' : 'text-blue-600'}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className={`text-sm font-bold ${progress.percentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
//                   {progress.percentage}%
//                 </span>
//               </div>
//             </div>

//             {/* Expand Button */}
//             <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors">
//               {isExpanded ? (
//                 <ChevronDown className="w-6 h-6 text-gray-600" />
//               ) : (
//                 <ChevronRight className="w-6 h-6 text-gray-600" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
//           <div 
//             className={`h-2 rounded-full transition-all duration-700 ease-out ${
//               progress.percentage === 100 
//                 ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
//                 : 'bg-gradient-to-r from-blue-500 to-blue-600'
//             }`}
//             style={{ width: `${progress.percentage}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Questions Content */}
//       {isExpanded && (
//         <div className="border-t border-gray-200/50 p-6 space-y-3 bg-gray-50/30">
//           {/* Regular Questions Structure - Single Line Format */}
//           {step.questions && Array.isArray(step.questions) && step.questions.map((question, questionIndex) => (
//             <div
//               key={question.id || questionIndex}
//               className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
//             >
//               <div className="flex items-center justify-between">
//                 {/* Left Section: Checkbox + Question Name */}
//                 <div className="flex items-center space-x-3 flex-1 min-w-0">
//                   {/* Checkbox */}
//                   <button
//                     onClick={() => onQuestionToggle(questionIndex)}
//                     className="flex-shrink-0 p-1 hover:scale-110 transition-transform duration-200"
//                   >
//                     {question.completed ? (
//                       <CheckCircle2 className="w-5 h-5 text-green-600" />
//                     ) : (
//                       <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
//                     )}
//                   </button>

//                   {/* Question Name */}
//                   <span className={`font-medium text-sm transition-all duration-200 truncate ${
//                     question.completed 
//                       ? 'line-through text-gray-500' 
//                       : 'text-gray-900 group-hover:text-blue-600'
//                   }`}>
//                     {question.title || question.question}
//                   </span>
//                 </div>

//                 {/* Middle Section: Topics & Difficulty */}
//                 <div className="flex items-center space-x-3 mx-4 flex-shrink-0">
//                   {/* Topics */}
//                   {question.topics && question.topics.slice(0, 2).map((topic, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium whitespace-nowrap"
//                     >
//                       {topic}
//                     </span>
//                   ))}
                  
//                   {/* Difficulty */}
//                   {question.difficulty && (
//                     <span className={`px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap ${
//                       question.difficulty.toUpperCase() === 'EASY' ? 'bg-green-500' :
//                       question.difficulty.toUpperCase() === 'MEDIUM' ? 'bg-yellow-500' :
//                       'bg-red-500'
//                     }`}>
//                       {question.difficulty}
//                     </span>
//                   )}
//                 </div>

//                 {/* Right Section: Links */}
//                 <div className="flex items-center space-x-2 flex-shrink-0">
//                   {/* LeetCode Link */}
//                   {question.link && (
//                     <a
//                       href={question.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 whitespace-nowrap"
//                     >
//                       <ExternalLink className="w-3 h-3" />
//                       <span>LeetCode</span>
//                     </a>
//                   )}
                  
//                   {/* YouTube Link */}
//                   {question.youtube_videos && (
//                     <a
//                       href={Array.isArray(question.youtube_videos) ? question.youtube_videos[0] : question.youtube_videos}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-xs font-medium transition-colors bg-red-50 px-2 py-1 rounded hover:bg-red-100 whitespace-nowrap"
//                     >
//                       <Play className="w-3 h-3" />
//                       <span>Video</span>
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Core Questions Structure - Single Line Format */}
//           {step.core_questions && Array.isArray(step.core_questions) && step.core_questions.map((topic, topicIndex) => (
//             <div key={topic.topic || topicIndex} className="space-y-3">
//               {/* Topic Header */}
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
//                 <h4 className="font-bold text-base text-gray-900 flex items-center space-x-2">
//                   <Book className="w-4 h-4 text-blue-600" />
//                   <span>{topic.topic}</span>
//                 </h4>
//               </div>

//               {/* Topic Questions */}
//               {topic.questions && Array.isArray(topic.questions) && topic.questions.map((question, questionIndex) => {
//                 const globalIndex = step.core_questions.slice(0, topicIndex).reduce((acc, t) => 
//                   acc + (t.questions ? t.questions.length : 0), 0) + questionIndex;
                
//                 return (
//                   <div
//                     key={question.id || questionIndex}
//                     className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 ml-2"
//                   >
//                     <div className="flex items-center justify-between">
//                       {/* Left Section: Checkbox + Question */}
//                       <div className="flex items-center space-x-3 flex-1 min-w-0">
//                         {/* Checkbox */}
//                         <button
//                           onClick={() => onQuestionToggle(globalIndex)}
//                           className="flex-shrink-0 p-1 hover:scale-110 transition-transform duration-200"
//                         >
//                           {question.completed ? (
//                             <CheckCircle2 className="w-5 h-5 text-green-600" />
//                           ) : (
//                             <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
//                           )}
//                         </button>

//                         {/* Question Text */}
//                         <span className={`font-medium text-sm transition-all duration-200 truncate ${
//                           question.completed 
//                             ? 'line-through text-gray-500' 
//                             : 'text-gray-900 group-hover:text-blue-600'
//                         }`}>
//                           {question.question}
//                         </span>
//                       </div>

//                       {/* Middle Section: Difficulty */}
//                       <div className="flex items-center space-x-3 mx-4 flex-shrink-0">
//                         {question.difficulty_level && (
//                           <span className={`px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap ${
//                             question.difficulty_level === 'Easy' ? 'bg-green-500' :
//                             question.difficulty_level === 'Medium' ? 'bg-yellow-500' :
//                             'bg-red-500'
//                           }`}>
//                             {question.difficulty_level}
//                           </span>
//                         )}
//                       </div>

//                       {/* Right Section: Expandable Answer */}
//                       {question.answer && (
//                         <div className="flex-shrink-0">
//                           <details className="relative" data-answer>
//                             <summary className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 whitespace-nowrap list-none">
//                               View Answer
//                             </summary>
//                             <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                               <p className="text-sm text-gray-700 leading-relaxed">
//                                 {question.answer}
//                               </p>
//                             </div>
//                           </details>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoadmapStep;































































import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Play, 
  Book,
  Code2,
  Brain,
  Target,
  Zap,
  FileText,
  Database,
  Cpu,
  Network
} from 'lucide-react';

const RoadmapStep = ({ 
  step, 
  stepIndex, 
  isExpanded, 
  progress, 
  expandedAnswers, // New prop from RoadmapDisplay
  onToggle, 
  onQuestionToggle,
  onAnswerToggle, // New prop from RoadmapDisplay
  getDifficultyColor 
}) => {

  const getStepIcon = (stepIndex) => {
    const icons = [Code2, Brain, Target, Database, Cpu, Network, FileText];
    const Icon = icons[stepIndex % icons.length];
    return Icon;
  };

  const StepIcon = getStepIcon(stepIndex);

  // Get question count for display
  const getQuestionCount = () => {
    if (step.questions && Array.isArray(step.questions)) {
      return step.questions.length;
    } else if (step.core_questions && Array.isArray(step.core_questions)) {
      return step.core_questions.reduce((total, topic) => {
        return total + (topic.questions ? topic.questions.length : 0);
      }, 0);
    }
    return 0;
  };

  const questionCount = getQuestionCount();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Step Header - Made Responsive */}
      <div 
        className="cursor-pointer p-4 sm:p-6 hover:bg-gray-50/80 transition-all duration-200"
        onClick={onToggle}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            {/* Step Number & Icon - Responsive */}
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg bg-gradient-to-br ${
                stepIndex === 0 ? 'from-blue-500 to-indigo-600' :
                stepIndex === 1 ? 'from-green-500 to-emerald-600' :
                stepIndex === 2 ? 'from-purple-500 to-pink-600' :
                stepIndex === 3 ? 'from-orange-500 to-red-600' :
                stepIndex === 4 ? 'from-teal-500 to-cyan-600' :
                'from-gray-500 to-slate-600'
              }`}>
                <StepIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {step.step}
              </div>
            </div>

            <div className="space-y-2 min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
                {step.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <span>{questionCount} questions</span>
                <span className="hidden sm:inline">•</span>
                <span>{progress.completed}/{progress.total} completed</span>
                <span className="hidden sm:inline">•</span>
                <span className={`font-semibold ${progress.percentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                  {progress.percentage}% done
                </span>
                {step.core_questions && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Theory
                  </span>
                )}
                {step.questions && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Coding
                  </span>
                )}
              </div>
              {step.description && (
                <p className="text-gray-600 text-sm max-w-2xl break-words">
                  {step.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-4 flex-shrink-0">
            {/* Progress Circle - Responsive */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="100, 100"
                  className="text-gray-200"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${progress.percentage}, 100`}
                  className={progress.percentage === 100 ? 'text-green-500' : 'text-blue-600'}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs sm:text-sm font-bold ${progress.percentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                  {progress.percentage}%
                </span>
              </div>
            </div>

            {/* Expand Button */}
            <button className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar - Responsive */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-700 ease-out ${
              progress.percentage === 100 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Questions Content - Made Responsive */}
      {isExpanded && (
        <div className="border-t border-gray-200/50 p-4 sm:p-6 space-y-3 bg-gray-50/30">
          {/* Regular Questions Structure - Updated for inline answers */}
          {step.questions && Array.isArray(step.questions) && step.questions.map((question, questionIndex) => {
            const answerId = `${stepIndex}-${questionIndex}`;
            const isAnswerExpanded = expandedAnswers && expandedAnswers.has(answerId);
            
            return (
              <div key={question.id || questionIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Question Row */}
                <div className="group p-3 sm:p-4 hover:bg-gray-50 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Left Section: Checkbox + Question Name */}
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      {/* Checkbox */}
                      <button
                        onClick={() => onQuestionToggle(questionIndex)}
                        className="flex-shrink-0 p-1 hover:scale-110 transition-transform duration-200"
                      >
                        {question.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                        )}
                      </button>

                      {/* Question Name - Removed line-through */}
                      <span className={`font-medium text-sm transition-all duration-200 ${
                        question.completed 
                          ? 'text-gray-500 opacity-70' // Only opacity change, no strikethrough
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {question.title || question.question}
                      </span>
                    </div>

                    {/* Middle Section: Topics & Difficulty */}
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                      {/* Topics */}
                      {question.topics && question.topics.slice(0, 2).map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium whitespace-nowrap"
                        >
                          {topic}
                        </span>
                      ))}
                      
                      {/* Difficulty */}
                      {question.difficulty && (
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap ${
                          question.difficulty.toUpperCase() === 'EASY' ? 'bg-green-500' :
                          question.difficulty.toUpperCase() === 'MEDIUM' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {question.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Right Section: Links + View Answer Button */}
                    <div className="flex items-center flex-wrap gap-2 sm:gap-2">
                      {/* LeetCode Link */}
                      {question.link && (
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 whitespace-nowrap"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>LeetCode</span>
                        </a>
                      )}
                      
                      {/* YouTube Link */}
                      {question.youtube_videos && (
                        <a
                          href={Array.isArray(question.youtube_videos) ? question.youtube_videos[0] : question.youtube_videos}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-xs font-medium transition-colors bg-red-50 px-2 py-1 rounded hover:bg-red-100 whitespace-nowrap"
                        >
                          <Play className="w-3 h-3" />
                          <span>Video</span>
                        </a>
                      )}

                      {/* View Answer Button - Kept original blue colors */}
                      {question.answer && onAnswerToggle && (
                        <button
                          onClick={() => onAnswerToggle(questionIndex)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition-colors whitespace-nowrap"
                        >
                          {isAnswerExpanded ? 'Hide Answer' : 'View Answer'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline Answer - Full Width Below Question */}
                {question.answer && isAnswerExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-4 sm:p-6">
                      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                          Answer
                        </h4>
                        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                          <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{question.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Core Questions Structure - Updated for inline answers */}
          {step.core_questions && Array.isArray(step.core_questions) && step.core_questions.map((topic, topicIndex) => (
            <div key={topic.topic || topicIndex} className="space-y-3">
              {/* Topic Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                <h4 className="font-bold text-sm sm:text-base text-gray-900 flex items-center space-x-2">
                  <Book className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="break-words">{topic.topic}</span>
                </h4>
              </div>

              {/* Topic Questions */}
              {topic.questions && Array.isArray(topic.questions) && topic.questions.map((question, questionIndex) => {
                const globalIndex = step.core_questions.slice(0, topicIndex).reduce((acc, t) => 
                  acc + (t.questions ? t.questions.length : 0), 0) + questionIndex;
                
                const answerId = `${stepIndex}-${globalIndex}`;
                const isAnswerExpanded = expandedAnswers && expandedAnswers.has(answerId);
                
                return (
                  <div key={question.id || questionIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden ml-2">
                    {/* Question Row */}
                    <div className="group p-3 sm:p-4 hover:bg-gray-50 transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Left Section: Checkbox + Question */}
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {/* Checkbox */}
                          <button
                            onClick={() => onQuestionToggle(globalIndex)}
                            className="flex-shrink-0 p-1 hover:scale-110 transition-transform duration-200"
                          >
                            {question.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                            )}
                          </button>

                          {/* Question Text - Removed line-through */}
                          <span className={`font-medium text-sm transition-all duration-200 ${
                            question.completed 
                              ? 'text-gray-500 opacity-70' // Only opacity change, no strikethrough
                              : 'text-gray-900 group-hover:text-blue-600'
                          }`}>
                            {question.question}
                          </span>
                        </div>

                        {/* Right Section: Difficulty + Answer Button */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          {question.difficulty_level && (
                            <span className={`px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap ${
                              question.difficulty_level === 'Easy' ? 'bg-green-500' :
                              question.difficulty_level === 'Medium' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}>
                              {question.difficulty_level}
                            </span>
                          )}

                          {/* View Answer Button - Kept original blue colors */}
                          {question.answer && onAnswerToggle && (
                            <button
                              onClick={() => onAnswerToggle(globalIndex)}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition-colors whitespace-nowrap"
                            >
                              {isAnswerExpanded ? 'Hide Answer' : 'View Answer'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Inline Answer - Full Width Below Question */}
                    {question.answer && isAnswerExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        <div className="p-4 sm:p-6">
                          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                              Answer
                            </h4>
                            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                              <p className="whitespace-pre-wrap text-sm sm:text-base break-words">{question.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapStep;
