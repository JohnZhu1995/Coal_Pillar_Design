import logo from "./logo.svg";
import "./App.css";
import DxfViewer from "./dxfViewer/dxfViewer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <DxfViewer />
            </header>
        </div>
    );
}

export default App;
