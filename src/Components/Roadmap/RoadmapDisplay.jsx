// import React, { useState } from 'react';
// import { 
//   Save, 
//   Wand2, 
//   Trophy, 
//   Target,
//   Clock,
//   TrendingUp,
//   Award,
//   Zap
// } from 'lucide-react';
// import RoadmapStep from './RoadmapStep';
// import { roadmapService } from '../../api';

// const RoadmapDisplay = ({ roadmap, onSave, onGenerateNew, onUpdateProgress }) => {
//   const [expandedSteps, setExpandedSteps] = useState(new Set([0]));
//   const [isSaving, setIsSaving] = useState(false);
//   // const [roadmap, setRoadmap] = useState(
//   //   {"roadmap": [
//   //           {
//   //               "step": 1,
//   //               "title": "Build Fundamentals in DSA",
//   //               "description": "Master fundamental data structures and algorithms.",
//   //               "estimated_time": "2 weeks",
//   //               "question_ids": null,
//   //               "questions": [
//   //                   {
//   //                       "id": 110,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Reverse Linked List",
//   //                       "link": "https://leetcode.com/problems/reverse-linked-list",
//   //                       "difficulty": "EASY",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=G0_I-ZF0S38",
//   //                           "https://www.youtube.com/watch?v=G0_I-ZF0S38"
//   //                       ],
//   //                       "topics": [
//   //                           "Linked List"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 111,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Linked List Cycle",
//   //                       "link": "https://leetcode.com/problems/linked-list-cycle",
//   //                       "difficulty": "EASY",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=gBTe7lFR3vc",
//   //                           "https://www.youtube.com/watch?v=gBTe7lFR3vc"
//   //                       ],
//   //                       "topics": [
//   //                           "Linked List"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 112,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Merge Two Sorted Lists",
//   //                       "link": "https://leetcode.com/problems/merge-two-sorted-lists",
//   //                       "difficulty": "EASY",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=XIdigk956u0",
//   //                           "https://www.youtube.com/watch?v=XIdigk956u0"
//   //                       ],
//   //                       "topics": [
//   //                           "Linked List"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 113,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Remove Nth Node From End",
//   //                       "link": "https://leetcode.com/problems/remove-nth-node-from-end-of-list",
//   //                       "difficulty": "MEDIUM",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=XVuQxVej6y8",
//   //                           "https://www.youtube.com/watch?v=XVuQxVej6y8"
//   //                       ],
//   //                       "topics": [
//   //                           "Linked List"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 114,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Add Two Numbers",
//   //                       "link": "https://leetcode.com/problems/add-two-numbers",
//   //                       "difficulty": "MEDIUM",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=KMS0WFxrsT8",
//   //                           "https://www.youtube.com/watch?v=KMS0WFxrsT8"
//   //                       ],
//   //                       "topics": [
//   //                           "Linked List"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 115,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Copy List with Random Pointer",
//   //                       "link": "https://leetcode.com/problems/copy-list-with-random-pointer",
//   //                       "difficulty": "MEDIUM",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=5Y2EiZST97Y",
//   //                           "https://www.youtube.com/watch?v=5Y2EiZST97Y"
//   //                       ],
//   //                       "topics": [
//   //                           "Linked List"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 156,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Kth Largest Element in Array",
//   //                       "link": "https://leetcode.com/problems/kth-largest-element-in-an-array",
//   //                       "difficulty": "MEDIUM",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=XEmy13g1Qxc",
//   //                           "https://www.youtube.com/watch?v=XEmy13g1Qxc"
//   //                       ],
//   //                       "topics": [
//   //                           "Heaps & Hashing",
//   //                           "Array"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 164,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Convert Sorted Array to BST",
//   //                       "link": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/",
//   //                       "difficulty": "MEDIUM",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=0K0uCMYq5ng",
//   //                           "https://www.youtube.com/watch?v=N7mDor6GGPo"
//   //                       ],
//   //                       "topics": [
//   //                           "Binary Search Trees",
//   //                           "Array"
//   //                       ]
//   //                   },
//   //                   {
//   //                       "id": 185,
//   //                       "created_at": "2025-10-03T12:46:23.973395+00:00",
//   //                       "title": "Search in Rotated Sorted Array",
//   //                       "link": "https://leetcode.com/problems/search-in-rotated-sorted-array",
//   //                       "difficulty": "MEDIUM",
//   //                       "youtube_videos": [
//   //                           "https://www.youtube.com/watch?v=U8XENwh8Oy8",
//   //                           "https://www.youtube.com/watch?v=6WNZQBHWQJs"
//   //                       ],
//   //                       "topics": [
//   //                           "Searching & Sorting",
//   //                           "Array"
//   //                       ]
//   //                   }
//   //               ]
//   //           },
//   //           {
//   //               "step": 2,
//   //               "title": "Practice Nvidia Specific Questions",
//   //               "description": "Focus on frequently asked questions at Nvidia.",
//   //               "estimated_time": "2 weeks",
//   //               "question_ids": null,
//   //               "questions": [
//   //                   {
//   //                       "company": "Nvidia",
//   //                       "difficulty": "EASY",
//   //                       "frequency": "70.6",
//   //                       "id": "650",
//   //                       "link": "https://leetcode.com/problems/missing-number",
//   //                       "title": "Missing Number",
//   //                       "topics": [
//   //                           "Array",
//   //                           "Hash Table",
//   //                           "Math",
//   //                           "Binary Search",
//   //                           "Bit Manipulation",
//   //                           "Sorting"
//   //                       ],
//   //                       "youtube_videos": "[\"https://www.youtube.com/watch?v=cuNX7rijdt8\",\"https://www.youtube.com/watch?v=cuNX7rijdt8\"]"
//   //                   },
//   //                   {
//   //                       "company": "Nvidia",
//   //                       "difficulty": "EASY",
//   //                       "frequency": "75.8",
//   //                       "id": "647",
//   //                       "link": "https://leetcode.com/problems/reverse-bits",
//   //                       "title": "Reverse Bits",
//   //                       "topics": [
//   //                           "Divide and Conquer",
//   //                           "Bit Manipulation"
//   //                       ],
//   //                       "youtube_videos": "[\"https://www.youtube.com/watch?v=UcoN6UjAI64\",\"https://www.youtube.com/watch?v=UcoN6UjAI64\"]"
//   //                   },
//   //                   {
//   //                       "company": "Nvidia",
//   //                       "difficulty": "EASY",
//   //                       "frequency": "70.6",
//   //                       "id": "649",
//   //                       "link": "https://leetcode.com/problems/valid-parentheses",
//   //                       "title": "Valid Parentheses",
//   //                       "topics": [
//   //                           "String",
//   //                           "Stack"
//   //                       ],
//   //                       "youtube_videos": "[\"https://www.youtube.com/watch?v=TaWs8tIrnoA\",\"https://www.youtube.com/watch?v=TaWs8tIrnoA\"]"
//   //                   },
//   //                   {
//   //                       "company": "Nvidia",
//   //                       "difficulty": "EASY",
//   //                       "frequency": "82",
//   //                       "id": "639",
//   //                       "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
//   //                       "title": "Best Time to Buy and Sell Stock",
//   //                       "topics": [
//   //                           "Array",
//   //                           "Dynamic Programming"
//   //                       ],
//   //                       "youtube_videos": "[\"https://www.youtube.com/watch?v=E2-heUEnZKU\",\"https://www.youtube.com/watch?v=E2-heUEnZKU\"]"
//   //                   },
//   //                   {
//   //                       "company": "Nvidia",
//   //                       "difficulty": "EASY",
//   //                       "frequency": "80.1",
//   //                       "id": "640",
//   //                       "link": "https://leetcode.com/problems/two-sum",
//   //                       "title": "Two Sum",
//   //                       "topics": [
//   //                           "Array",
//   //                           "Hash Table"
//   //                       ],
//   //                       "youtube_videos": "[\"https://www.youtube.com/watch?v=UXDSeD9mN-k\",\"https://www.youtube.com/watch?v=x52qXQyzsns\"]"
//   //                   },
//   //                   {
//   //                       "company": "Nvidia",
//   //                       "difficulty": "EASY",
//   //                       "frequency": "100",
//   //                       "id": "634",
//   //                       "link": "https://leetcode.com/problems/last-stone-weight",
//   //                       "title": "Last Stone Weight",
//   //                       "topics": [
//   //                           "Array",
//   //                           "Heap (Priority Queue)"
//   //                       ],
//   //                       "youtube_videos": "[\"https://www.youtube.com/watch?v=8txOQt0ZwTg\",\"https://www.youtube.com/watch?v=8txOQt0ZwTg\"]"
//   //                   }
//   //               ]
//   //           },
//   //           {
//   //               "step": 3,
//   //               "subject": "Operating Systems",
//   //               "title": "OS Fundamentals",
//   //               "description": "Covering OS fundamentals, process management, memory management, storage, I/O, and real-time systems.",
//   //               "estimated_time": "2 weeks",
//   //               "core_questions": [
//   //                   {
//   //                       "topic": "OS Fundamentals & Types",
//   //                       "questions": [
//   //                           {
//   //                               "id": 406,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "What is the main purpose of an operating system?",
//   //                               "answer": "The OS manages hardware and software resources, provides an interface between user and hardware, and ensures efficient execution of programs.",
//   //                               "topic": "OS Fundamentals & Types",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 407,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Name and describe different types of operating systems.",
//   //                               "answer": "Types include Batch OS, Time- Sharing OS, Distributed OS, Real-Time OS, and Mobile OS. Each type manages resources and users differently.",
//   //                               "topic": "OS Fundamentals & Types",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 408,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain the difference between main memory and secondary memory.",
//   //                               "answer": "Main memory (RAM) is fast and volatile, used for executing programs. Secondary memory (HDD/SSD) is slower, non- volatile, and stores data permanently.",
//   //                               "topic": "OS Fundamentals & Types",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 409,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define dynamic binding and its significance in OS.",
//   //                               "answer": "Dynamic binding delays linking procedures or variables until runtime, allowing flexibility and supporting polymorphism in modern OS design.",
//   //                               "topic": "OS Fundamentals & Types",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 410,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "What is a real- time operating system? Discuss types.",
//   //                               "answer": "RTOS guarantees task execution within specific time constraints. Types: Hard RTOS (strict deadlines), Soft RTOS (occasional misses tolerated), Firm RTOS (missed deadlines degrade quality).",
//   //                               "topic": "OS Fundamentals & Types",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Processes, Threads & Scheduling",
//   //                       "questions": [
//   //                           {
//   //                               "id": 411,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Difference between process and program.",
//   //                               "answer": "A program is a passive set of instructions, while a process is an active execution of a program with its own memory and CPU state.",
//   //                               "topic": "Processes, Threads & Scheduling",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 412,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define thread and list types.",
//   //                               "answer": "A thread is the smallest unit of CPU execution within a process. Types include User-level and Kernel-level threads.",
//   //                               "topic": "Processes, Threads & Scheduling",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 413,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain different process states.",
//   //                               "answer": "Typical states: New (created), Ready (waiting for CPU), Running (executing), Waiting/Blocked (I/O wait), Terminated (completed).",
//   //                               "topic": "Processes, Threads & Scheduling",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 414,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain FCFS (First Come First Serve) scheduling.",
//   //                               "answer": "FCFS schedules processes in order of arrival. Simple but can cause the convoy effect where long processes delay shorter ones.",
//   //                               "topic": "Processes, Threads & Scheduling",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 415,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Compare SJF, SRTF, LRTF, Priority, and Round Robin scheduling.",
//   //                               "answer": "SJF executes shortest job next, SRTF is preemptive SJF, LRTF executes longest remaining job, Priority schedules by priority, Round Robin allocates CPU in fixed time quanta.",
//   //                               "topic": "Processes, Threads & Scheduling",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Memory Management & Virtualization",
//   //                       "questions": [
//   //                           {
//   //                               "id": 416,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define virtual memory.",
//   //                               "answer": "Virtual memory allows processes to use more memory than physically available by swapping pages between RAM and disk, providing the illusion of large memory.",
//   //                               "topic": "Memory Management & Virtualization",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 417,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "What is paging and why do we need it?",
//   //                               "answer": "Paging divides memory into fixed-size pages to eliminate external fragmentation and enable non-contiguous memory allocation for processes.",
//   //                               "topic": "Memory Management & Virtualization",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 418,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain demand paging.",
//   //                               "answer": "In demand paging, pages are loaded into memory only when required. This reduces memory usage and improves system efficiency.",
//   //                               "topic": "Memory Management & Virtualization",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 419,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define thrashing and explain why it occurs.",
//   //                               "answer": "Thrashing happens when excessive paging operations occur because the total working set of processes exceeds physical memory, degrading system performance.",
//   //                               "topic": "Memory Management & Virtualization",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 420,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain segmentation and how it differs from paging.",
//   //                               "answer": "Segmentation divides memory into variable-sized logical segments (code, data, stack), unlike fixed-size pages. It simplifies memory protection and sharing but can cause external fragmentation.",
//   //                               "topic": "Memory Management & Virtualization",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Storage, RAID & Files",
//   //                       "questions": [
//   //                           {
//   //                               "id": 426,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "What is RAID and why is it used?",
//   //                               "answer": "RAID (Redundant Array of Independent Disks) improves performance and provides fault tolerance by storing data across multiple disks.",
//   //                               "topic": "Storage, RAID & Files",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 427,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Name types of RAID.",
//   //                               "answer": "Common types: RAID 0 (striping), RAID 1 (mirroring), RAID 5 (striping with parity), RAID 10 (mirrored stripes).",
//   //                               "topic": "Storage, RAID & Files",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 428,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define fragmentation and its types.",
//   //                               "answer": "Fragmentation is inefficient memory/disk usage. Types: Internal (unused space within blocks) and External (free memory scattered).",
//   //                               "topic": "Storage, RAID & Files",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 429,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "What is spooling?",
//   //                               "answer": "Spooling queues data for slower devices like printers to improve efficiency, allowing CPU to continue execution without waiting for I/O completion.",
//   //                               "topic": "Storage, RAID & Files",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 430,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain Belady's Anomaly.",
//   //                               "answer": "In FIFO page replacement, increasing memory frames can unexpectedly increase page faults, which is counterintuitive and known as Belady's anomaly.",
//   //                               "topic": "Storage, RAID & Files",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "I/O & Caching",
//   //                       "questions": [
//   //                           {
//   //                               "id": 431,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain cache memory.",
//   //                               "answer": "Cache is a small, fast memory between CPU and main memory that stores frequently accessed data to reduce latency.",
//   //                               "topic": "I/O & Caching",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 432,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Difference between direct mapping and associative mapping.",
//   //                               "answer": "Direct mapping maps each memory block to a single cache line. Associative mapping allows a block to be placed in any cache line, reducing conflict misses.",
//   //                               "topic": "I/O & Caching",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 433,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define polling and interrupt in I/O.",
//   //                               "answer": "Polling continuously checks device status; interrupt notifies CPU asynchronously when I/O is ready, saving CPU time.",
//   //                               "topic": "I/O & Caching",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 434,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "What is DMA (Direct Memory Access)?",
//   //                               "answer": "DMA allows devices to transfer data directly to/from memory without CPU intervention, improving I/O efficiency.",
//   //                               "topic": "I/O & Caching",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 435,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain multi- level cache and its benefits.",
//   //                               "answer": "Multi-level cache (L1, L2, L3) provides hierarchical storage. L1 is small-fast, L2/L3 larger-slower, reducing average memory access time.",
//   //                               "topic": "I/O & Caching",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Real- Time OS & Specialized Systems",
//   //                       "questions": [
//   //                           {
//   //                               "id": 436,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Define Real- Time Operating System.",
//   //                               "answer": "RTOS provides guaranteed response times for time-critical tasks, used in embedded systems, robotics, and avionics.",
//   //                               "topic": "Real- Time OS & Specialized Systems",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 437,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Types of RTOS.",
//   //                               "answer": "Hard RTOS (strict deadlines), Soft RTOS (occasional misses tolerated), Firm RTOS (performance degrades if deadlines missed).",
//   //                               "topic": "Real- Time OS & Specialized Systems",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 438,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Difference between multitasking and multiprocessing.",
//   //                               "answer": "Multitasking: multiple processes share a single CPU using time slicing. Multiprocessing: multiple CPUs execute processes simultaneously for higher throughput.",
//   //                               "topic": "Real- Time OS & Specialized Systems",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 439,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain aging in OS scheduling.",
//   //                               "answer": "Aging gradually increases priority of waiting processes to prevent starvation, ensuring all processes eventually get CPU time.",
//   //                               "topic": "Real- Time OS & Specialized Systems",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 440,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "OS",
//   //                               "question": "Explain starvation and strategies to prevent it.",
//   //                               "answer": "Starvation occurs when low- priority processes never get CPU. Prevented by aging, fair scheduling, or priority adjustment.",
//   //                               "topic": "Real- Time OS & Specialized Systems",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   }
//   //               ]
//   //           },
//   //           {
//   //               "step": 4,
//   //               "subject": "Database Management Systems",
//   //               "title": "DBMS Fundamentals",
//   //               "description": "Covering DBMS fundamentals, SQL, normalization, relationships, scaling, joins, and locks.",
//   //               "estimated_time": "2 weeks",
//   //               "core_questions": [
//   //                   {
//   //                       "topic": "DBMS Fundamentals & Advantages",
//   //                       "questions": [
//   //                           {
//   //                               "id": 446,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is a DBMS and why is it used?",
//   //                               "answer": "A DBMS (Database Management System) is software that manages data efficiently, allowing users to store, retrieve, and manipulate data. It ensures data consistency, reduces redundancy, and supports multiple users accessing the data concurrently.",
//   //                               "topic": "DBMS Fundamentals & Advantages",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 447,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Give two advantages of using a DBMS over a file-based system.",
//   //                               "answer": "Using a DBMS reduces data redundancy and improves data integrity. It also provides better security, allows concurrent access, and simplifies backup and recovery compared to file- based systems.",
//   //                               "topic": "DBMS Fundamentals & Advantages",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 448,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain the difference between DBMS and RDBMS.",
//   //                               "answer": "A DBMS manages data in any format, such as hierarchical, network, or relational, whereas an RDBMS specifically stores data in tables with defined relationships using keys. RDBMS enforces data integrity and supports SQL for querying.",
//   //                               "topic": "DBMS Fundamentals & Advantages",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 449,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What are the key properties of an RDBMS?",
//   //                               "answer": "Key properties of RDBMS include the use of tables to store data, primary and foreign keys to establish relationships, SQL support for queries, and ACID properties to ensure transaction reliability and data integrity.",
//   //                               "topic": "DBMS Fundamentals & Advantages",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 450,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Compare DBMS and RDBMS in terms of redundancy, security, and data integrity.",
//   //                               "answer": "RDBMS reduces data redundancy by normalizing data, provides higher security through access controls, and maintains better data integrity using constraints and keys. Traditional DBMS lacks strict enforcement of these aspects.",
//   //                               "topic": "DBMS Fundamentals & Advantages",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Database Languages & SQL Basics",
//   //                       "questions": [
//   //                           {
//   //                               "id": 451,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Name two types of database languages.",
//   //                               "answer": "Two main types of database languages are DDL (Data Definition Language), used for defining database structure, and DML (Data Manipulation Language), used for querying and manipulating data stored in the database.",
//   //                               "topic": "Database Languages & SQL Basics",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 452,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is the difference between DDL and DML?",
//   //                               "answer": "DDL commands define and manage the structure of database objects like tables and indexes. DML commands are used to insert, update, delete, and retrieve data from these database objects.",
//   //                               "topic": "Database Languages & SQL Basics",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 453,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain the purpose of TCL and DCL commands with examples.",
//   //                               "answer": "TCL (Transaction Control Language) manages transactions with commands like COMMIT and ROLLBACK to ensure consistency. DCL (Data Control Language) manages permissions and access using GRANT and REVOKE.",
//   //                               "topic": "Database Languages & SQL Basics",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 454,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Classify the commands CREATE, INSERT, COMMIT, GRANT, and UPDATE into their respective categories.",
//   //                               "answer": "CREATE belongs to DDL as it defines structure; INSERT and UPDATE belong to DML as they manipulate data; COMMIT belongs to TCL for transaction control; GRANT belongs to DCL for managing access permissions.",
//   //                               "topic": "Database Languages & SQL Basics",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 455,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Write SQL commands to create a table, insert data, update a record, and grant privileges in a single scenario.",
//   //                               "answer": "CREATE TABLE Students(ID INT, Name VARCHAR(50)); INSERT INTO Students VALUES(1, 'Suresh'); UPDATE Students SET Name='Surya' WHERE ID=1; GRANT SELECT ON Students TO user1; This demonstrates table creation, data insertion, modification, and assigning user permissions.",
//   //                               "topic": "Database Languages & SQL Basics",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Normalization, Denormalization & Functional Dependency",
//   //                       "questions": [
//   //                           {
//   //                               "id": 456,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is normalization in DBMS?",
//   //                               "answer": "Normalization is a process of organizing database data to reduce redundancy and improve integrity. It divides larger tables into smaller related tables and establishes relationships between them using keys.",
//   //                               "topic": "Normalization, Denormalization & Functional Dependency",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 457,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Define denormalization and its primary benefit.",
//   //                               "answer": "Denormalization combines related tables to reduce the complexity of queries. It improves read performance by allowing faster access to frequently joined data but may increase redundancy.",
//   //                               "topic": "Normali zation, Denormalization & Functional Depend ency",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 458,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain the differences between 1NF, 2NF, and 3NF.",
//   //                               "answer": "1NF removes repeating groups and ensures atomic values. 2NF removes partial dependency on a subset of primary key attributes. 3NF eliminates transitive dependencies to ensure that non- key attributes depend only on primary keys.",
//   //                               "topic": "Normalization, Denormalization & Functional Dependency",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 459,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What are functional dependencies? Give an example.",
//   //                               "answer": "A functional dependency is a relationship where one attribute uniquely determines another attribute. For example, in a table with attributes StudentID ? Name, StudentID functionally determines the student's Name.",
//   //                               "topic": "Normalization, Denormalization & Functional Dependency",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 460,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Normalize the relation R(A,B,C,D) with dependencies A?B; B?C; C?D to BCNF.",
//   //                               "answer": "To convert R to BCNF, decompose it stepwise: R1(A,B), R2(B,C), R3(C,D), ensuring each functional dependency has a superkey, which eliminates redundancy and enforces consistency.",
//   //                               "topic": "Normalization, Denormalization & Functional Dependency",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Relationships & ER Modeling",
//   //                       "questions": [
//   //                           {
//   //                               "id": 466,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Name three types of relationships in DBMS.",
//   //                               "answer": "The three main types of relationships are One-to-One, One-to-Many, and Many-to- Many, defining how entities are associated with each other in a database.",
//   //                               "topic": "Relationships & ER Modeling",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 467,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is an entity set?",
//   //                               "answer": "An entity set is a collection of similar entities in a database, representing objects or concepts that share common attributes.",
//   //                               "topic": "Relationships & ER Modeling",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 468,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain weak entities and their identifying relationship with a strong entity.",
//   //                               "answer": "Weak entities cannot be uniquely identified by their own attributes alone. They rely on a strong entity through a foreign key and are connected via an identifying relationship.",
//   //                               "topic": "Relationships & ER Modeling",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 469,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Differentiate between one-to- many and many- to-many relationships with examples.",
//   //                               "answer": "In a one-to-many relationship, a single entity is related to multiple entities (e.g., a teacher and their students). In a many-to-many relationship, multiple entities relate to multiple entities (e.g., students and courses).",
//   //                               "topic": "Relationships & ER Modeling",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 470,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Draw an ER diagram for a library system including books, members, and loans.",
//   //                               "answer": "The ER diagram includes entities: Book, Member, Loan; relationships: Members borrow Loans, Loans include Books.Primary keys identify entities, and foreign keys connect them.",
//   //                               "topic": "Relationships & ER Modeling",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Scaling, Sharding & Indexing",
//   //                       "questions": [
//   //                           {
//   //                               "id": 471,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is vertical scaling and horizontal scaling in databases?",
//   //                               "answer": "Vertical scaling increases resources on a single server like CPU and RAM. Horizontal scaling adds more servers to distribute data and load, improving performance and availability.",
//   //                               "topic": "Scaling, Sharding & Indexing",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 472,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Define sharding in a database.",
//   //                               "answer": "Sharding is a database partitioning technique that splits data across multiple databases or servers to enhance performance and scalability, reducing bottlenecks.",
//   //                               "topic": "Scaling, Sharding & Indexing",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 473,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Differentiate between clustered and non-clustered indexes.",
//   //                               "answer": "Clustered indexes reorder the physical data on disk to match the index, making retrieval faster. Non-clustered indexes create a separate structure with pointers to the data without changing its order.",
//   //                               "topic": "Scaling, Sharding & Indexing",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 474,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain horizontal vs vertical sharding with examples.",
//   //                               "answer": "Horizontal sharding splits rows across servers (e.g., users 1- 1000 on server 1). Vertical sharding splits columns (e.g., storing user profile on one server and transactions on another).",
//   //                               "topic": "Scaling, Sharding & Indexing",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 475,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Design an indexing and sharding strategy for a table storing millions of user records to optimize performance.",
//   //                               "answer": "Use horizontal sharding based on user ID ranges and create clustered indexes on commonly queried columns like email or user_id to speed up searches while balancing server load.",
//   //                               "topic": "Scaling, Sharding & Indexing",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Joins & Nested Queries",
//   //                       "questions": [
//   //                           {
//   //                               "id": 476,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is a JOIN in SQL? Name two types.",
//   //                               "answer": "A JOIN combines rows from two or more tables based on a related column. Common types are INNER JOIN, which returns matching rows, and LEFT JOIN, which returns all rows from the left table and matching rows from the right.",
//   //                               "topic": "Joins & Nested Queries",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 477,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is a nested query in SQL?",
//   //                               "answer": "A nested query, or subquery, is a query inside another query. It can provide results used by the outer query for filtering, comparison, or calculations.",
//   //                               "topic": "Joins & Nested Queries",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 478,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Differentiate between INNER JOIN and OUTER JOIN.",
//   //                               "answer": "INNER JOIN returns only the rows that have matching values in both tables, while OUTER JOIN returns all matching rows plus unmatched rows from one or both tables depending on LEFT, RIGHT, or FULL OUTER JOIN.",
//   //                               "topic": "Joins & Nested Queries",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 479,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain correlated vs non-correlated nested queries with examples.",
//   //                               "answer": "A correlated subquery depends on the outer query for its values, executing row by row. A non- correlated subquery executes independently and provides a result set for the outer query.",
//   //                               "topic": "Joins & Nested Queries",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 480,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Write a nested query to list departments having more than 5 employees earning above 50,000?",
//   //                               "answer": "SELECT dept_id FROM Department WHERE dept_id IN (SELECT dept_id FROM Employee WHERE salary>50000 GROUP BY dept_id HAVING COUNT(*)>5); This finds departments where more than five employees have salaries above 50,000.",
//   //                               "topic": "Joins & Nested Queries",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Locks, TRUNCATE/DELETE & 2/3-Tier Architecture",
//   //                       "questions": [
//   //                           {
//   //                               "id": 481,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is a lock in DBMS?",
//   //                               "answer": "A lock is a mechanism that controls concurrent access to data in a database to ensure consistency and prevent conflicts between transactions.",
//   //                               "topic": "Locks, TRUNCATE/DELETE & 2/3-Tier Architecture",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 482,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "What is the difference between DELETE and TRUNCATE\ncommands?",
//   //                               "answer": "DELETE removes specific rows and logs each deletion for rollback purposes; TRUNCATE removes all rows quickly without logging each row, making it faster but less flexible.",
//   //                               "topic": "Locks, TRUNCATE/DELETE & 2/3-Tier Architecture",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 483,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Differentiate between shared lock and exclusive lock.",
//   //                               "answer": "A shared lock allows multiple transactions to read data simultaneously but not modify it. An exclusive lock prevents other transactions from reading or writing to the locked data until it is released.",
//   //                               "topic": "Locks, TRUNCATE/DELETE & 2/3-Tier Architecture",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 484,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Explain the difference between 2-tier and 3-tier database Architecture.",
//   //                               "answer": "2-tier Architecture consists of client and database server directly interacting, while 3-tier adds an application server between client and database for better scalability, security, and manageability.",
//   //                               "topic": "Locks, TRUNCATE/DELETE & 2/3-Tier Architecture",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 485,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "DBMS",
//   //                               "question": "Design a 3-tier Architecture for an online shopping system and explain how locks and TRUNCATE/DELETE operations are handled safely.",
//   //                               "answer": "In a 3-tier system, the client communicates with the application server, which interacts with the database. Locks ensure safe concurrent transactions; DELETE operations are logged for rollback, and TRUNCATE is used cautiously during maintenance.",
//   //                               "topic": "Locks, TRUNCATE/DELETE & 2/3-Tier Architecture",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   }
//   //               ]
//   //           },
//   //           {
//   //               "step": 5,
//   //               "subject": "Computer Networks",
//   //               "title": "CN Fundamentals",
//   //               "description": "Covering network fundamentals, devices, IP addressing, protocols, and networking devices.",
//   //               "estimated_time": "2 weeks",
//   //               "core_questions": [
//   //                   {
//   //                       "topic": "Network Fundamentals",
//   //                       "questions": [
//   //                           {
//   //                               "id": 486,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Define a network.",
//   //                               "answer": "A network is a collection of interconnected devices that communicate and share resources such as data, printers, or internet connections.",
//   //                               "topic": "Network Fundamentals",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 487,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What do you mean by network topology? Explain types.",
//   //                               "answer": "Network topology is the arrangement of nodes and links in a network. Types: Star, Bus, Ring, Mesh, and Hybrid, each with different connectivity and fault tolerance characteristics.",
//   //                               "topic": "Network Fundamentals",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 488,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Define bandwidth, node, and link.",
//   //                               "answer": "Bandwidth is the data transfer capacity of a network, a node is any device connected to the network, and a link is the communication pathway between nodes.",
//   //                               "topic": "Network Fundamentals",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 489,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain the TCP/IP model.",
//   //                               "answer": "TCP/IP model has four layers: Application (protocols like HTTP, SMTP), Transport (TCP/UDP), Internet (IP addressing), and Network Access (hardware and MAC addressing).",
//   //                               "topic": "Network Fundamentals",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 490,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain the OSI model and compare it with TCP/IP.",
//   //                               "answer": "OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP has 4 layers. OSI is theoretical; TCP/IP is practical.",
//   //                               "topic": "Network Fundamentals",
//   //                               "difficulty_rating": 1,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Network Devices & Protocols",
//   //                       "questions": [
//   //                           {
//   //                               "id": 491,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is a gateway? Difference between gateway and router.",
//   //                               "answer": "A gateway connects different networks and translates protocols. Routers forward packets within the same protocol. Gateways operate at higher layers; routers at the network layer.",
//   //                               "topic": "Network Devices & Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 492,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What does the ping command do?",
//   //                               "answer": "Ping tests connectivity between two network devices by sending ICMP echo request packets and waiting for a reply. It measures round-trip time and packet loss.",
//   //                               "topic": "Network Devices & Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 493,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Define DNS, DNS forwarder, NIC.",
//   //                               "answer": "DNS resolves domain names to IP addresses. DNS forwarder relays DNS queries to external servers. NIC (Network Interface Card) enables a device to connect to a network.",
//   //                               "topic": "Network Devices & Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 494,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is a MAC address?",
//   //                               "answer": "A MAC (Media Access Control) address is a unique hardware identifier assigned to a network interface, used for local network communications.",
//   //                               "topic": "Network Devices & Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 495,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain what happens when you enter \"google.com\" in a browser.",
//   //                               "answer": "DNS resolves google.com to an IP address, browser establishes TCP connection using 3-way handshake, HTTP/HTTPS request sent, server responds, and page content is loaded.",
//   //                               "topic": "Network Devices & Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "IP Addressing & Subnetting",
//   //                       "questions": [
//   //                           {
//   //                               "id": 496,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is an IP address? Difference between private, public, and APIPA.",
//   //                               "answer": "An IP address uniquely identifies a device on a network. Private IPs are used internally, public IPs are globally routable, APIPA is automatic private addressing when DHCP fails.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 497,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Difference between IPv4 and IPv6.",
//   //                               "answer": "IPv4 uses 32-bit addresses, supports ~4.3 billion addresses. IPv6 uses 128-bit addresses, supports vastly more devices and has improved security and auto- configuration.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 498,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is a subnet?",
//   //                               "answer": "A subnet divides a network into smaller logical segments, improving efficiency, security, and managing broadcast traffic.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 499,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain significance of the Data Link Layer.",
//   //                               "answer": "Data Link Layer ensures reliable node-to-node communication, error detection, framing, and controls access to physical media.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 500,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain firewalls and their types.",
//   //                               "answer": "Firewalls control incoming and outgoing traffic based on security rules. Types: Packet-filtering, Stateful, Proxy, and Next- Generation Firewalls. They protect networks from unauthorized access.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 4,
//   //                               "difficulty_level": "Hard"
//   //                           },
//   //                           {
//   //                               "id": 516,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Difference between private and public IP addresses.",
//   //                               "answer": "Private IPs are used within local networks and are not routable on the internet; public IPs are globally unique and accessible over the internet.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 517,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is APIPA?",
//   //                               "answer": "APIPA (Automatic Private IP Addressing) assigns an IP automatically when DHCP fails, typically in the 169.254.x.x range.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 518,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain subnetting with example.",
//   //                               "answer": "Subnetting divides a large network into smaller networks. Example: 192.168.1.0/24 split into 192.168.1.0/26 and 192.168.1.64/26.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 519,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Difference between IPv4 and IPv6.",
//   //                               "answer": "IPv4 uses 32-bit addresses (~4.3B addresses); IPv6 uses 128-bit addresses (~340 undecillion addresses), with improved security and auto- configuration.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 520,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain what happens when a website is accessed (DNS to TCP).",
//   //                               "answer": "Browser queries DNS for IP, establishes TCP connection via 3-way handshake, sends HTTP/HTTPS request, server responds, and browser renders the page.",
//   //                               "topic": "IP Addressing & Subnetting",
//   //                               "difficulty_rating": 3,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Application Layer Protocols",
//   //                       "questions": [
//   //                           {
//   //                               "id": 506,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is HTTP and HTTPS protocol?",
//   //                               "answer": "HTTP is a stateless protocol for web communication. HTTPS adds encryption via SSL/TLS, providing secure data transfer.",
//   //                               "topic": "Application Layer Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 507,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "What is SMTP protocol?",
//   //                               "answer": "SMTP (Simple Mail Transfer Protocol) is used for sending emails between servers and clients in a network.",
//   //                               "topic": "Application Layer Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 508,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain LAN.",
//   //                               "answer": "LAN (Local Area Network) connects devices in a small geographical area like offices or campuses, providing high-speed, low-latency communication.",
//   //                               "topic": "Application Layer Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 509,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "VPN, advantages and disadvantages.",
//   //                               "answer": "VPN creates a secure private network over the internet. Advantages: privacy, security, remote access. Disadvantages: slower speed, cost, complexity.",
//   //                               "topic": "Application Layer Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 510,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Hub vs Switch.",
//   //                               "answer": "Hub broadcasts data to all ports, causing collisions; Switch forwards data only to the destination port using MAC addresses, improving efficiency and security.",
//   //                               "topic": "Application Layer Protocols",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   },
//   //                   {
//   //                       "topic": "Networking Devices",
//   //                       "questions": [
//   //                           {
//   //                               "id": 511,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Define network topology.",
//   //                               "answer": "Network topology describes the arrangement of nodes and links in a network, e.g., Star, Bus, Ring, Mesh, Hybrid.",
//   //                               "topic": "Networking Devices",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 512,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain significance of Data Link Layer.",
//   //                               "answer": "The Data Link Layer handles reliable node-to-node data transfer, error detection, and controls access to the physical medium.",
//   //                               "topic": "Networking Devices",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Easy"
//   //                           },
//   //                           {
//   //                               "id": 513,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Define gateway and difference with router.",
//   //                               "answer": "Gateway connects different networks and translates protocols. Routers forward packets within same protocol.",
//   //                               "topic": "Networking Devices",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 514,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain NIC.",
//   //                               "answer": "NIC (Network Interface Card) allows a device to connect to a network and communicate over wired or wireless mediums.",
//   //                               "topic": "Networking Devices",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Medium"
//   //                           },
//   //                           {
//   //                               "id": 515,
//   //                               "created_at": "2025-10-03T16:06:56.128647+00:00",
//   //                               "subject": "CN",
//   //                               "question": "Explain server- side load balancing with example.",
//   //                               "answer": "Server-side load balancer distributes requests among servers to ensure no single server is overloaded. Example: multiple web servers serving high-traffic sites like Amazon.",
//   //                               "topic": "Networking Devices",
//   //                               "difficulty_rating": 2,
//   //                               "difficulty_level": "Hard"
//   //                           }
//   //                       ]
//   //                   }
//   //               ]
//   //           }
//   //       ]}
//   // )
//   // Debug the onSave function
//   // console.log('🔍 RoadmapDisplay - onSave function:', onSave);
//   console.log('roadmap in roadmapDisplay.jsx : ', roadmap);

