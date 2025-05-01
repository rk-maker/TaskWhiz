`use client`;
import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomTextField from "../CustomTextField";
import CustomBtn from "../CustomBtn";
import { PlusCircle } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (task: { title: string; description: string }) => void;
}

const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onAddTask({ title, description });
      setTitle("");
      setDescription("");
      setIsActive(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className=" max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6  m-10">
      <form onSubmit={handleSubmit}>
        <CustomTextField
          title={title}
          onFocus={() => {
            setIsActive(true);
          }}
          onChange={(text) => {
            setTitle(text);
            if (!isActive && text) {
              setIsActive(true);
            }
          }}
        />
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mb-4">
            <textarea
              placeholder="Enter task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 min-h-[100px]"
            />
            <div className="flex justify-end gap-3">
              <CustomBtn
                bgColor="bg-gray-500"
                hoverBgColor="hover:bg-gray-600"
                text={`Cancel`}
                onClick={() => {
                  setIsActive(false);
                }}
                className="mt-2"
                type="button"
              />
              <CustomBtn
                text={`Add Task`}
                onClick={() => {
                  setIsActive(false);
                }}
                type="submit"
                className="mt-2"
                icon={<PlusCircle size={20} />}
              />
            </div>
          </div>
        </motion.div>
        {!isActive && (
          <div className="flex justify-center items-center mt-4">
            <CustomBtn
              text={`Add Task`}
              icon={<PlusCircle size={20} />}
              onClick={() => {
                setIsActive(true);
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default AddTaskForm;
