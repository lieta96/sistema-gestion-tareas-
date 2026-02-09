import { useAuth } from "@/app/context/authContext";
import { StatusSelect } from "./statusSelect";
import { tasksService } from "@/app/services/tasksService";
import { TrashIcon } from "./icons/trash";
export const Task = ({ task, dispatchTasks }) => {
    const { token } = useAuth();
    return (
        <div
            key={task.id}
            className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm"
        >
            <div className="flex flex-col gap-2">

                <h2 className="font-semibold ">{task.title}</h2>
                <p className=" text-sm ">
                    {task.description}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <StatusSelect value={task.status} onChange={(status) => {
                    const updated = { ...task, status };
                    tasksService.updateTask(updated, token).then((result) => {
                        if (result) dispatchTasks({ type: "UPDATE_TASK", task: result });
                    }).catch(() => {
                        console.error("Error updating task");
                    });
                }} />

                <button
                    aria-label="Delete task"
                    onClick={() => {
                        tasksService.deleteTask(task.id, token).then(() => {
                            dispatchTasks({ type: "DELETE_TASK", id: task.id });
                        }).catch(() => {
                            console.error("Error deleting task");
                        });
                    }}
                    className=" w-fit self-end p-1.5 text-sm font-medium  transition  group"
                >
                    <TrashIcon className="w-4 h-4  [&_path]:fill-light group-hover:[&_path]:fill-dark transition-all" />
                </button>
            </div>


        </div>
    )
}