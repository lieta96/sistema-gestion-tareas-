import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { TASK_STATUS } from "@/app/mocks/tasks";
import { ExpandIcon } from "./icons/expand";
const STATUS_OPTIONS = [
    { value: TASK_STATUS.TODO, label: TASK_STATUS.TODO },
    { value: TASK_STATUS.IN_PROGRESS, label: TASK_STATUS.IN_PROGRESS },
    { value: TASK_STATUS.DONE, label: TASK_STATUS.DONE },
];
export const StatusSelect = ({ value, onChange }) => {
    const colors = {
        [TASK_STATUS.TODO]: "blue",
        [TASK_STATUS.IN_PROGRESS]: "orange",
        [TASK_STATUS.DONE]: "green",
    }
    return (
        <Listbox
            value={value}
            onChange={(status) =>
                onChange(status)
            }
        >
            <div className="relative w-fit">
                <ListboxButton
                    aria-label="Status"
                    className={`text-sm  flex min-w-32 items-center justify-between rounded-full px-4 py-1.5  focus:outline-none focus:ring-2 gap-2 font-bold data-focus:outline-none `}
                    style={{
                        color: `var(--dark-${colors[value]})`,
                        backgroundColor: `var(--light-${colors[value]})`,
                    }}
                >
                    <span className="w-4 h-4 rounded-full " style={{
                        backgroundColor: `var(--dark-${colors[value]})`,
                    }} />
                    <span>{value}</span>
                    <ExpandIcon className="w-8 h-6 stroke-dark" />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom start"
                    className="mt-1 max-h-48 w-32 overflow-auto rounded-lg border-[1.5]  bg-white shadow-lg empty:hidden"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <ListboxOption
                            key={opt.value}
                            value={opt.value}
                            className="cursor-pointer px-3 py-2  data-focus:bg-background data-selected:bg-background  data-selected:text-dark data-focus:outline-none data-selected:font-bold"
                        >
                            {opt.label}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}