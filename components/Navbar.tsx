"use client";

import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { CheckSquare, Bell, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [notifications] = useState(3);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TaskFlow
                </span>
                <p className="text-xs text-gray-500">Productivity Simplified</p>
              </div>
            </Link>

            <SignedIn>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Link>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition relative">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
            </SignedIn>
          </div>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Welcome back!
                  </p>
                  <p className="text-xs text-gray-500">Stay productive today</p>
                </div>
                <div className="relative">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <button className="btn-primary">Get Started</button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
