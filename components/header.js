import React from "react";

export default function Header() {
    const buttonStyle = "bg-[#b4befe] mx-[0.4em] px-[2em] py-[0.5em] rounded-xl text-[#181825] transition duration-300 ease-in-out hover:bg-[#929de7]";

    return (
        <div className='bg-[#181825] w-screen mb-[5%] text-[#cdd6f4] p-8'>
            <h1 className='flex justify-center font-bold text-[5em]'>wikiRank</h1>
            <p className="flex justify-center italic">quickly parse any complicated document for easy answers</p>
            <div className="flex justify-center mt-[2em]">
                <a href="/"><button className={buttonStyle}>Home</button></a>
                <a href="/about"><button className={buttonStyle}>About</button></a>
            </div>
        </div>
    );
}