import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_API_URL + "/tasks",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    }
                );

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                setTasks(data.tasks);

            } catch (err) {
                console.log(err);
            }
        };

        fetchTasks();
    }, []);

    const getNextAction = (status) => {
        if (status === "pending") return "in-progress";
        if (status === "in-progress") return "completed";
        if (status === "completed") return "in-progress";
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_API_URL + `/tasks/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ status: newStatus })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setTasks(prev =>
                    prev.map(task =>
                        task._id === taskId
                            ? { ...task, status: newStatus }
                            : task
                    )
                );
            } else {
                console.log(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-4">
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    Your Tasks
                </li>

                {tasks.map(task => {
                    const nextStatus = getNextAction(task.status);

                    return (
                        <li key={task._id} className="list-row flex justify-between items-center">

                            <div>
                                <div className="font-semibold">{task.title}</div>
                                <div className="text-xs uppercase opacity-60">
                                    {task.status}
                                </div>
                            </div>

                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() =>
                                    updateTaskStatus(task._id, nextStatus)
                                }
                            >
                                {nextStatus}
                            </button>

                        </li>
                    );
                })}

                {/* Empty State */}
                {tasks.length === 0 && (
                    <li className="p-4 text-center opacity-60">
                        No tasks found
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Tasks;