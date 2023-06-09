import "./App.css";
import SelectComponent from "./components/SelectComponent";
import {
  inPatient,
  outPatient,
  Dental,
  Maternity,
  Optical,
  Members,
} from "../src/xlsx/data";

function App() {
  return (
    <div className="App container my-8 md:my-24 mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-4">
        <img
          src="Madison-Insurance-Company-Kenya.png"
          alt="Company Logo"
          className="w-40 h-45"
        />
      </div>
      <SelectComponent
        inPatient={inPatient}
        outPatient={outPatient}
        dental={Dental}
        optical={Optical}
        maternity={Maternity}
        Members={Members}
      />
    </div>
  );
}

export default App;
