import { Outlet } from "react-router-dom";
import Header from "../components/webiste/Header";

function WebsiteLayout() {
  return (
    <div className="bg-light">
      <Header></Header>
      <main className="">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default WebsiteLayout;
