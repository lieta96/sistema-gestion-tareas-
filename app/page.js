"use client";

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { tasksService } from "@/app/services/tasksService";
import NewTask from "@/app/components/newTask";
import Task from "@/app/components/task";

function tasksReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return action.tasks;
    case "ADD_TASK":
      return [...state, action.task];
    case "UPDATE_TASK":
      return state.map((t) => (t.id === action.task.id ? action.task : t));
    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isInitialized, token } = useAuth();
  const [tasks, dispatchTasks] = useReducer(tasksReducer, []);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!isInitialized) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
    if (isAuthenticated) {
      tasksService
        .getTasks(token)
        .then((tasks) => {
          setError(null);
          dispatchTasks({ type: "SET_TASKS", tasks });
        })
        .catch(() => {
          setError("Error fetching tasks");
        });
    }
  }, [isInitialized, isAuthenticated, token, router]);

  if (!isInitialized) {
    return (
      <main className="flex  items-center justify-center bg-background">
        <p className="">Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <main className=" bg-background font-sans text-dark">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="max-md:hidden mb-8 text-2xl font-bold ">
          Tasks List
        </h1>
        <div className="flex flex-col-reverse md:grid gap-8 md:grid-cols-3">
          <div className=" col-span-2 flex flex-col gap-4">
          <h1 className=" md:hidden mb-8 text-2xl font-bold ">
          Tasks List
        </h1>
            <ul className="flex flex-col gap-3 ">
              {tasks.toReversed().map((task) => (<li key={task.id}><Task task={task} dispatchTasks={dispatchTasks} /></li>
              ))}
            </ul>
            {(tasks.length === 0 && !error) && (
              <p >
                No tasks.

              </p>
            )}
            {error && (
              <p className="text-dark-orange text-sm">
                {error}
              </p>
            )}
          </div>
          <NewTask token={token} tasks={tasks} dispatchTasks={dispatchTasks} />
        </div>
      </div>
    </main>
  );
}