//   const toggleStep = (stepIndex) => {
//     const newExpanded = new Set(expandedSteps);
//     if (newExpanded.has(stepIndex)) {
//       newExpanded.delete(stepIndex);
//     } else {
//       newExpanded.add(stepIndex);
//     }
//     setExpandedSteps(newExpanded);
//   };

//   // Fixed save function with proper error handling
//   const handleSave = async () => {
//     console.log('💾 Save button clicked');
    
//     if (isSaving) {
//       // console.log('⏳ Already saving, skipping...');
//       return;
//     }
    
//     if (!onSave) {
//       // console.error('❌ onSave function is not provided');
//       alert('Save functionality is not available. Please check the console for details.');
//       return;
//     }
    
//     if (!roadmap) {
//       console.error('❌ No roadmap data to save');
//       alert('No roadmap data found. Please generate a roadmap first.');
//       return;
//     }

//     setIsSaving(true);
//     // console.log('🔄 Starting save process...');
    
//     try {
//       // Call the onSave function passed from parent
//       await onSave();
//       console.log('✅ Roadmap saved successfully!');
//     } catch (error) {
//       console.error('❌ Failed to save roadmap:', error);
//       alert(`Failed to save roadmap: ${error.message}`);
//     } finally {
//       setIsSaving(false);
//       console.log('🏁 Save process completed');
//     }
//   };

