import React from "react";
import member1 from "../assets/member1.jpg";
 // Add your 4th image

const team = [
  {
    name: "Suraj Shingade",
    role: "Full Stack Developer",
    image: member1,
    linkedin: "https://www.linkedin.com/in/suraj-shingade-77b829290/",
  },
  {
    name: "Meet Oza",
    role: "Full Stack Developer",
    image: member1,
    linkedin: "https://www.linkedin.com/in/meetoza30/",
  },
  {
    name: "Mahesh Rajput",
    role: "Frontend Developer",
    image: member1,
    linkedin: "https://www.linkedin.com/in/mahesh-rajput-86b4362b7/",
  },
  {
    name: "Yash Karande",
    role: "Backend Developer",
    image: member1,
    linkedin: "https://www.linkedin.com/in/yash-karande-849b55290/",
  },
];

const About = () => (
  <div className="min-h-screen bg-blue-50 flex flex-col items-center pb-20 px-2">
    {/* Logo and Branding */}
    <div className="flex flex-col items-center mt-10 mb-6">
      <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4 shadow-lg">
        <span className="text-white font-bold text-4xl select-none">IE</span>
      </div>
      <h1 className="text-3xl font-extrabold text-blue-700">InterviewExp</h1>
    </div>

    {/* Team - Responsive Cards */}
    <h2 className="text-3xl font-extrabold mt-8 mb-8 text-gray-900 text-center">Team</h2>
    <div className="w-full flex flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 px-2">
      {team.map((member, idx) => (
        <div
          key={member.name + idx}
          className="w-full max-w-xs bg-white rounded-3xl shadow-xl flex flex-col items-center p-6 relative"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl border-4 border-blue-100 mb-6"
            style={{ background: "#f3f4f6" }}
          />
          <h3 className="font-bold text-lg text-gray-800 mb-1 text-center">{member.name}</h3>
          <p className="text-blue-600 font-medium mb-4 text-center">{member.role}</p>
          <div className="flex items-center justify-center w-full gap-2">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition shadow-lg"
            >
              {/* Simple LinkedIn SVG */}
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.75s.784-1.74 1.75-1.74c.965 0 1.75.78 1.75 1.74 0 .96-.785 1.75-1.75 1.75zm15.5 11.28h-3v-5.35c0-1.28-.03-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83v5.45h-3v-10h2.88v1.37h.04c.4-.76 1.36-1.57 2.8-1.57 3 0 3.56 1.98 3.56 4.55v5.65z"/>
              </svg>
              in
            </a>
            {/* <button className="ml-2 px-5 py-2 bg-white border border-blue-600 text-blue-700 rounded-full hover:bg-blue-50 transition font-semibold text-sm shadow">
              Contact Me
            </button> */}
          </div>
        </div>
      ))}
    </div>

    {/* Our Story */}
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 mb-8 md:mb-14 shadow-lg border border-blue-100">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">Our Story</h2>
      <p className="text-gray-800 text-base md:text-lg mb-4">
        We all know that preparing for job interviews can be a daunting task 😬. But what if there was a way to make it a little easier 🙂? That's when the idea for our site came to life 💡.
      </p>
      <p className="text-gray-700 mb-4">
        As we navigated our own placement journeys, we realized there was a huge gap ⚠️ in resources focused on real, firsthand interview experiences. Sure, there's advice on how to answer questions, but what about the actual experience? What's the atmosphere like? What kind of questions do companies ask? What should you expect during the process?
      </p>
      <p className="text-gray-700 mb-4">
        So, we decided to create a platform where people could share their unique experiences—no filters, no sugarcoating 🚫.
      </p>
      <p className="text-gray-700 mb-2">
        Through this website, we hope to build a community supporting each other 🤝, sharing knowledge, and making the process less intimidating 😊. Because we believe understanding the process is just as important as preparing the answers.
      </p>
      <p className="text-blue-600 font-bold text-center mt-6">
        By the students for the students 👨‍🎓👩‍🎓
      </p>
    </div>
  </div>
);

export default About;
