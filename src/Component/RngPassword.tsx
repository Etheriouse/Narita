import { Worder } from "../type";

interface Props {
    lang: string;
    wording: Worder;
}

function RngPassword({ lang, wording }: Props) {
    return <div>rngpassword {lang}</div>
}

export default RngPassword;