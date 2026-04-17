import React from "react"

export interface BtnSidebarProps{
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    statusSidebar: boolean
}