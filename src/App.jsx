import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login.jsx";
import { useNavigate } from "react-router-dom";

function TodoApp({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filter === "done") return task.completed && matchesSearch;
    if (filter === "not-done") return !task.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className="h-full min-h-screen flex flex-col bg-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">To-Do List</h1>
        <button
          onClick={onLogout}
          className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-400 px-4 py-2 rounded-full transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* To-Do content */}
      <div className="flex flex-col bg-[url(/backgound-img.jpg)] bg-no-repeat bg-cover bg-center bg-blend-overlay bg-black/40 h-[300px] justify-center items-center gap-4 px-4">
        <h1 className="text-4xl font-bold text-white text-center">To-Do List</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-3 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow-2xl placeholder-white-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:from-blue-600 hover:to-blue-400 cursor-pointer"
        />

        {/* Input box + Add button */}
        <div className="flex justify-center w-full shadow-2xl">
          <div className="w-md max-w-full flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 rounded-l-full border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-blue-500 to-blue-300 text-white px-4 py-2 rounded-r-full hover:bg-blue-700 transition hover:from-blue-600 hover:to-blue-400 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 py-8 px-2 justify-center items-center">
        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-4">
          {["all", "done", "not-done"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full transition ${
                filter === tab
                  ? "bg-gradient-to-r from-blue-500 to-blue-300 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab === "done"
                ? "Done"
                : "Not Done"}
            </button>
          ))}
        </div>

        {/* Task list */}
        <ul className="space-y-2 w-full max-w-md mx-auto">
          {filteredTasks.length === 0 && (
            <p className="text-gray-400 text-center">
              Oops! Tasks not found 😅
            </p>
          )}

          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-full"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`flex-1 cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();

  // When login state changes, redirect accordingly
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // go to todo page
    } else {
      navigate("/login"); // go to login page
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <TodoApp onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )
        }
      />
    </Routes>
  );
}

export default App;
