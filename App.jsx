import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("timer");

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  const [stopwatch, setStopwatch] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  const [city, setCity] = useState("Toshkent");

  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const cities = {
    "Toshkent": { temp: 18, desc: "Quyoshli", icon: "☀️" },
    "Samarqand": { temp: 16, desc: "Bulutli", icon: "⛅" },
    "Buxoro": { temp: 19, desc: "Quyoshli", icon: "☀️" },
    "Fargʻona": { temp: 17, desc: "Yomgʻirli", icon: "🌧️" },
    "Andijon": { temp: 15, desc: "Bulutli", icon: "☁️" },
    "Namangan": { temp: 16, desc: "Quyoshli", icon: "☀️" },
    "Qarshi": { temp: 20, desc: "Issiq", icon: "🔥" },
    "Navoiy": { temp: 18, desc: "Shamolli", icon: "💨" },
    "Termiz": { temp: 23, desc: "Juda issiq", icon: "🥵" },
    "Nukus": { temp: 14, desc: "Sovuq", icon: "🧊" },
    "Urganch": { temp: 17, desc: "Yaxshi", icon: "😊" },
    "Jizzax": { temp: 17, desc: "Ochiq osmon", icon: "☀️" }
  };

  useEffect(() => {
    if (timerRunning && totalSeconds > 0) {
      const id = setInterval(() => setTotalSeconds(t => t - 1), 1000);
      return () => clearInterval(id);
    } else if (totalSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      alert("⏰ Vaqt tugadi!");
    }
  }, [timerRunning, totalSeconds]);

  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (swRunning) {
      const id = setInterval(() => setStopwatch(s => s + 10), 10);
      return () => clearInterval(id);
    }
  }, [swRunning]);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const formatStopwatch = (ms) => {
    const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
    const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${h}:${m}:${s}.${cs}`;
  };

  const addTodo = () => {
    if (todoText.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoText, done: false }]);
      setTodoText("");
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="title">4 in One Pro</h1>

      <div className="tabs">
        {["timer", "stopwatch", "weather", "todo"].map((t) => (
          <div
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "timer" && "⏱ Timer"}
            {t === "stopwatch" && "⏱ Sekundomer"}
            {t === "weather" && "☁️ Ob-havo"}
            {t === "todo" && "✔️ To-Do"}
          </div>
        ))}
      </div>

      <div className="card">
        {tab === "timer" && (
          <>
            <h2 className="section-title">Timer</h2>
            <div className="time-display">{formatTime(totalSeconds)}</div>

            <div className="timer-inputs">
              <input type="number" min="0" max="23" value={hours} onChange={(e) => setHours(+e.target.value || 0)} disabled={timerRunning} />
              <span>:</span>
              <input type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(+e.target.value || 0)} disabled={timerRunning} />
              <span>:</span>
              <input type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(+e.target.value || 0)} disabled={timerRunning} />
            </div>

            <div className="timer-buttons">
              <button className="btn-play" onClick={() => setTimerRunning(!timerRunning)}>
                {timerRunning ? "⏸ Pauza" : "▶ Start"}
              </button>
              <button className="btn-stop" onClick={() => {
                setTimerRunning(false);
                setTotalSeconds(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
              }}>
                ↻ Tozalash
              </button>
            </div>
          </>
        )}

        {tab === "stopwatch" && (
          <>
            <h2 className="section-title">Sekundomer</h2>
            <div className="time-display">{formatStopwatch(stopwatch)}</div>

            <div className="timer-buttons">
              <button className="btn-play" onClick={() => setSwRunning(!swRunning)}>
                {swRunning ? "⏸ Pauza" : "▶ Start"}
              </button>
              <button className="btn-stop" onClick={() => {
                setStopwatch(0);
                setSwRunning(false);
              }}>
                ↻ Noldan
              </button>
            </div>
          </>
        )}

        {tab === "weather" && (
          <>
            <h2 className="section-title">Ob-havo</h2>
            <select className="city-select" value={city} onChange={(e) => setCity(e.target.value)}>
              {Object.keys(cities).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="weather-big">{cities[city].icon}</div>
            <h3 className="city-name">{city}</h3>
            <div className="temp-big">{cities[city].temp}°C</div>
            <p className="desc">{cities[city].desc}</p>
          </>
        )}

        {tab === "todo" && (
          <>
            <h2 className="section-title">To-Do List</h2>
            <div className="todo-input">
              <input
                type="text"
                placeholder="Yangi vazifa..."
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <button className="btn-play" onClick={addTodo}>+ Qo'shish</button>
            </div>
            <div className="todo-list">
              {todos.map((t) => (
                <div key={t.id} className="todo-item">
                  <span
                    onClick={() => setTodos(todos.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
                    className={t.done ? "done" : ""}
                  >
                    {t.text}
                  </span>
                  <span onClick={() => setTodos(todos.filter((x) => x.id !== t.id))}>✕</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
