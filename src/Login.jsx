import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      onLogin(); // 👈 tell App to update login state immediately
    } else {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-2xl shadow-xl text-white w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-600 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-600 focus:outline-none"
        />

        {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-300 py-2 rounded hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
