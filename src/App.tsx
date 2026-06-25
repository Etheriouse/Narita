import { useEffect, useState } from "react";
import { invoke } from "./invoke";
import "./App.css";
import NavBar from "./Component/NavBar";
import ExplortorSide from "./Component/ExploratorSide";
import PasswordList from "./Component/PasswordList";
import { Worder } from "./type";

function App() {

    const [ready, setReady] = useState(false);

    const [lang, setLang] = useState("en");
    const [wording, setWording] = useState({} as Worder);



    useEffect(() => {
        async function __setWording() {
            setWording(await invoke("wording"));
            console.log("info: wording loaded");
        }
        __setWording().then(() => {
            setReady(true);
            console.log("info: app ready");
        })
    }, [])

    return (
        <>
            {ready ? <><NavBar />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <ExplortorSide />
                    <PasswordList lang={lang} wording={wording} />
                </div>
                <button onClick={() => setLang("fr")}>fr</button>
                <button onClick={() => setLang("en")}>en</button></> : <></>}
        </>
    );
}

export default App;
