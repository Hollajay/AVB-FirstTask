"use client";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addTodo, removeTodo, editTodo } from "@/features/todoSlice";
import Image from "next/image";
import backgroundImage from "@/assets/images/appointment-calendar-2295338_1280.jpg";

export default function Home() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState<number | null>(null);
  const todoList = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  const submitTodo = (e: any) => {
    e.preventDefault();
    if (editIndex !== null) {
      dispatch(editTodo({ index: editIndex, newTask: task }));
      setEditIndex(null);
    } else {
      dispatch(addTodo({ task }));
    }
    setTask("");
  };

  const handleEdit = (index: number) => {
    const currentTask = todoList[index].task;
    setTask(currentTask);
    setEditIndex(index);
  };

  const deleteTodo = (Index: number) => {
    dispatch(removeTodo(Index));
    if (checked !== null) {
      if (checked === Index) {
        setChecked(null);
      } else if (checked > Index) {
        setChecked(checked - 1);
      }
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative">
      <div className="w-full h-screen">
        <Image
          className="w-full h-full"
          src={backgroundImage}
          alt="background image"
        />
      </div>
      <div className="w-full h-screen absolute left-0 top-0 bg-[#00000090] flex items-center justify-center">
        <div className="lg:w-1/2 md:w-3/4 w-full  mx-4 bg-[#ffffff35] p-4 rounded-3xl  relative">
          <div>
            <h1 className="text-5xl font-bold text-white">To Do</h1>
            <h1 className="text-3xl text-white">{formattedDate}</h1>
          </div>

          <form action="" onSubmit={submitTodo}>
            <div className="p-4 space-y-6 flex items-center justify-between gap-6">
              <div className="border-b-2 border-amber-50 h-10 w-full ">
                <input
                  className="w-full h-full p-0 outline-0 text-white placeholder:text-white"
                  placeholder="Enter todo"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  type="text"
                />
              </div>
              <button
                className="bg-[#376e7c] transition duration-700 ease-in-out hover:bg-[#268ba4ff] px-3 py-3 rounded-full transition duration-200"
                type="submit"
              >
                <PlusIcon width={20} color="white" />
              </button>
            </div>
          </form>

          <div className="w-full flex flex-col gap-6 p-2 h-84 overflow-y-auto">
            {todoList.length === 0 ? (
              <h1 className="text-white text-3xl text-center">
                Create New Task
              </h1>
            ) : (
              todoList.map((data, index) => (
                <div
                  key={index}
                  className="group shadow-2xl transition duration-700 ease-in-out bg-[#ffffff97]
                   p-3 rounded-lg items-center w-full justify-between flex hover:bg-[#376e7c]"
                >
                  <div className="flex gap-3">
                    <input
                      className="w-4"
                      type="checkbox"
                      checked={checked === index}
                      onChange={() =>
                        setChecked(checked === index ? null : index)
                      }
                    />
                    <h1
                      className={`font-normal  transition duration-500 ease-in-out text-[#376e7c] group-hover:text-white ${
                        checked === index
                          ? "line-through italic text-neutral-500 "
                          : "parent-hover:text-white"
                      }`}
                    >
                      {data.task}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() => handleEdit(index)}
                      className={`${checked === index ? "disable" : ""}`}
                    >
                      <PencilIcon
                        width={20}
                        color={`${
                          checked === index ? "#828282ff" : "#268ba4ff"
                        }`}
                      />
                    </div>
                    <div onClick={() => deleteTodo(index)}>
                      <TrashIcon
                        width={20}
                        color={`${
                          checked === index ? "#828282ff" : " #9e0505 "
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
