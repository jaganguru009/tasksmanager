import "./App.css";
import Heading from "./components/Heading";

function App() {
  return (
    <div className="flex min-h-screen items-center bg-gray-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <div id="container" className="flex min-h-screen items-center">
          <Heading />
        </div>
      </div>
    </div>
  );
}

export default App;
