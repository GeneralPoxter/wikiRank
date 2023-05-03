import React from "react";

export default function Output({ content }) {
    const swag = content?.map((item, i) => {
        return (
            <div className="mb-2 text-left">
                <p>{i + 1}: {item}</p>
            </div>
        );
    });

    console.log(swag);

    return (
        <div className="mt-10 bottom-[100px] ml-[20%] mr-[20%] rounded-xl bg-slate-300 p-2 bg-opacity-90">
            <div className="mb-2 mt-2">
                <h className="text-3xl text-bold">Here are your top results man</h>
            </div>
            <div className=" bg-white ml-[5%] mr-[5%] text-[140%] mb-10 p-4 bg-opacity-90">
                <div className="ml-auto mr-auto flex items-center flex-col">
                    {swag}
                </div>
            </div>
        </div>
    )
}