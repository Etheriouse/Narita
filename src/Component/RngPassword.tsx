import { Worder } from "../type";
import { Repeat, NotepadText } from 'lucide-react'
import './css/RngPassword.css'
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    lang: string;
    wording: Worder;
    setPasswordResult: (s: string) => void;
    intoEntry: boolean;
}

function getExtAscii() {
    return "€¢£¥§¤©®¬±µ¶°¿¡«»×÷";
}

function RngPassword({ lang, wording, setPasswordResult, intoEntry }: Props) {

    const [useSpace, setUseSpace] = useState(false);
    const [useAmbigous, setUseAmbigous] = useState(true);
    const [useExtAscii, setUseExtAscii] = useState(false);
    const [useThis, setUseThis] = useState("");
    const [notUseThis, setNotUseThis] = useState("");

    const [Upper, setUpper] = useState(true);
    const [Lower, setLower] = useState(true);
    const [Num, setNum] = useState(true);
    const [Symbol, setSymbol] = useState(false);
    const [Punctu, setPunctu] = useState(false);
    const [Bracks, setBracks] = useState(false);
    const [Maths, setMaths] = useState(false);
    const [Quotes, setQuotes] = useState(false);
    const [L, setL] = useState(10);
    const [result, setResult] = useState("");
    const [reset, setReset] = useState(1);

    const R = 10000000;

    function merge(str: string, str2: string): string {
        [...str2].forEach(c => {
            if (!str.includes(c)) str += c;
        })
        return str;
    }

    function getPool() {
        var tmpPool = "";
        if (Upper) tmpPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (Lower) tmpPool += "abcdefghijklmnopqrstuvwxyz";
        if (Num) tmpPool += "0123456789";
        if (Symbol) tmpPool += "@#$^\&_";
        if (Punctu) tmpPool += "!?.,;:";
        if (Bracks) tmpPool += "()[]{}<>";
        if (Maths) tmpPool += "+-=/%*";
        if (Quotes) tmpPool += "'\"~`";
        return [...(merge(tmpPool, useThis) + (useSpace ? " " : "") + (useExtAscii ? getExtAscii() : ""))]
            .filter(c => useAmbigous || !"ilI1O0".includes(c)).filter(c => !notUseThis.includes(c)).join('');
    }

    function getShanonEntropy() {
        return -1;
    }

    function getPossibility() {
        return Math.pow(2, entropy);
    }

    function getTimeCracYears() {
        const s = getPossibility() / R;
        return s / 31556952;
    }

    function getTimeCracYearsR() {
        const s = getPossibility() / (R * 2);
        return s / 31556952;
    }

    const random = (max: number) => Math.floor(Math.random() * max);

    useEffect(() => {
        function setup() {
            const Pool = getPool();
            if (!Pool || Pool.length === 0) return;

            let tmp = "";
            for (let i = 0; i < L; i++) {
                tmp += Pool[random(Pool.length)];
            }

            setResult(tmp);
        }
        setup();

    }, [reset, Upper, Lower, Num, Symbol, Punctu, Bracks, Quotes, Maths, L, notUseThis, useThis, useSpace, useAmbigous, useExtAscii])

    useEffect(() => {
        if (!intoEntry) return;
        setPasswordResult(result);
    }, [result, intoEntry]);
    const entropy = useMemo(() => {
        const Pool = getPool();
        return result.length * Math.log2(Pool.length || 1);

    }, [result, Upper, Lower, Num, Symbol, Punctu, Bracks, Quotes, Maths, L, notUseThis, useThis, useSpace, useAmbigous, useExtAscii]);

    return <div id="rng-container-main" className={intoEntry ? "rng-container-main-into-entry" : ""}>
        <div id="result-generate">
            <div id="input-generate">
                <input value={result} onChange={e => setResult(e.target.value)}></input>
                <div onClick={_ => setReset(reset + 1)}>
                    <Repeat />
                </div>
                <div >
                    <NotepadText />
                </div>
            </div>
            <div id="stat-generatde">
                <div id="math-stat-generated">
                    <p>{`${wording[lang].entropy}: ${entropy.toFixed(4)}bits`}</p>
                    <p>{`${wording[lang].shanonEntropy}: ${getShanonEntropy().toFixed(4)}bits`}</p>
                    <p>{`${wording[lang].possiblity}: ${getPossibility().toExponential(4)}`}</p>
                    <p>{`${wording[lang].timecrackTheo}: ${getTimeCracYears().toExponential(4)} ${wording[lang].years} `}</p>
                    <p>{`${wording[lang].timecrackReel}: ${getTimeCracYearsR().toExponential(4)} ${wording[lang].years}`}</p>
                </div>
            </div>
        </div>
        <div id="setting-generate">
            <div className="length-control">
                <p>{wording[lang].lengthPassword}</p>
                <input
                    max={100}
                    type="range"
                    value={L}
                    onChange={e => setL(Number(e.target.value))}
                />

                <input
                    max={100}
                    type="number"
                    value={L}
                    onChange={e => setL(Number(e.target.value))}
                />
            </div>
            <div id="include-char-generate">
                <div className="type-char-generate">
                    <button onClick={_ => setUpper(!Upper)} className={Upper ? "active" : ""} >A-Z</button>
                    <button onClick={_ => setLower(!Lower)} className={Lower ? "active" : ""}>a-z</button>
                    <button onClick={_ => setNum(!Num)} className={Num ? "active" : ""}>0-9</button>
                    <button onClick={_ => setSymbol(!Symbol)} className={Symbol ? "active" : ""}>{"@ # $ ^ \ & _"}</button>
                </div>
                <div className="type-char-generate">
                    <button onClick={_ => setPunctu(!Punctu)} className={Punctu ? "active" : ""}>{`! ? . , ; :`}</button>
                    <button onClick={_ => setBracks(!Bracks)} className={Bracks ? "active" : ""}>{`( ) [ ] { } < >`}</button>
                    <button onClick={_ => setMaths(!Maths)} className={Maths ? "active" : ""}>{`+ - = / % *`}</button>
                    <button onClick={_ => setQuotes(!Quotes)} className={Quotes ? "active" : ""}>{`' " ~ \``}</button>
                </div>
            </div>
            <div id="setttings-include-char">
                <label>
                    <input onChange={e => setUseAmbigous(!e.target.checked)} className="checkbox-input" type="checkbox"></input>
                    <span>{wording[lang].ambigousCharSettings}</span>
                </label>
                <label>
                    <input onChange={e => setUseExtAscii(e.target.checked)} className="checkbox-input" type="checkbox"></input>
                    <span>{wording[lang].asciiExtendCharSettings}</span>
                </label>
                <label>
                    <input onChange={e => setUseSpace(e.target.checked)} className="checkbox-input" type="checkbox"></input>
                    <span>{wording[lang].spaceCharSettings}</span>
                </label>
                <label>
                    {wording[lang].donotinclude}
                    <input onChange={e => setNotUseThis(e.target.value)}></input>
                </label>
                <label>
                    {wording[lang].doinclude}
                    <input onChange={e => setUseThis(e.target.value)}></input>
                </label>
            </div>
        </div>
    </div>
}

export default RngPassword;