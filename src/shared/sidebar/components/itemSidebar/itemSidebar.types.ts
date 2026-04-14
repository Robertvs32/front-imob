import React from "react"

// DECLARACAO DA INTERFACE PARA AS PROPS DO ITEMSIDEBAR ----------------
export interface PropsItemSidebar{
    statusSidebar: boolean, 
    icon: string
    alt: string
    title: string
    selected: string
    setter: React.Dispatch<React.SetStateAction<string>>
    path: string
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
// ---------------------------------------------------------------------