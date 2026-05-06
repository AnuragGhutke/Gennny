import { useParams } from "react-router-dom"
import { SideBar } from "../components/SideBar"
import { GenImg } from "../ToolsPgs/GenImg"
import { GenThumb } from "../ToolsPgs/GenThumb"
import { GenVdo } from "../ToolsPgs/GenVdo"
import { Dashboard } from "../ToolsPgs/Dashboard"
import { Community } from "../ToolsPgs/Community"
import { LogoName } from "../components/LogoName"

export const Tools = () => {

    const { tool } = useParams<string>()

    const renderTool = () => {
        switch (tool) {
            case 'gen-image': return <GenImg />
            case 'gen-thumbnail': return <GenThumb />
            case 'gen-video': return <GenVdo />
            case 'dashboard': return <Dashboard />
            case 'community': return <Community />
            default: return <GenImg />
        }
    }

    return (
        <div className="w-full h-screen ">

            <div className="w-full flex items-center justify-center  fixed top-0 bg-[rgba(65,0,155,0.43)] backdrop-blur ">
               <LogoName/>
            </div>

            <SideBar />

            <div className="lg:flex-1 p-10 mt-16 lg:mt-12">
                {renderTool()}
            </div>
        </div>
    )
}