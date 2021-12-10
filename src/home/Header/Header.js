import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
// import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import "./Header.css";
// import NotificationPanel from "../../home/Notification/NotificationPanel";
import { logout } from "../../login/actions/auth";

// import EventNotes from "../../event/notes";
import axios from "axios";
// import logo from "../../../assets/smartenovations.png";
import { InputText } from "primereact/inputtext";

function Header({ logout, isAuthenticated, user }) {
  const history = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [showEventNotes, setShowEventNotes] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/profile/${user.id}`)
        .then((res) => setProfileImage(res.data.avatar))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const items = isAuthenticated
    ? [
        {
          label: "Customer",
          items: [
            {
              label: "Customers",
              icon: "pi pi-fw pi-user",
              command: () => history.push("/customer"),
            },
            {
              label: "Additional Contact",
              icon: "pi pi-fw pi-id-card",
              command: () => history.push("/customer/contacts"),
            },
          ],
        },
        {
          label: "Event",
          items: [
            {
              label: "Events",
              icon: "pi pi-fw pi-calendar",
              command: () => history.push("/event"),
            },
            {
              label: "Plan Ahead",
              icon: "pi pi-fw pi-calendar-plus",
              command: () => history.push("/event/plan-ahead"),
            },
            {
              label: "Calendar View",
              icon: "pi pi-fw pi-calendar-times",
              command: () => history.push("/event/calendar"),
            },
          ],
        },
        {
          label: "Inquiries",
          command: () => history.push("/inquiry"),
        },
        {
          label: "Customer PO",
          command: () => history.push("/customerpo"),
        },
        {
          label: "Report",
          items: [
            {
              label: "Reports",
              icon: "pi pi-fw pi-chart-line",
              command: () => history.push("/report"),
            },
            {
              label: "Export",
              icon: "pi pi-fw pi-file-excel",
              command: () => history.push("/report/generate"),
            },
          ],
        },
        {
          template: (item, options) => {
            return (
              <Button
                type="button"
                onClick={() => setShowEventNotes(true)}
                icon="pi pi-fw pi-book"
                className="p-button-rounded p-button-text"
                style={{ color: "white" }}
                tooltipOptions={{ position: "bottom" }}
                tooltip="Notes & Reminders"
              />
            );
          },
        },
        {
          template: (item, options) => {
            return (
              <Button
                type="button"
                onClick={() => setShowNotification((s) => !s)}
                icon="pi pi-fw pi-bell"
                className="p-button-rounded p-button-text"
                style={{ color: "white" }}
                tooltipOptions={{ position: "bottom" }}
                tooltip="Notifications"
              />
            );
          },
        },
        {
        //   label: profileImage ? (
        //     <Avatar image={profileImage} shape="circle" />
        //   ) : (
        //     <Avatar
        //       icon="pi pi-user"
        //       style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
        //       shape="circle"
        //     />
        //   ),
          items: [
            {
              label: "Profile",
              icon: "pi pi-user",
              command: () => history.push("/profile"),
            },
            {
              label: "Change Password",
              icon: "pi pi-key",
              command: () => history.push("/change_password"),
            },
            {
              label: "Log Out",
              icon: "pi pi-power-off",
              command: () => logout(),
            },
          ],
        },
      ]
    : // not authenticated show only forgot password link
      [
        {
          label: "Forgot Password",
          command: () => history.push("/reset-password"),
        },
      ];

  const start = (
    <>
      <img
        alt="logo"
        // src={logo}
        height="40"
        id="header-logo"
        className="p-mr-2"
      ></img>
      <Link className="nav-bar-link" to="/">
        SMART CRM
      </Link>
    </>
  );

  const tempMethod = async (e) => {
    if (e.key === "Enter") {
      history.push(`/search?q=${term}`);
      setTerm("");
    }
  };

  const end = (
    <InputText
      placeholder="search"
      onKeyDown={(e) => tempMethod(e)}
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      className="search-box"
    />
  );

  return (
    <div className="nav-bar">
      <Menubar model={items} start={start} end={isAuthenticated && end} />
      {/* <NotificationPanel
        show={showNotification}
        onClose={() => setShowNotification(false)}
      /> */}
      {/* <EventNotes
        visible={showEventNotes}
        onHide={() => setShowEventNotes(false)}
      /> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Header);
