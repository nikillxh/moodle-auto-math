// content.js - Fully Automatic Version

function autoSolve() {
    // 1. Find the input
    const input = document.getElementById('valuepkg3');
    
    // If input isn't there, or if we already solved it (marked as 'done'), stop.
    if (!input || input.dataset.autoSolved === "true") return;

    // 2. Find the text context
    let node = input.previousSibling;
    while (node && (node.nodeType !== 3 || !node.nodeValue.trim())) {
        node = node.previousSibling;
    }

    // If text isn't loaded yet, stop and wait for next check
    if (!node) return;

    // 3. Clean the text (The Logic)
    const cleanText = node.nodeValue.replace(/[\n\r]/g, " ").replace(/\s+/g, " ").trim();
    
    let result = null;

    // Subtraction
    const sub = cleanText.match(/subtract\s+(\d+)\s*-\s*(\d+)/i);
    if (sub) result = parseInt(sub[1]) - parseInt(sub[2]);

    // Addition
    const add = cleanText.match(/add\s+(\d+)\s*\+\s*(\d+)/i);
    if (add) result = parseInt(add[1]) + parseInt(add[2]);

    // Selection
    const sel = cleanText.match(/(first|second)\s+value\s+(\d+)\s*,\s*(\d+)/i);
    if (sel) {
        const isFirst = sel[1].toLowerCase() === 'first';
        result = isFirst ? parseInt(sel[2]) : parseInt(sel[3]);
    }

    // 4. Fill and Mark as Done
    if (result !== null) {
        input.value = result;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // Mark the input so we don't keep solving it 100 times a second
        input.dataset.autoSolved = "true";
        
        // Optional: Visual confirmation (Green Border)
        input.style.border = "2px solid #28a745";
        input.style.backgroundColor = "#e8f0fe";
        
        console.log("Auto-filled:", result);
    }
}

// --- THE ENGINE ---
// Run the 'autoSolve' function every 500 milliseconds (half a second)
setInterval(autoSolve, 100);