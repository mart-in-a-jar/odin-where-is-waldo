import level1_img from "./img/level1.jpg";
import level2_img from "./img/level2.jpg";
import ash_img from "./img/ash.webp";
import tom_img from "./img/tom.png";
import batman_img from "./img/batman.webp";
import waldo_img from "./img/waldo.png";
import spiderMan_img from "./img/spider-man.webp";
import groot_img from "./img/groot.webp";
import kratos_img from "./img/kratos.webp";
import johnny_bravo_img from "./img/johhny_bravo.webp";
import crash_img from "./img/crash.png";
import bart_img from "./img/bart.webp";

const levels = [
    {
        id: "level1",
        name: "Level 1",
        image: level1_img,
        characters: [
            {
                id: "ash",
                name: "Ash Ketchum",
                image: ash_img,
                found: false,
            },
            {
                id: "tom",
                name: "Tom Cat",
                image: tom_img,
                found: false,
            },
            {
                id: "batman",
                name: "Batman",
                image: batman_img,
                found: false,
            },
            {
                id: "waldo",
                name: "Waldo",
                image: waldo_img,
                found: false,
            },
            {
                id: "spider-man",
                name: "Spider-man",
                image: spiderMan_img,
                found: false,
            },
        ],
    },
    {
        id: "level2",
        name: "Level 2",
        image: level2_img,
        characters: [
            { id: "groot", name: "Groot", image: groot_img, found: false },
            { id: "kratos", name: "Kratos", image: kratos_img, found: false },
            {
                id: "johnny_bravo",
                name: "Johnny Bravo",
                image: johnny_bravo_img,
                found: false,
            },
            {
                id: "crash",
                name: "Crash Bandicoot",
                image: crash_img,
                found: false,
            },
            { id: "bart", name: "Bart Simpson", image: bart_img, found: false },
        ],
    },
];

export default levels;
