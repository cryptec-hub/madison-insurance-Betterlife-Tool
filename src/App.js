import "./App.css";
import SelectComponent from "./components/selectComponent";
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
    <div className="App container my-24 mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
