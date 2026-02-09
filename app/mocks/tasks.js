export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};


const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'Revisar documentación del proyecto',
    description: 'Leer el PDF del reto y anotar requisitos.',
    status: TASK_STATUS.DONE,
  },
  {
    id: 2,
    title: 'Configurar estructura de carpetas',
    description: 'Crear mocks, services, context y components.',
    status: TASK_STATUS.IN_PROGRESS,
  },
  {
    id: 3,
    title: 'Implementar login con JWT simulado',
    description: 'Formulario de login y guardado del token mock.',
    status: TASK_STATUS.TODO,
  },
  {
    id: 4,
    title: 'Listar y gestionar tareas',
    description: 'CRUD de tareas usando los mocks.',
    status: TASK_STATUS.TODO,
  },
]// Estado en memoria del mock 
let tasksInMemory =  DEFAULT_TASKS.map((t) => ({ ...t }));

// Store del mock de tareas. Simula un backend en memoria.
export const taskStore = {
  getAll() {
    return tasksInMemory.map((t) => ({ ...t }));
  },
  add(task) {
    tasksInMemory = [...tasksInMemory, { ...task }];
    return tasksInMemory[tasksInMemory.length - 1];
  },
  update(task) {
    const index = tasksInMemory.findIndex((t) => t.id === task.id);
    if (index === -1) return null;
    tasksInMemory = tasksInMemory.map((t) => (t.id === task.id ? { ...task } : t));
    return { ...task };
  },
  remove(id) {
    tasksInMemory = tasksInMemory.filter((t) => t.id !== id);
  },
};
