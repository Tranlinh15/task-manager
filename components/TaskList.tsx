"use client";

import { useState } from "react";
import {
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import TaskForm from "./TaskForm";

interface TaskListProps {
  tasks: any[];
  onUpdate: () => void;
  onDelete: () => void;
}

export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      onDelete();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "IN_PROGRESS":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700 border-red-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-50 border-green-200";
      case "IN_PROGRESS":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-yellow-50 border-yellow-200";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-600">
          Get started by creating your first task!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`card p-4 animate-slide-up ${getStatusColor(
              task.status
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="pt-1">{getStatusIcon(task.status)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {task.priority.toLowerCase()}
                    </span>

                    {task.deadline && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(task.deadline), "MMM d, yyyy")}
                      </span>
                    )}

                    <span className="text-sm text-gray-500">
                      Created {format(new Date(task.createdAt), "MMM d")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setEditingTask(task)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Edit task"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <TaskForm
              task={editingTask}
              onSuccess={() => {
                setEditingTask(null);
                onUpdate();
              }}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
