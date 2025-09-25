// src/components/LandingPage.js
import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
import ChatBot from "../ChatBot/ChatBot";

const Landing_page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formHeight, setFormHeight] = useState(null);
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [formSubmitted]);

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-24"
      style={{ backgroundImage: "url('/images/Landing.jpg')" }}
    >
      <div className="flex flex-col md:flex-row h-full items-start justify-between px-4 md:px-16 gap-6">
        {!formSubmitted && (
          <div
            ref={formRef}
            className="w-full md:w-1/2 bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Join the AI Revolution
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white/40 text-black focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white/40 text-black focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white/40 text-black focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded hover:opacity-90 transition"
              >
                LET'S TALK
              </button>
            </form>
          </div>
        )}

        {formSubmitted && (
          <ChatBot
            visible={formSubmitted}
            height={formHeight}
            username={formData.firstName}
          />
        )}
      </div>
    </div>
  );
};

export default Landing_page;
