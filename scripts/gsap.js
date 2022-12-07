import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Icon amination
// Bron: https://www.youtube.com/watch?v=WEky7V490Rs&list=PLMPgoZdlPumexxtvuPUB3TY7LExI1N_Xp&ab_channel=TheCodeCreative
function addEvents(element) {
    // Don't see warnings
    // Bron: https://greensock.com/forums/topic/22836-gsap-3-warnings/
    gsap.config({nullTargetWarn:false});

    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(".bts-icon", 
        {
            opacity: 0,
        },
        {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: ".bts-icon"
        }
    );
    gsap.fromTo(".hs-icon", 
        {
            opacity: 0,
        },
        {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: ".hs-icon"
        }
    );
};

export {
    addEvents
}