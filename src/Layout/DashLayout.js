// components/Layout.js
import React, { useState } from "react"
import Sidebar from "./../components/Sidebar"
import NavBar from "@/components/NavBar"

const DashLayout = ({ children }) => {
    const [isOpened, setIsOpen] = useState(false)
    return (
        <div className="flex h-screen">
            <Sidebar setIsOpen={setIsOpen} isOpen={isOpened} />
            <div className="flex flex-col flex-1">
                {/* <NavBar setIsOpen={setIsOpen} /> */}
                <div className="p-20 overflow-y-auto">{children}</div>
            </div>
        </div>
    )
}

export default DashLayout
