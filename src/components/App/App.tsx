import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider, {
  ThemeContext,
} from "../../context/ThemeProvider/ThemeProvider";
import Videos from "../Videos/Videos";
import Channels from "../Channels/Channels";
import Sidebar from "../Sidebar/SideBar";
import PageNotFound from "../PageNotFound/PageNotFound";
import TopBar from "../TopBar/TopBar";
import BottomBar from "../BottomBar/BottomBar";
import "./App.css";
import useScrollUp from "../../hooks/ScrollUp/ScrollUp";
import ViewportProvider, { useViewport } from "../../hooks/Viewport/Viewport";

function App() {
  const [showMobile, setShowMobile] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { visible } = useScrollUp();
  const { width } = useViewport();
  useEffect(() => {
    if (width <= 548) setShowMobile(true);
    else setShowMobile(false);
  }, [width]);
  return (
    <ThemeProvider>
        <div className="App">
          <BrowserRouter>
            {showMobile && visible && <TopBar />}
            {!showMobile && <Sidebar />}
            {showMobile && <BottomBar />}
            <Routes>
              <Route path="/" element={<Videos />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
    </ThemeProvider>
  );
}

export default App;
