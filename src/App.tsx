import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { isTauri } from "@tauri-apps/api/core";
import { invoke } from "./invoke";
import "./App.css";

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
        <>
            <input onChange={(e) => setName(e.currentTarget.value)}></input>
            <button onClick={(e) => greet()}>Check</button>
            <p>{greetMsg}</p>
        </>
    );
}

export default App;