//   const calculateProgress = () => {
//     if (!roadmap?.roadmap || !Array.isArray(roadmap.roadmap)) return 0;
    
//     try {
//       const totalQuestions = roadmap.roadmap.reduce((acc, step) => {
//         let stepQuestions = 0;
        
//         if (step.questions && Array.isArray(step.questions)) {
//           stepQuestions += step.questions.length;
//         }
        
//         if (step.core_questions && Array.isArray(step.core_questions)) {
//           step.core_questions.forEach(topic => {
//             if (topic.questions && Array.isArray(topic.questions)) {
//               stepQuestions += topic.questions.length;
//             }
//           });
//         }
        
//         return acc + stepQuestions;
//       }, 0);
      
//       const completedQuestions = roadmap.roadmap.reduce((acc, step) => {
//         let stepCompleted = 0;
        
//         if (step.questions && Array.isArray(step.questions)) {
//           stepCompleted += step.questions.filter(q => q && q.completed).length;
//         }
        
//         if (step.core_questions && Array.isArray(step.core_questions)) {
//           step.core_questions.forEach(topic => {
//             if (topic.questions && Array.isArray(topic.questions)) {
//               stepCompleted += topic.questions.filter(q => q && q.completed).length;
//             }
//           });
//         }
        
//         return acc + stepCompleted;
//       }, 0);
      
