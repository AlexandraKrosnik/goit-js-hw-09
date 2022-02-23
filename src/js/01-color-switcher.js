const ref = {
    buttonStart: document.querySelector("[data-start]"),
    buttonStop: document.querySelector("[data-stop]")
};
let disabled = false
const color = {
    indexInterval: null,
    start() {
        this.indexInterval = setInterval(() => {       
           
            document.body.style.backgroundColor = this.getRandomHexColor();

        }, 1000);
    },
    getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
    stop() {
        clearInterval(this.indexInterval);
    }
};


ref.buttonStart.addEventListener("click", (e) => {
    e.currentTarget.disabled = !disabled;
    
    color.start()
})
ref.buttonStop.addEventListener("click", () => {
    ref.buttonStart.disabled = disabled;
    
    color.stop()
})

