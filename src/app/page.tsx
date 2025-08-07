"use client";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addTodo, removeTodo, editTodo } from "@/features/todoSlice";
import Image from "next/image";
import backgroundImage from "@/assets/images/appointment-calendar-2295338_1280.jpg";
export default function Home() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
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

  const deleteTodo = (i: number) => {
    dispatch(removeTodo(i));
  };

  const [checked, setChecked] = useState<number | null>(null);

  return (
    <div className="relative">
     <div className="w-full h-screen"><Image className="w-full h-full" src={backgroundImage} alt="background image" /></div> 
      <div className="w-full h-screen absolute left-0 top-0 bg-[#00000090] flex items-center justify-center">
        <div className="md:w-1/2 w-full mx-4 bg-[#ffffff35] p-4 rounded-3xl  relative">
          <div>
            <h1 className="text-4xl">To Do</h1>
          </div>

          <form action="" onSubmit={submitTodo}>
            <div className="p-4 space-y-6 flex items-center justify-between gap-6">
              <div className="border-b-2 h-10 w-full ">
                <input
                  className="w-full h-full p-0 outline-0"
                  placeholder="Enter todo"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  type="text"
                />
              </div>
              <button
                className="bg-blue-300 px-6 py-2 rounded-lg"
                type="submit"
              >
                <PlusIcon width={20} />
              </button>
            </div>
          </form>

          <div className="w-full flex flex-col gap-6 p-2">
            {todoList.map((data, index) => (
              <div
                key={index}
                className="shadow-2xl bg-[#ffffff97] p-3 rounded-lg items-center w-full justify-between flex hover:bg-blue-300"
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
                    className={`font-normal ${
                      checked === index
                        ? "line-through italic text-neutral-700"
                        : ""
                    }`}
                  >
                    {data.task}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div onClick={() => handleEdit(index)}>
                    <PencilIcon width={20} color="blue"/>
                  </div>
                  <div className="" onClick={() => deleteTodo(index)}>
                    <TrashIcon width={20} color="#9e0505" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