//       return totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
//     } catch (error) {
//       console.error('Error calculating progress:', error);
//       return 0;
//     }
//   };

//   const getStepProgress = (step) => {
//     let total = 0;
//     let completed = 0;

//     if (step.questions && Array.isArray(step.questions)) {
//       total += step.questions.length;
//       completed += step.questions.filter(q => q && q.completed).length;
//     }
    
//     if (step.core_questions && Array.isArray(step.core_questions)) {
//       step.core_questions.forEach(topic => {
//         if (topic.questions && Array.isArray(topic.questions)) {
//           total += topic.questions.length;
//           completed += topic.questions.filter(q => q && q.completed).length;
//         }
//       });
//     }

//     return { 
//       completed, 
//       total, 
//       percentage: total > 0 ? Math.round((completed / total) * 100) : 0 
//     };
//   };

//   const getDifficultyColor = (difficulty) => {
//     if (!difficulty) return 'from-gray-500 to-slate-500';
    
//     switch (difficulty.toUpperCase()) {
//       case 'EASY':
//         return 'from-green-500 to-emerald-500';
//       case 'MEDIUM':
//         return 'from-yellow-500 to-orange-500';
//       case 'HARD':
//         return 'from-red-500 to-pink-500';
//       default:
//         return 'from-gray-500 to-slate-500';
//     }
//   };

