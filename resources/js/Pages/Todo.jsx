import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import adzik from '/public/build/assets/adzik.jpg';



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return undefined;
}

export default function Todo() {
  const { props } = usePage();
  const user = props?.auth?.user;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetch("/sanctum/csrf-cookie", { credentials: "include" });
        const res = await fetch("/api/tasks", { credentials: "include" });
        if (!res.ok) {
          const html = await res.text();
          console.error("Error:", html);
          return;
        }
        setTasks(await res.json());
      } catch (e) {
        console.error("Load tasks error:", e);
      }
    };
    loadTasks();
  }, []);

  const addTask = async () => {
  if (!newTask.trim()) return;
  try {
    await fetch("/sanctum/csrf-cookie", { credentials: "include" });
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",
      body: JSON.stringify({ description: newTask }),
    });
    if (!res.ok) {
      console.error("Create failed:", res.status, await res.text());
      return;
    }
    const data = await res.json();
    setTasks((prev) => [...prev, data]);
    setNewTask("");
  } catch (e) {
    console.error("Add task error:", e);
  }
};

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Delete failed:", await res.text());
        return;
      }
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error("Delete task error:", e);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        credentials: "include",
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) {
        console.error("Update failed:", await res.text());
        return;
      }
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (e) {
      console.error("Toggle complete error:", e);
    }
  };

  const editTask = async (task) => {
    const newText = prompt("Change your task:", task.description);
    if (newText === null || newText.trim() === "" || newText === task.description) return;
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        credentials: "include",
        body: JSON.stringify({ description: newText }),
      });
      if (!res.ok) {
        console.error("Edit failed:", await res.text());
        return;
      }
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (e) {
      console.error("Edit task error:", e);
    }
  };

const handlelogout = async () => {
  try {
    await fetch("/sanctum/csrf-cookie", { credentials: "include" });
    const res = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      credentials: "include",
    });
    if (res.status === 401) {
      console.warn("Already logged out");
      window.location.href = "/login";
      return;
    }
    if (!res.ok) {
      console.error("Logout failed:", await res.text());
      return;
    }
    setTasks([]);
    window.location.href = "/login";
  } catch (e) {
    console.error("Logout error:", e);
  }
};
  return (
    <div>
      <div className="string"></div>
      <div className="headerTodo">
        {user.name === "Adzik" && <img className="adzik" src={adzik} alt="" />}
      <h3 className="welcome">
  {user.name === "Adzik"
    ? `Ողջու՜՜՜յն, ${user?.name}։`
    : `Welcome, ${user?.name}.`}
</h3>
<h3 className="welcome"> Write your task</h3>
      </div>
      <button onClick={handlelogout} className="logoutButton">Logout</button>
      <div className="todoContainer">
        <input
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="taskInput"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={addTask} className="addTask">Add</button>

        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.description}
              </span>
              <div className="taskButtons">
                <button className="todobutton" onClick={() => toggleComplete(t)}> 
                  {t.completed ? "Completed" : "Complete"}
                </button>
                <button className="todobutton"  onClick={() => editTask(t)}>Edit</button>
                <button className="todobutton" onClick={() => deleteTask(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
