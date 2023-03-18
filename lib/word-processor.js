class wordmachine {
    constructor() {
        this.temp = 0;
    }

    printCharacter(char) {
        var span = document.createElement("span");
        span.textContent = char;
        
        let CJK = char.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u3131-\uD79D]/);
    
        if (Math.random() <= this.temp) {
            span.style.fontFamily = availableFonts[availableFonts.length * Math.random() | 0];
        }
        span.className = "monospace";
        if (CJK) span.classList.add("cjk");
        if (this.temp < 1) this.temp += .00005;
        
        return span;
    }
    
    printLineBreak() {
        var br = document.createElement("br");
        
        return br;
    }
        
    printCaret() {
        let caret = document.createElement("span");
        caret.className = "caret";
        caret.textContent = "<";
        return caret;
    }
    
    update(output) {
        var text = INPUT.value;
        var chars = text.split("");
        
        let s1 = INPUT.selectionStart;
        let s2 = INPUT.selectionEnd;
        
        let caret;
        if (output==OUTPUT) caret = this.printCaret();

        if (caret && s2==-1) output.appendChild(caret);
        
        for (let i=0; i<chars.length; i++) {
            let ch = chars[i];
            let el;
            switch (ch) {
                case "\n":
                    el = this.printLineBreak();
                    break;
                default:
                    el = this.printCharacter(ch);
                    break;
            }
            
            el.dataset.id = i;
            output.appendChild(el);
            
            if (i >= s1 && i <= s2) el.classList.add("selected");
            if (caret && i==s2) {
                if (ch=="\n") {
                    output.insertBefore(caret, el);
                } else {
                    if (ch==" ") {
                        el.remove();
                        output.appendChild(caret);
                    } else {
                        el.classList.add("careted");
                    }
                }
                caret = null;
            }
        }
        
        if (caret && !caret.parentNode) output.appendChild(caret);
    }
}