//   // Enhanced safety check - accept steps with either questions or core_questions
//   const isValidStep = (step) => {
//     return step && (
//       (step.questions && Array.isArray(step.questions) && step.questions.length > 0) ||
//       (step.core_questions && Array.isArray(step.core_questions) && step.core_questions.length > 0)
//     );
//   };
  
//   console.log(roadmap?.roadmap)
//   // Accept either {roadmap:[...], company} or just an array
//   const steps = Array.isArray(roadmap) ? roadmap : roadmap?.roadmap;
//   const companyName = Array.isArray(roadmap) ? undefined : roadmap?.company;

//   if (!steps || !Array.isArray(steps) || steps.length === 0) {
//   //   return (
//   //     <div className="max-w-4xl mx-auto text-center py-12">
//   //       <div className="bg-red-50 border border-red-200 rounded-xl p-8">
//   //         <h3 className="text-xl font-bold text-red-800 mb-4">
//   //           Error: Invalid Roadmap Data
//   //         </h3>
//   //         <p className="text-red-600 mb-6">
//   //           The roadmap data is missing or corrupted. Please try generating a new roadmap.
//   //         </p>
//   //         <button
//   //           onClick={onGenerateNew}
//   //           className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//   //         >
//   //           Generate New Roadmap
//   //         </button>
//   //       </div>
//   //     </div>
//   //   );
//   }

