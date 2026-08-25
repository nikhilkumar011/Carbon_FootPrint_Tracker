import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FaLeaf } from "react-icons/fa6";
import { Button } from "./ui/button";
import { BarChart, Goal, History, House, Lightbulb, LogOut, Plus, User, User2 } from "lucide-react";
import LogoutButton from "./LogoutButton";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
       <div className="flex gap-4 p-2 items-center justify-center">
          <div>
              <FaLeaf className="text-4xl text-green-500" />
          </div>
          <h1 className="font-semibold">
              Carbon FootPrint Tracker
          </h1>
       </div>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
      <SidebarContent >
        <SidebarGroup>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                 <div className="flex gap-2 text-center justify-center">
                  <House/> Dashboard
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex gap-2 text-center justify-center">
                  <Plus/> Add Activity
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex gap-2 text-center justify-center">
                  <History/> History
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex gap-2 text-center justify-center">
                  <BarChart/> Reports
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

               <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex gap-2 text-center justify-center">
                  <Goal/> Goals
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

               <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex gap-2 text-center justify-center">
                  <Lightbulb/> Tips
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex gap-2 text-center justify-center">
                  <User/> Profile
                 </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex shadow-2xs gap-3 rounded-2xl w-[80%] m-auto bg-green-900/30 py-8 px-2 flex-col justify-center items-center mt-10">
          <img src="/earth.svg" alt="" className="h-25" />
          <div className="flex flex-col justify-center items-center">
             <h1 className="font-semibold text-sm ">Small Steps, Big Impacts</h1>
             <p className="text-sm font-light text-gray-500 text-center mt-3">
              Track today, Reduce tommorow,  create a better future
             </p>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
           <div className="flex gap-2 text-center justify-center">
                  <LogOut/> <LogoutButton/>
                 </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
    </Sidebar>
  );
}