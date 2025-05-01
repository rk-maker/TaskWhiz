"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, number } from "framer-motion";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import TaskCard from "./components/TaskCard/TaskCard";
import { title } from "process";
import { useDragControls } from "framer-motion";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 0 | 1 | 2 | 3;
  createdAt: Date;
};
export default function Home() {
  const controls = useDragControls();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const tabRef = useRef<HTMLDivElement | null>(null);
  const tabs = [
    { id: 0, title: "Active" },
    { id: 1, title: "InActive" },
    { id: 2, title: "Completed" },
  ];

  const updateWidth = () => {
    if (tabRef.current) {
      const parentWidth = tabRef.current.getBoundingClientRect().width;
      const noOfTabs = tabs.length;
      const newTabWidth = parentWidth / noOfTabs;
      setTabWidth(newTabWidth);
    }
  };

  const filteredTasks = tasks.filter((task) => activeTab === task.status);

  const AddTask = (task: { title: string; description: string }) => {
    const { title, description } = task;
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      description,
      status: 0,
      createdAt: new Date(),
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);
  };
  const updateTaskStatus = (id: string, status: 0 | 1 | 2 | 3) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };
  console.log("Tasks", tasks);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateWidth);
    if (tabRef.current) {
      resizeObserver.observe(tabRef.current);
    }
    return () => {
      if (tabRef.current) {
        resizeObserver.unobserve(tabRef.current);
      }
    };
  }, [tabs.length]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto ">
        <h1 className=" text-4xl md:text-6xl text-center mb-8 text-gray-800 ">
          Add your tasks
        </h1>
        <AddTaskForm onAddTask={AddTask} />
        <div
          className="p-1 bg-gray-300 x-auto flex items-center
          justify-between relative   rounded-[5px] h-12"
        >
          <div className="w-full   flex" ref={tabRef}>
            {tabs.map((tab, index) => {
              return (
                <button
                  className="relative py-3 text-sm  rounded-[4px]
                 h-10 min-w-[100px] z-10"
                  style={{ width: tabWidth }}
                  key={index}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                >
                  {tab.title}
                </button>
              );
            })}
            <div
              className="absolute inset-y-0 my-auto bg-white rounded-[4px] 
             h-10 mx-auto
            transition-all duration-300 ease-in-out"
              style={{
                width: tabWidth,
                translate: `${activeTab * tabWidth}px`,
              }}
            />
          </div>
        </div>
        {filteredTasks.length === 0 ? (
          <p className="text-center my-3">no tasks found!</p>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTasks.map((task, index) => (
                <motion.div
                  drag
                  dragControls={controls}
                  dragSnapToOrigin
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isDragging === task.id ? 0.5 : 1,
                    y: 0,
                    scale: isDragging === task.id ? 0.5 : 1,
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  onDragStart={(e, info) => {
                    setIsDragging(task.id);
                  }}
                  onDragEnd={(e, info) => {
                    console.log("Drag end");
                    setIsDragging(null);
                  }}
                >
                  <TaskCard
                    task={task}
                    onStatusChange={updateTaskStatus}
                    onDelete={() => {
                      console.log("Delete");
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