//   // Calculate overallProgress HERE, before using it
//   const overallProgress = calculateProgress();
  
//   // Safe calculation of totals
//   const totalQuestions = steps.reduce((acc, step) => {
//     let stepQuestions = 0;
    
//     if (step.questions && Array.isArray(step.questions)) {
//       stepQuestions += step.questions.length;
//     }
    
//     if (step.core_questions && Array.isArray(step.core_questions)) {
//       step.core_questions.forEach(topic => {
//         if (topic.questions && Array.isArray(topic.questions)) {
//           stepQuestions += topic.questions.length;
//         }
//       });
//     }
    
//     return acc + stepQuestions;
//   }, 0);
  
//   const completedQuestions = steps.reduce((acc, step) => {
//     let stepCompleted = 0;
    
//     if (step.questions && Array.isArray(step.questions)) {
//       stepCompleted += step.questions.filter(q => q && q.completed).length;
//     }
    
//     if (step.core_questions && Array.isArray(step.core_questions)) {
//       step.core_questions.forEach(topic => {
//         if (topic.questions && Array.isArray(topic.questions)) {
//           stepCompleted += topic.questions.filter(q => q && q.completed).length;
//         }
//       });
//     }
    
//     return acc + stepCompleted;
//   }, 0);

//   // Filter valid steps - include steps with either questions or core_questions
//   const validSteps = steps.filter(isValidStep);

//   const toggleQuestionComplete = async (stepIndex, questionIndex) => {
//     const updatedRoadmap = { ...roadmap };
    
//     if (updatedRoadmap.roadmap && updatedRoadmap.roadmap[stepIndex]) {
//       const step = updatedRoadmap.roadmap[stepIndex];
      
//       if (step.questions && Array.isArray(step.questions) && step.questions[questionIndex]) {
//         const question = step.questions[questionIndex];
//         question.completed = !question.completed;
//       }
//       else if (step.core_questions && Array.isArray(step.core_questions)) {
//         let currentIndex = 0;
//         for (let topicIndex = 0; topicIndex < step.core_questions.length; topicIndex++) {
//           const topic = step.core_questions[topicIndex];
//           if (topic.questions && Array.isArray(topic.questions)) {
//             if (questionIndex < currentIndex + topic.questions.length) {
//               const localIndex = questionIndex - currentIndex;
//               if (topic.questions[localIndex]) {
//                 topic.questions[localIndex].completed = !topic.questions[localIndex].completed;
//                 break;
//               }
//             }
//             currentIndex += topic.questions.length;
//           }
//         }
//       }
      
