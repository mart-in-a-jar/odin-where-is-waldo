import level1_img from "./img/level1.jpg";
import ash_img from "./img/ash.webp";
import tom_img from "./img/tom.png";
import batman_img from "./img/batman.webp";
import waldo_img from "./img/waldo.png";
import spiderMan_img from "./img/spider-man.webp";

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
                found: true,
            },
            {
                id: "tom",
                name: "Tom Cat",
                image: tom_img,
                found: true,
            },
            {
                id: "batman",
                name: "Batman",
                image: batman_img,
                found: true,
            },
            {
                id: "waldo",
                name: "Waldo",
                image: waldo_img,
                found: true,
            },
            {
                id: "spider-man",
                name: "Spider-man",
                image: spiderMan_img,
                found: false,
            },
        ],
    },
];

export default levels;
