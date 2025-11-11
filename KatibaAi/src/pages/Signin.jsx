import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Instant Answers, No Jargon.",
      description:
        "Katiba AI translates legal terms into clear, concise language anyone can understand.",
    },
    {
      title: "Always Up-to-Date.",
      description:
        "Stay informed with the latest amendments and interpretations of the Constitution.",
    },
    {
      title: "Empower Your Understanding.",
      description:
        "Whether you’re a student, lawyer, or citizen, gain clear insight into your rights.",
    },
    {
      title: "Available 24/7.",
      description:
        "Access accurate constitutional help anytime from any device.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Ask Your Question",
      description:
        "Type your constitutional question into Katiba AI’s simple interface.",
    },
    {
      number: "2",
      title: "Katiba AI Processes",
      description:
        "Our intelligent system understands your question and finds the right law.",
    },
    {
      number: "3",
      title: "Get Your Answer",
      description:
        "Receive a clear, accurate and easy explanation of the relevant provision.",
    },
  ];

  return (
    <div className="font-sans antialiased text-gray-900 text-base bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-50 text-center md:text-left py-16 px-6 md:px-12 rounded-b-3xl shadow-inner flex flex-col md:flex-row items-center justify-around gap-8 md:gap-16">
        <div className="max-w-3xl mb-6 md:mb-0 md:mr-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-6 leading-tight">
            Unlock the Kenyan Constitution, Instantly.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Katiba AI provides quick, accurate, and easy-to-understand answers
            about the Constitution of Kenya. Get the legal insights you need,
            whenever you need them.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="w-full md:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Get Started
          </button>
        </div>
        <div className="w-full max-w-lg min-h-[280px] sm:min-h-[300px] bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl flex items-center justify-center border-4 border-dashed border-blue-400 text-blue-700 text-xl font-semibold shadow-inner animate-pulse-light px-4">
          <p>Your Chatbot Interaction</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-center py-16 px-6 sm:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Why Katiba AI?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-3">
                {f.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-50 text-center py-16 px-6 rounded-t-3xl shadow-inner">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-around gap-10 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-md transition transform hover:scale-105 flex-1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-4 shadow-md border-2 border-blue-400">
                {step.number}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center py-14 px-6 rounded-b-3xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto leading-snug">
          Ready to explore the Kenyan Constitution with ease?
        </h2>
        <button
          onClick={() => navigate("/home")}
          className="mt-4 px-6 py-3 text-sm sm:text-base font-bold bg-white text-blue-700 rounded-full shadow-md hover:scale-105 transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Start Using Katiba AI Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-8 px-6 text-sm mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Katiba AI. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <a href="/privacy-policy" className="hover:text-blue-400 transition">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-blue-400 transition">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
