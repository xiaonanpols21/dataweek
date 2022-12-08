import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Don't see warnings
// Bron: https://greensock.com/forums/topic/22836-gsap-3-warnings/
gsap.config({nullTargetWarn:false});

gsap.registerPlugin(ScrollTrigger);

const animation = gsap.timeline();

// Icon amination
// Bron: https://www.youtube.com/watch?v=WEky7V490Rs&list=PLMPgoZdlPumexxtvuPUB3TY7LExI1N_Xp&ab_channel=TheCodeCreative
function iconAnimate(element) {
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

// Tracks
function trackAnimate(element) {
    // Tracks
    gsap.fromTo("#galBts article", 
    {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.7,
        stagger: 0.7,
        scrollTrigger: "#galBts article"
    }
    );

    gsap.fromTo("#galHs article", 
    {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.7,
        stagger: 0.7,
        scrollTrigger: "#galHs article"
    }
    );
    // Het is dubble omdat het dan tegelijkertijd wordt afgespeeld
};

// Header
animation
    .fromTo(".img-artist", 
        {
            scale: 0,
            opacity: 0,
            rotation: 360
        }, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5
        }
    )
    .fromTo(".xn", 
        {
            y: -140
        }, {
            y: 0,
            duration: 0.5
        }
    )
    .fromTo(".ms", 
        {
            x: 300
        }, {
            x: 0,
            duration: 0.5
        }
    )
;

gsap.fromTo(".bts-txt p", 
    {
        y: -50,
        opacity: 0

    }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.5
    }
);

gsap.fromTo(".hs-txt p", 
    {
        y: -50,
        opacity: 0

    }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.5
    }
);

export {
    iconAnimate,
    trackAnimate
}