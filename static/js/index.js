function init() {
    document.addEventListener("DOMContentLoaded", () => {
        const sections = document.querySelectorAll(".about-section");

        sections.forEach((section) => {
            section.addEventListener("click", () => {
                document.querySelectorAll(".about-section").forEach((sec) => {
                    sec.classList.remove("text-green", "font-bold");
                });

                document.querySelectorAll(".about-radio").forEach((radio) => {
                    radio.classList.remove("bg-green", "border-0");
                    radio.classList.add("border-[2px]", "border-purple"); 
                });

                section.classList.add("text-green", "font-bold");
                section.classList.remove("font-medium");

                const radio = section.previousElementSibling;
                if (radio) {
                    radio.classList.add("bg-green", "border-0");
                    radio.classList.remove("border-[2px]", "border-purple");
                }
            });
        });
    });
}


init()