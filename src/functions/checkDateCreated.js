const weeklyMilliseconds = 604800000;

function checkDateCreated() {
    const dateCreated = JSON.parse(localStorage.getItem("date-created"));
    const now = new Date().getTime();
    let timeDifference = now - dateCreated;
    if (timeDifference > weeklyMilliseconds) localStorage.clear();
}

export { checkDateCreated };