//       console.log("updated roadmap in display.jsx : ", updatedRoadmap)
//       onUpdateProgress(updatedRoadmap);
      

//       if (roadmap.id) {
//         try {
//           await roadmapService.updateRoadmapProgress(roadmap.id, updatedRoadmap);
//         } catch (error) {
//           console.error('Failed to update progress:', error);
//         }
//       }
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
//       {/* Roadmap Header */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
//           <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
//         </div>
        
//         <div className="relative">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                   <Trophy className="w-7 h-7 text-yellow-300" />
//                 </div>
//                 <h2 className="text-4xl md:text-5xl font-bold">
//                   {roadmap.company || 'Unknown Company'} Interview Roadmap
//                 </h2>
//               </div>
              
//               <p className="text-xl text-blue-100 max-w-2xl">
//                 Your personalized study plan with {totalQuestions} carefully selected questions across {validSteps.length} steps
//               </p>
              
//               {/* Stats Row */}
//               <div className="flex flex-wrap gap-4 pt-4">
//                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
//                   <Target className="w-5 h-5 text-green-300" />
//                   <span className="font-semibold">{completedQuestions}/{totalQuestions} Complete</span>
//                 </div>
//                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
//                   <TrendingUp className="w-5 h-5 text-blue-300" />
//                   <span className="font-semibold">{overallProgress}% Progress</span>
//                 </div>
//                 <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
//                   <Clock className="w-5 h-5 text-purple-300" />
//                   <span className="font-semibold">{validSteps.length} Steps</span>
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="space-y-2 pt-2">
//                 <div className="flex justify-between text-sm text-blue-100">
//                   <span>Overall Progress</span>
//                   <span>{overallProgress}%</span>
//                 </div>
//                 <div className="w-full bg-white/20 rounded-full h-3">
//                   <div 
//                     className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
//                     style={{ width: `${overallProgress}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Button */}
//             <div className="flex flex-col space-y-3">
//               <button
//                 onClick={handleSave}
//                 disabled={isSaving || !onSave || !roadmap}
//                 className={`group text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center space-x-3 shadow-lg ${
//                   isSaving || !onSave || !roadmap
//                     ? 'bg-gray-400 cursor-not-allowed opacity-70' 
//                     : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:shadow-xl transform hover:scale-105'
//                 }`}
//               >
//                 <Save className={`w-6 h-6 ${
//                   isSaving ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform duration-200'
//                 }`} />
//                 <span>
//                   {isSaving ? 'Saving...' : 
//                    !onSave ? 'Save Unavailable' :
//                    !roadmap ? 'No Data' : 
//                    'Save Roadmap'}
//                 </span>
//               </button>
              
//               {overallProgress === 100 && (
//                 <div className="flex items-center space-x-2 text-green-300 font-semibold">
//                   <Award className="w-5 h-5" />
//                   <span>Completed!</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Roadmap Steps */}
//       <div className="space-y-6">
//         {validSteps.map((step, stepIndex) => {
//           const progress = getStepProgress(step);
//           const isExpanded = expandedSteps.has(stepIndex);
          
//           return (
//             <RoadmapStep
//               key={step.step || stepIndex}
//               step={step}
//               stepIndex={stepIndex}
//               isExpanded={isExpanded}
//               progress={progress}
//               onToggle={() => toggleStep(stepIndex)}
//               onQuestionToggle={(questionIndex) => toggleQuestionComplete(stepIndex, questionIndex)}
//               getDifficultyColor={getDifficultyColor}
//             />
//           );
//         })}
//       </div>

//       {/* Debug info */}
//       {validSteps.length !== roadmap.roadmap.length && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//           <p className="text-yellow-800 text-sm">
//             <strong>Note:</strong> Showing {validSteps.length} out of {roadmap.roadmap.length} steps. 
//             Some steps may be filtered due to missing question data.
//           </p>
//         </div>
//       )}

//       {/* Bottom Actions */}
//       <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-200/50">
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <h3 className="text-2xl font-bold text-gray-900">
//               Ready for More Challenges?
//             </h3>
//             <p className="text-gray-600">
//               Generate another roadmap for a different company or role
//             </p>
//           </div>
          
//           <button
//             onClick={onGenerateNew}
//             className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//             <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
//             <span>Generate New Roadmap</span>
//             <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoadmapDisplay;























