"use client";

import { SignInButton } from "@clerk/nextjs";
import {
  CheckCircle,
  Rocket,
  TrendingUp,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      desc: "Instant task management",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure",
      desc: "End-to-end encryption",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative",
      desc: "Team features included",
    },
  ];

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium">
              <Rocket className="h-4 w-4 mr-2" />
              Boost your productivity by 40%
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Manage Tasks
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Like a Pro
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl">
              TaskFlow combines beautiful design with powerful features to help
              you organize, prioritize, and accomplish what matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <SignInButton mode="modal">
                <button className="btn-primary">Start Free Trial</button>
              </SignInButton>
              <button className="btn-secondary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>14-day free trial</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Today's Tasks
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  3/5 Completed
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Design Review", time: "9:00 AM", completed: true },
                  { title: "Team Meeting", time: "11:00 AM", completed: true },
                  {
                    title: "Project Deadline",
                    time: "2:00 PM",
                    completed: false,
                    priority: "high",
                  },
                  { title: "Client Call", time: "4:30 PM", completed: false },
                ].map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-5 w-5 rounded-full border-2 ${
                          task.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.time}</p>
                      </div>
                    </div>
                    {task.priority === "high" && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                        High
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 text-blue-600 mb-2">
                        {feature.icon}
                      </div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-4 -left-4 h-64 w-64 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-4 -right-4 h-64 w-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
