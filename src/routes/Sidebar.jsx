import React from "react";
import { CDBSidebar } from 'cdbreact';


const Sidebar = () => {
  return (
    <CDBSidebar textColor="#333" backgroundColor="#f4f4f4">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        BABYCARE ™
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large" textFontSize="14px">
            Dashboard
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note" textFontSize="14px">
            Explore
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="credit-card"
            iconType="solid"
            textFontSize="14px"
          >
            Care Products
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem
            icon="gamepad"
            iconType="solid"
            textFontSize="14px"
          >
            Fun and Games
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
        <CDBSidebarMenu>
          <CDBSidebarSubMenu title="Store" icon="shopping-bag">
            <CDBSidebarMenuItem>Food </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>Clothes </CDBSidebarMenuItem>
            <CDBSidebarSubMenu title="Accessories">
              <CDBSidebarMenuItem>Fitbit</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>Cardio</CDBSidebarMenuItem>
              <CDBSidebarSubMenu title="Tickets">
                <CDBSidebarMenuItem>Counselling</CDBSidebarMenuItem>
                <CDBSidebarMenuItem>Postnatal</CDBSidebarMenuItem>
                <CDBSidebarMenuItem>Yoga</CDBSidebarMenuItem>
              </CDBSidebarSubMenu>
            </CDBSidebarSubMenu>
          </CDBSidebarSubMenu>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarCTA
        theme="overlay"
        image={<Image />}
        text="Sign up Pro Here"
      ></CDBSidebarCTA>
      <CDBSidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default Sidebar;
