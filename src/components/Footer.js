import React from "react";
import Icon from "../assets/img/github.png"

export default function Footer() {
    return (
        <footer className="bg-secondary-800 border-t-2 border-blue-400 flex justify-center items-center text-primary-100">
            <p className="font-thin text-xs">Created by DragostinH</p>
            <a target="_blank" href="https://github.com/DragostinH" rel="noreferrer">
                <img className="h-4 w-4" src={Icon} alt="" />
            </a>
        </footer>
    );
}
