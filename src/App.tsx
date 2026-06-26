import { useEffect, useRef, useState } from "react";
import { invoke } from "./invoke";
import "./App.css";
import { Worder } from "./type";
import Login from "./Component/Login";
import RngPassword from "./Component/RngPassword";
import Entry from "./Component/Entry";
import NavBar from "./Component/NavBar";
import ExplortorSide from "./Component/ExploratorSide";
import PasswordList from "./Component/PasswordList";
import Settings from "./Component/Settings";

function App() {

    const [ready, setReady] = useState(false);

    const [lang, setLang] = useState("en");
    const [wording, setWording] = useState({} as Worder);
    const [sEntryUID, setSEntryUID] = useState("-1");
    const [sFolder, setSFolder] = useState("-1");
    const [window, setWindow] = useState("main");
    const [unlock, setUnlock] = useState(false);


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

    function renderMainContent() {
        {
            const args = window.split('=')
            switch (args[0]) {
                case "settings":
                    return <Settings lang={lang} wording={wording} />

                case "rng-password":
                    return <RngPassword lang={lang} wording={wording} />

                case "entry":
                    return <Entry lang={lang} wording={wording} mod={args[1]} selectedUID={sEntryUID} />

                case "main":
                    return <>
                        <ExplortorSide lang={lang} wording={wording} sFolder={sFolder} setSFolder={setSFolder} />
                        <div>
                            <PasswordList lang={lang} wording={wording} sEntryUID={sEntryUID} setSEntryUID={setSEntryUID} />
                        </div>
                    </>;

                default:
                    return <></>;
            }
        }
    }

    return (
        <>
            {ready ? (
                !unlock ? (
                    <Login lang={lang} wording={wording} unlock={setUnlock} />
                ) : (<>
                    <NavBar lang={lang} wording={wording} window={window} setWindow={setWindow} unlock={setUnlock} />
                    <div id="main-content">
                        {renderMainContent()}
                    </div>
                </>)
            ) : <></>}
            {/* <button onClick={() => setLang("fr")}>fr</button>
                <button onClick={() => setLang("en")}>en</button></>  */}
        </>
    );
}

export default App;
