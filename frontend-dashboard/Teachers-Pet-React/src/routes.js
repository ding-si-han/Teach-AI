// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Showchart from "@material-ui/icons/ShowChart";
import LiveTv from "@material-ui/icons/LiveTv";
import People from "@material-ui/icons/People";
import Assessment from "@material-ui/icons/Assessment";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LiveClassroom from "views/LiveClassroom/LiveClassroom.jsx";
import Watchlist from "views/Watchlist/Watchlist.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Realtime from "views/RealTime/Realtime.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import StudentList from "views/Students/StudentList.jsx"
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";
import halftimeReport from "./views/Halftime/halftimeReport";

const dashboardRoutes = [
  {
    path: "/liveclassroom",
    name: "Live Classroom",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LiveTv,
    component: LiveClassroom,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  // {
  //   path: "/realtime",
  //   name: "Real-Time Engagement",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Showchart,
  //   component: Realtime,
  //   layout: "/admin"
  // },
  {
    path: "/halftimereport",
    name: "Halftime Report",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "speaker_notes",
    component: halftimeReport,
    layout: "/admin"
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Watchlist,
    layout: "/admin"
  },
  {
    path: "/students",
    name: "Students",
    rtlName: "طباعة",
    icon: People,
    component: StudentList,
    layout: "/admin"
  },
  {
    path: "/review",
    name: "Reviews",
    rtlName: "الرموز",
    icon: Assessment,
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
