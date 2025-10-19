document.addEventListener('mouseup', function() {
    const highlightedText = window.getSelection().toString().trim();
    if (highlightedText.length > 0) {
        console.log(highlightedText);
    }
});