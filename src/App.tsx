import { useEffect, useRef, useState } from "react";
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
    const [sEntryUID, setSEntryUID] = useState("-1");
    const [sFolder, setSFolder] = useState("-1");


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
                <div id="main-content">
                    <ExplortorSide lang={lang} wording={wording} sFolder={sFolder} setSFolder={setSFolder}/>
                    <div>
                        <PasswordList lang={lang} wording={wording} sEntryUID={sEntryUID} setSEntryUID={setSEntryUID} />
                        
                    </div>
                </div></>
                : <></>}
            {/* <button onClick={() => setLang("fr")}>fr</button>
                <button onClick={() => setLang("en")}>en</button></>  */}
        </>
    );
}

export default App;
