"use client";
import React from "react";
import { motion } from "framer-motion";
import CustomBtn from "../CustomBtn";
import { Task } from "@/types";
import { Trash2, Timer } from "lucide-react";
import clsx from "clsx";
import { Clock, XCircle, CheckCircle } from "lucide-react";
interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: 0 | 1 | 2 | 3) => void;
  onDelete: (id: string) => void;
}
const getTaskStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "bg-green-100 border-green-300 text-green-800";
    case 1:
      return "bg-yellow-100 border-yellow-300 text-yellow-800";
    case 2:
      return "bg-blue-100 border-blue-300 text-blue-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};
const getStatusicon = (status: number) => {
  switch (status) {
    case 0:
      return <Clock className="h-4 w-4" />;
    case 1:
      return <XCircle className="h-4 w-4" />;
    case 2:
      return <CheckCircle className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusString = (status: number) => {
  switch (status) {
    case 0:
      return "Active";
    case 1:
      return "Inactive";
    case 2:
      return "Completed";
    default:
      return "Delted";
  }
};
const TaskCard = ({ task, onStatusChange, onDelete }: TaskCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <motion.div
      className={clsx(
        "border rounded-lg p-4  transition-all duration-200 m-4",
        getTaskStatusColor(task.status),
        isHovered && "shadow-lg -translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <div className="flex space-x-2">
          <button
            className="text-red-500 hover:text-red-700 
            p-2 rounded-full hover:bg-red-100 transition-colors duration-400"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-sm mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <div className="tex-xs flex items-center gap-1">
          {getStatusicon(task.status)}
          <p className="text-sm">
            {getStatusString(task.status).charAt(0).toUpperCase() +
              getStatusString(task.status).slice(1)}
          </p>
        </div>
        <p className="text-sm">{formatDate(task.createdAt)}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-300 flex justify-between ">
        {task.status !== 0 && (
          <CustomBtn
            text="Active"
            height="h-7"
            onClick={() => onStatusChange(task.id, 0)}
            bgColor="bg-[#73A753]"
            hoverBgColor="hover:bg-[#354D0C]"
          />
        )}

        {task.status !== 1 && (
          <CustomBtn
            text="Inactive"
            height="h-6"
            onClick={() => onStatusChange(task.id, 1)}
            bgColor="bg-[#FEE276]"
            hoverBgColor="hover:bg-[#F5BD1F]"
          />
        )}
        {task.status !== 2 && (
          <CustomBtn
            text="Completed"
            height="h-6"
            onClick={() => onStatusChange(task.id, 2)}
            bgColor="bg-[#5D8AA8]"
            hoverBgColor="hover:bg-[#367588]"
          />
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
