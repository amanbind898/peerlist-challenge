import React from "react";
import Image from "next/image";
export default function Ctp() {
    return(
        <div className="h-screen bg-blue-800 flex justify-center items-center mt-5">

            <div className="w-60 h-60 bg-white rounded-lg">
                <Image src='/peerlist-challenge-accepted.png' alt="image" width={240} height={240} className="rounded-lg"/>
            </div>
        </div>
    )

}
