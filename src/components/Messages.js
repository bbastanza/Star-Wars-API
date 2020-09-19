import React, { useEffect, useState, memo } from "react";

function Messages({ pageNumber }) {
    const [loadingMessage, setLoadingMessage] = useState("I sense much fear in you");
    useEffect(() => {
        const messages = [
            "I find your lack of faith disturbing",
            "The Force will be with you. Always",
            "Do. Or do not. There is no try",
            "I sense much fear in you",
            "We must keep our faith in the Republic",
            "Chewie, we’re home",
            "I’m one with the Force. The Force is with me",
            "I am a Jedi, like my father before me",
            "When gone am I, the last of the Jedi will you be",
            "This ship that made the Kessel run in less than twelve parsecs",
        ];
        const i = Math.floor(Math.random() * messages.length);
        setLoadingMessage(messages[i]);
    }, [pageNumber]);

    return (
        <div>
            <button style={{ marginTop: 60, padding: 20, fontSize: 30 }} className="btn btn-warning">
                {loadingMessage}
                <span className="spinner-grow spinner-grow-sm"></span>
            </button>
        </div>
    );
}
export default memo(Messages);
