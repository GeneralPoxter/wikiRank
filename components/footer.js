import React from "react";

export default function Header() {
    const linkStyle = "underline text-[#89b4fa]";

    return (
        <div className='bg-[#181825] w-screen mt-[5%] text-[#cdd6f4] p-8 text-center'>
            made with 💜 by <a href="https://github.com/geant04" target="_blank" className={linkStyle}>Anthony Ge</a>, <a href="https://github.com/aczw" target="_blank" className={linkStyle}>Charles Wang</a>, <a href="https://github.com/GeneralPoxter/wikiRank" target="_blank" className={linkStyle}>Jason Liu</a>
        </div>
    );
}