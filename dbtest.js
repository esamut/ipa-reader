chrome.runtime.sendMessage({
    action: "addPage",
    url: window.location.href
}, (response) => {
    console.log("Added:", response);
});

chrome.runtime.sendMessage({
    action: "printPages"
}, (lines) => {
    console.log("All pages:", lines);
});