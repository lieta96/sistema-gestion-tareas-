"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { StatusSelect } from "./statusSelect";
import { tasksService } from "@/app/services/tasksService";
import { TASK_STATUS } from "@/app/mocks/tasks";

export default function NewTask({ token, tasks, dispatchTasks }) {
    const [addTaskStatus, setAddTaskStatus] = useState(TASK_STATUS.TODO);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data) => {
        const title = data.title?.trim() ?? "";
        const description = data.description?.trim() ?? "";
        const maxID = Math.max(0, ...tasks.map((task) => Number(task.id) || 0));
        const payload = {
            id: maxID + 1,
            title,
            description,
            status: addTaskStatus,
        };
        const created = await tasksService.addTask(payload, token);
        dispatchTasks({ type: "ADD_TASK", task: created });
        reset({ title: "", description: "" });
        setAddTaskStatus(TASK_STATUS.TODO);
    };

    return (
        <div className="rounded-xl bg-white shadow-sm p-4 h-fit flex flex-col gap-4">
           
            <h2 className="text-lg font-semibold ">
                Create New Task
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <div>
                    <input
                        aria-label="Title"
                        type="text"
                        placeholder="Title"
                        className="rounded-lg border-[1.5] border-light  px-3 py-2  placeholder:/60 focus:outline-none focus:ring-2 w-full"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title && (
                        <p className="error-message">
                            {errors.title.message}
                        </p>
                    )}
                </div>
                <textarea
                    aria-label="Description"
                    rows={3}
                    placeholder="Description"
                    className="rounded-lg border-[1.5] border-light  px-3 py-2  placeholder:/60 focus:outline-none focus:ring-2 resize-y min-h-[80px] w-full"
                    {...register("description")}
                />
                <StatusSelect value={addTaskStatus} onChange={setAddTaskStatus} />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                >
                    {isSubmitting ? "Creating…" : "Create"}
                </button>
            </form>
        </div>
    );
};