import React, { useState } from 'react';
import { 
  Save, 
  Wand2, 
  Trophy, 
  Target,
  Clock,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import RoadmapStep from './RoadmapStep';
import { roadmapService } from '../../api';

const RoadmapDisplay = ({ roadmap, onSave, onGenerateNew, onUpdateProgress }) => {
  const [expandedSteps, setExpandedSteps] = useState(new Set([0]));
  const [expandedAnswers, setExpandedAnswers] = useState(new Set()); // New state for tracking expanded answers
  const [isSaving, setIsSaving] = useState(false);
  
  console.log('roadmap in roadmapDisplay.jsx : ', roadmap);

  const toggleStep = (stepIndex) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepIndex)) {
      newExpanded.delete(stepIndex);
    } else {
      newExpanded.add(stepIndex);
    }
    setExpandedSteps(newExpanded);
  };

  // New function to handle answer expansion
  const toggleAnswer = (stepIndex, questionIndex) => {
    const answerId = `${stepIndex}-${questionIndex}`;
    const newExpandedAnswers = new Set(expandedAnswers);
    if (newExpandedAnswers.has(answerId)) {
      newExpandedAnswers.delete(answerId);
    } else {
      newExpandedAnswers.add(answerId);
    }
    setExpandedAnswers(newExpandedAnswers);
  };

  // Fixed save function with proper error handling
  const handleSave = async () => {
    console.log('💾 Save button clicked');
    
    if (isSaving) {
      return;
    }
    
    if (!onSave) {
      alert('Save functionality is not available. Please check the console for details.');
      return;
    }
    
    if (!roadmap) {
      console.error('❌ No roadmap data to save');
      alert('No roadmap data found. Please generate a roadmap first.');
      return;
    }

    setIsSaving(true);
    console.log('🔄 Starting save process...');
    
    try {
      await onSave();
      console.log('✅ Roadmap saved successfully!');
    } catch (error) {
      console.error('❌ Failed to save roadmap:', error);
      alert(`Failed to save roadmap: ${error.message}`);
    } finally {
      setIsSaving(false);
      console.log('🏁 Save process completed');
    }
  };

  const calculateProgress = () => {
    if (!roadmap?.roadmap || !Array.isArray(roadmap.roadmap)) return 0;
    
    try {
      const totalQuestions = roadmap.roadmap.reduce((acc, step) => {
        let stepQuestions = 0;
        
        if (step.questions && Array.isArray(step.questions)) {
          stepQuestions += step.questions.length;
        }
        
        if (step.core_questions && Array.isArray(step.core_questions)) {
          step.core_questions.forEach(topic => {
            if (topic.questions && Array.isArray(topic.questions)) {
              stepQuestions += topic.questions.length;
            }
          });
        }
        
        return acc + stepQuestions;
      }, 0);
      
      const completedQuestions = roadmap.roadmap.reduce((acc, step) => {
        let stepCompleted = 0;
        
        if (step.questions && Array.isArray(step.questions)) {
          stepCompleted += step.questions.filter(q => q && q.completed).length;
        }
        
        if (step.core_questions && Array.isArray(step.core_questions)) {
          step.core_questions.forEach(topic => {
            if (topic.questions && Array.isArray(topic.questions)) {
              stepCompleted += topic.questions.filter(q => q && q.completed).length;
            }
          });
        }
        
        return acc + stepCompleted;
      }, 0);
      
      return totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  };

  const getStepProgress = (step) => {
    let total = 0;
    let completed = 0;

    if (step.questions && Array.isArray(step.questions)) {
      total += step.questions.length;
      completed += step.questions.filter(q => q && q.completed).length;
    }
    
    if (step.core_questions && Array.isArray(step.core_questions)) {
      step.core_questions.forEach(topic => {
        if (topic.questions && Array.isArray(topic.questions)) {
          total += topic.questions.length;
          completed += topic.questions.filter(q => q && q.completed).length;
        }
      });
    }

    return { 
      completed, 
      total, 
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0 
    };
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'from-gray-500 to-slate-500';
    
    switch (difficulty.toUpperCase()) {
      case 'EASY':
        return 'from-green-500 to-emerald-500';
      case 'MEDIUM':
        return 'from-yellow-500 to-orange-500';
      case 'HARD':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const isValidStep = (step) => {
    return step && (
      (step.questions && Array.isArray(step.questions) && step.questions.length > 0) ||
      (step.core_questions && Array.isArray(step.core_questions) && step.core_questions.length > 0)
    );
  };
  
  console.log(roadmap?.roadmap)
  const steps = Array.isArray(roadmap) ? roadmap : roadmap?.roadmap;
  const companyName = Array.isArray(roadmap) ? undefined : roadmap?.company;

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
 
  }

  const overallProgress = calculateProgress();
  
  const totalQuestions = steps.reduce((acc, step) => {
    let stepQuestions = 0;
    
    if (step.questions && Array.isArray(step.questions)) {
      stepQuestions += step.questions.length;
    }
    
    if (step.core_questions && Array.isArray(step.core_questions)) {
      step.core_questions.forEach(topic => {
        if (topic.questions && Array.isArray(topic.questions)) {
          stepQuestions += topic.questions.length;
        }
      });
    }
    
    return acc + stepQuestions;
  }, 0);
  
  const completedQuestions = steps.reduce((acc, step) => {
    let stepCompleted = 0;
    
    if (step.questions && Array.isArray(step.questions)) {
      stepCompleted += step.questions.filter(q => q && q.completed).length;
    }
    
    if (step.core_questions && Array.isArray(step.core_questions)) {
      step.core_questions.forEach(topic => {
        if (topic.questions && Array.isArray(topic.questions)) {
          stepCompleted += topic.questions.filter(q => q && q.completed).length;
        }
      });
    }
    
    return acc + stepCompleted;
  }, 0);

  const validSteps = steps.filter(isValidStep);

  const toggleQuestionComplete = async (stepIndex, questionIndex) => {
    const updatedRoadmap = { ...roadmap };
    
    if (updatedRoadmap.roadmap && updatedRoadmap.roadmap[stepIndex]) {
      const step = updatedRoadmap.roadmap[stepIndex];
      
      if (step.questions && Array.isArray(step.questions) && step.questions[questionIndex]) {
        const question = step.questions[questionIndex];
        question.completed = !question.completed;
      }
      else if (step.core_questions && Array.isArray(step.core_questions)) {
        let currentIndex = 0;
        for (let topicIndex = 0; topicIndex < step.core_questions.length; topicIndex++) {
          const topic = step.core_questions[topicIndex];
          if (topic.questions && Array.isArray(topic.questions)) {
            if (questionIndex < currentIndex + topic.questions.length) {
              const localIndex = questionIndex - currentIndex;
              if (topic.questions[localIndex]) {
                topic.questions[localIndex].completed = !topic.questions[localIndex].completed;
                break;
              }
            }
            currentIndex += topic.questions.length;
          }
        }
      }
      
      console.log("updated roadmap in display.jsx : ", updatedRoadmap)
      onUpdateProgress(updatedRoadmap);
      

      if (roadmap.id) {
        try {
          await roadmapService.updateRoadmapProgress(roadmap.id, updatedRoadmap);
        } catch (error) {
          console.error('Failed to update progress:', error);
        }
      }
    }
  };

  return (
    <div className="w-full max-w-none lg:max-w-6xl mx-auto space-y-6 lg:space-y-8 px-2 sm:px-4 py-4 lg:py-8">
      {/* Roadmap Header - Responsive */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-white rounded-full -translate-x-10 sm:-translate-x-20 -translate-y-10 sm:-translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-30 sm:w-60 h-30 sm:h-60 bg-white rounded-full translate-x-10 sm:translate-x-20 translate-y-10 sm:translate-y-20"></div>
        </div>
        
        <div className="relative">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="space-y-3 lg:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 lg:w-7 lg:h-7 text-yellow-300" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold break-words">
                  {roadmap.company || 'Unknown Company'} Interview Roadmap
                </h2>
              </div>
              
              <p className="text-base lg:text-xl text-blue-100">
                Your personalized study plan with {totalQuestions} carefully selected questions across {validSteps.length} steps
              </p>
              
              {/* Stats Row - Responsive */}
              <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 lg:pt-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm lg:text-base">
                  <Target className="w-4 h-4 lg:w-5 lg:h-5 text-green-300" />
                  <span className="font-semibold">{completedQuestions}/{totalQuestions} Complete</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm lg:text-base">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300" />
                  <span className="font-semibold">{overallProgress}% Progress</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm lg:text-base">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-purple-300" />
                  <span className="font-semibold">{validSteps.length} Steps</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm text-blue-100">
                  <span>Overall Progress</span>
                  <span>{overallProgress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 lg:h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 lg:h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Button - Responsive */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving || !onSave || !roadmap}
                className={`group text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg ${
                  isSaving || !onSave || !roadmap
                    ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                    : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:shadow-xl transform hover:scale-105'
                }`}
              >
                <Save className={`w-5 h-5 lg:w-6 lg:h-6 ${
                  isSaving ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform duration-200'
                }`} />
                <span>
                  {isSaving ? 'Saving...' : 
                   !onSave ? 'Save Unavailable' :
                   !roadmap ? 'No Data' : 
                   'Save Roadmap'}
                </span>
              </button>
              
              {overallProgress === 100 && (
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-green-300 font-semibold">
                  <Award className="w-5 h-5" />
                  <span>Completed!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Steps - Updated with new props */}
      <div className="space-y-4 lg:space-y-6">
        {validSteps.map((step, stepIndex) => {
          const progress = getStepProgress(step);
          const isExpanded = expandedSteps.has(stepIndex);
          
          return (
            <RoadmapStep
              key={step.step || stepIndex}
              step={step}
              stepIndex={stepIndex}
              isExpanded={isExpanded}
              progress={progress}
              expandedAnswers={expandedAnswers}
              onToggle={() => toggleStep(stepIndex)}
              onQuestionToggle={(questionIndex) => toggleQuestionComplete(stepIndex, questionIndex)}
              onAnswerToggle={(questionIndex) => toggleAnswer(stepIndex, questionIndex)}
              getDifficultyColor={getDifficultyColor}
            />
          );
        })}
      </div>

      {/* Debug info - Responsive */}
      {validSteps.length !== roadmap.roadmap.length && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> Showing {validSteps.length} out of {roadmap.roadmap.length} steps. 
            Some steps may be filtered due to missing question data.
          </p>
        </div>
      )}

      {/* Bottom Actions - Responsive */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center border border-gray-200/50">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
              Ready for More Challenges?
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              Generate another roadmap for a different company or role
            </p>
          </div>
          
          <button
            onClick={onGenerateNew}
            className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Wand2 className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform duration-200" />
            <span>Generate New Roadmap</span>
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDisplay;
