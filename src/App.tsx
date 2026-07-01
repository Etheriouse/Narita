import { useEffect, useRef, useState } from "react";
import { Entry as _Entry, invoke, Stat, uid_root } from "./invoke";
import "./App.css";
import { Worder } from "./type";
import Login from "./Component/Login";
import RngPassword from "./Component/RngPassword";
import Entry from "./Component/Entry";
import NavBar from "./Component/NavBar";
import ExplortorSide from "./Component/ExploratorSide";
import PasswordList from "./Component/PasswordList";
import Settings from "./Component/Settings";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";


function App() {

    const [ready, setReady] = useState(false);

    const [lang, setLang] = useState("fr");
    const [wording, setWording] = useState({} as Worder);
    const [sEntryUID, setSEntryUID] = useState("-1");
    const [sFolder, setSFolder] = useState(uid_root);
    const [_window, setWindow] = useState("main");
    const [unlock, setUnlock] = useState(true);
    const [entrys, setEntrys] = useState([] as Array<_Entry>);
    const [rngPassword, setRngPassword] = useState("");

    const [stat, setStat] = useState({
        width_separator: 0.8 * window.innerWidth
    } as Stat);
    const separatorDiv = useRef<HTMLDivElement>(null);
    const resizing = useRef(false);
    const good = useRef(false);

    function onMouseDown(e: MouseEvent) {
        resizing.current = true;
        good.current = (!!(e.target as HTMLElement).closest(".separator"));
    }

    function onMouseUp() {
        resizing.current = false;
        good.current = false;
    }

    function onMouseMove(e: MouseEvent) {
        if (!resizing.current) return;
        if (!good.current) return;
        //stat.width_separator = Math.max(window.innerWidth*0.1, Math.min(window.innerWidth - e.clientX-15-15, window.innerWidth*0.9));
        setStat({
            ...stat,
            width_separator: Math.max(window.innerWidth * 0.1, Math.min(window.innerWidth - e.clientX - 15 - 15, window.innerWidth * 0.9))
        });
    }

    useEffect(() => {
        async function __setup() {
            setLang(await invoke("get_selected_lang"));
            setWording(await invoke("wording"));
            console.log("info: wording loaded");
            window.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setWindow("main");
                    console.log("Escape pressé");
                }
            });
            setStat(await invoke("load_stat"));
            setStat({
                ...stat,
                width_separator: Math.max(window.innerWidth * 0.1, Math.min(stat.width_separator, window.innerWidth * 0.9))
            })
            window.addEventListener("resize", () => {
                setStat({
                    ...stat,
                    width_separator: Math.max(window.innerWidth * 0.1, Math.min(stat.width_separator, window.innerWidth * 0.9))
                })
            })
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("mousedown", onMouseDown);
        }


        __setup().then(() => {
            setReady(true);
            console.log("info: app ready");
        })

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousedown", onMouseDown);
            invoke("save_stat", stat);
        }
    }, [])

    function renderMainContent() {
        {
            const args = _window.split('=')
            switch (args[0]) {
                case "settings":
                    return <Settings lang={lang} wording={wording} setLang={setLang} />

                case "rng-password":
                    return <RngPassword lang={lang} wording={wording} setPasswordResult={setRngPassword} intoEntry={false}/>

                case "entry":
                    return <Entry lang={lang} wording={wording} mod={args[1]} selectedUID={sEntryUID} sFolder={sFolder} setWindow={setWindow} setSelectedUID={setSEntryUID} />

                case "main":
                    return <>
                        <ExplortorSide lang={lang} wording={wording} sFolder={sFolder} setSFolder={setSFolder} />
                        <div ref={separatorDiv} className="separator"><div></div></div>
                        <PasswordList lang={lang} wording={wording} sEntryUID={sEntryUID} setSEntryUID={setSEntryUID} sFolder={sFolder} entrys={entrys} setEntrys={setEntrys} stat={stat} setWindow={setWindow} />
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
                    <NavBar lang={lang} wording={wording} setWindow={setWindow} unlock={setUnlock} entrys={entrys} sFolder={sFolder} sEntry={sEntryUID} setSEntryUID={setSEntryUID} />
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
