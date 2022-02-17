import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Videos from "./components/Videos/Videos";
import Channels from "./components/Channels/Channels";
import Sidebar from "./components/Sidebar/SideBar";

class App extends React.Component {

  state = { theme: "light" };

  toggleTheme = () => {
    this.state.theme === "light"
      ? this.setState({ theme: "dark" })
      : this.setState({ theme: "light" });
    this.renderBody();
  }

  renderBody(){
    if(this.state.theme === 'light'){
      document.body.style.backgroundColor = "#0D0D0D";
    } else {
      document.body.style.backgroundColor = "#ffffff";
    }
  }

  componentDidMount() {
    this.toggleTheme();
    this.renderBody();
  }

  render() {
    const {theme} = this.state;
    return (
      <div className="App" data-theme={theme}>
        <BrowserRouter>
          <Sidebar theme={theme} toggleTheme={this.toggleTheme} />
          <Routes>
            <Route exact path="/" element={<Videos theme={theme} toggleTheme={this.toggleTheme} />} />
            <Route exact path="channels" element={<Channels theme={theme} toggleTheme={this.toggleTheme}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
