import { taskStore } from "@/app/mocks/tasks";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

function ensureAuthenticated(token) {
    if (!token) {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
    }
}

export const tasksService = {
    async getTasks(token) {
        ensureAuthenticated(token);
        await delay();
        return taskStore.getAll();
    },
    async addTask(task, token) {
        ensureAuthenticated(token);
        await delay();
        return taskStore.add(task);
    },
    async updateTask(task, token) {
        ensureAuthenticated(token);
        await delay();
        return taskStore.update(task);
    },
    async deleteTask(id, token) {
        ensureAuthenticated(token);
        await delay();
        taskStore.remove(id);
    },
};