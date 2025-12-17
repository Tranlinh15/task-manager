"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Plus, Calendar, Filter, Target } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";
import LoadingSpinner from "./LoadingSpinner";
import StatsCard from "./StatsCard";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  deadline: string | null;
  createdAt: string;
}

export default function TaskManager() {
  const { isLoaded, userId } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: "",
    sortBy: "deadline",
  });

  const fetchTasks = async () => {
    if (!userId) return;

    setLoading(true);
    const queryParams = new URLSearchParams({
      status: filters.status,
      priority: filters.priority,
      search: filters.search,
      sortBy: filters.sortBy,
    }).toString();

    try {
      const response = await fetch(`/api/tasks?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && userId) {
      fetchTasks();
    }
  }, [isLoaded, userId, filters]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
    pending: tasks.filter((t) => t.status === "PENDING").length,
    highPriority: tasks.filter((t) => t.priority === "HIGH").length,
  };

  const handleTaskCreated = () => {
    setShowForm(false);
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!userId) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Your Dashboard
        </h1>
        <p className="text-gray-600">
          Track, manage, and complete your tasks efficiently
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          change={10}
          icon={<Target className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          change={15}
          icon={<Calendar className="h-6 w-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          change={-5}
          icon={<Filter className="h-6 w-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
        <StatsCard
          title="High Priority"
          value={stats.highPriority}
          change={8}
          icon={<Target className="h-6 w-6 text-red-600" />}
          color="bg-red-50"
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Tasks</h2>
                <p className="text-gray-600 mt-1">
                  {tasks.length} task{tasks.length !== 1 ? "s" : ""} in your
                  list
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Task</span>
              </button>
            </div>

            <TaskFilters filters={filters} onFilterChange={setFilters} />

            {loading ? (
              <LoadingSpinner />
            ) : (
              <TaskList
                tasks={tasks}
                onUpdate={handleTaskUpdated}
                onDelete={handleTaskDeleted}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                <span className="font-medium">Schedule Tasks</span>
                <Calendar className="h-5 w-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition">
                <span className="font-medium">Set Priority</span>
                <Target className="h-5 w-5" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition">
                <span className="font-medium">Export Data</span>
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              {tasks
                .filter((t) => t.deadline && t.status !== "COMPLETED")
                .slice(0, 3)
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString()
                          : "No deadline"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === "HIGH"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {task.priority.toLowerCase()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <TaskForm
              onSuccess={handleTaskCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
