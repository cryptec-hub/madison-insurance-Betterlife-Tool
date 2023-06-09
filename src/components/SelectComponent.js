import React from "react";
import Select from "react-select";
import { useState } from "react";
// import { extractValues } from "../ExtractValues";
import IntersectionValueComponent from "../xlsx/IntersectionValue";
import { Age } from "../xlsx/data";
// import ReadData from "../xlsx/readData";

export default function SelectComponent({
  inPatient,
  outPatient,
  dental,
  maternity,
  optical,
  Members,
}) {
  const [inPatientValue, setInPatientValue] = useState({
    value: 5000000,
    label: "5,000,000",
  });
  const [numberOfMembers, setNumberOfMembers] = useState({
    value: "M",
    label: "M",
  });
  const [ageValue, setAgeValue] = useState({
    value: "Above18",
    label: "18-50 Yrs",
  });
  const [outPatientValue, setOutPatientValue] = useState({
    value: 250000,
    label: "250,000",
  });
  const [dentalValue, setDentalValue] = useState({
    value: 50000,
    label: "50,000",
  });
  const [opticalValue, setOpticalValue] = useState({
    value: 50000,
    label: "50,000",
  });
  const [maternityValue, setMaternityValue] = useState({
    value: 200000,
    label: "200,000",
  });

  // const [inPatientAmount, setInPatientAmount] = useState(0);

  const [outPatientSelected, setOutPatientSelected] = useState(false);
  const [dentalSelected, setDentalSelected] = useState(false);
  const [opticalSelected, setOpticalSelected] = useState(false);
  const [maternitySelected, setMaternitySelected] = useState(false);
  const [inPatientAgeValue, setInPatientAgeValue] = useState(0);
  const [outPatientAgeValue, setOutPatientAgeValue] = useState(2);

  const handleInPatientChange = (selectedOption) => {
    setInPatientValue(selectedOption);
  };

  const handleNumberOfMembers = (selectedOption) => {
    setNumberOfMembers(selectedOption);
  };
  const handleAgeValue = (selectedOption) => {
    setAgeValue(selectedOption);
    if (ageValue.value === "Above18") {
      setInPatientAgeValue(1);
      setOutPatientAgeValue(3);
    } else {
      setInPatientAgeValue(0);
      setOutPatientAgeValue(2);
    }
  };

  const handleOutPatientChange = (selectedOption) => {
    setOutPatientValue(selectedOption);
  };

  const handleDentalChange = (selectedOption) => {
    setDentalValue(selectedOption);
  };

  const handleOpticalChange = (selectedOption) => {
    setOpticalValue(selectedOption);
  };

  const handleMaternityChange = (selectedOption) => {
    setMaternityValue(selectedOption);
  };

  const handleOutPatientCheckboxChange = (event) => {
    setOutPatientSelected(event.target.checked);
  };

  const handleDentalCheckboxChange = (event) => {
    setDentalSelected(event.target.checked);
  };

  const handleOpticalCheckboxChange = (event) => {
    setOpticalSelected(event.target.checked);
  };

  const handleMaternityCheckboxChange = (event) => {
    setMaternitySelected(event.target.checked);
  };

  const getSelectedValue = (selectedValue, isSelected) => {
    return isSelected ? selectedValue?.value || 0 : 0;
  };

  const outPatientFinalValue = getSelectedValue(
    outPatientValue,
    outPatientSelected
  );
  const dentalFinalValue = getSelectedValue(dentalValue, dentalSelected);
  const maternityFinalValue = getSelectedValue(
    maternityValue,
    maternitySelected
  );
  const opticalFinalValue = getSelectedValue(opticalValue, opticalSelected);

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-14 w-1/4 text-lg">Number of Members</h1>
        <div className="w-full flex items-center  space-x-2">
          <Select
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            options={Members}
            value={numberOfMembers}
            onChange={handleNumberOfMembers}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-14 w-1/4 text-lg">Principal Member Age</h1>
        <div className="w-full flex items-center  space-x-2">
          <Select
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            options={Age}
            value={ageValue}
            onChange={handleAgeValue}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-2 w-1/4 text-lg">Inpatient</h1>
        <div className="w-full flex items-center  space-x-2">
          <Select
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            options={inPatient}
            value={inPatientValue}
            onChange={handleInPatientChange}
          />
        </div>

        <div className="w-28 mr-20">
          <div className="border border-gray-300 rounded-md p-2">
            <IntersectionValueComponent
              limitValue={inPatientValue.value}
              colValue={numberOfMembers.value}
              sheetNumber={inPatientAgeValue}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-2 w-1/4 text-lg">Outpatient</h1>
        <div className="w-full flex items-center  space-x-2">
          <input
            type="checkbox"
            onChange={handleOutPatientCheckboxChange}
            checked={outPatientSelected}
          />
          <Select
            className="w-full py-2 px-3 border justify-end border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            options={outPatient}
            value={outPatientValue}
            onChange={handleOutPatientChange}
          />
        </div>
        <div className="w-28 mr-20">
          <div className="border border-gray-300 rounded-md p-2">
            <IntersectionValueComponent
              limitValue={outPatientFinalValue}
              colValue={numberOfMembers.value}
              sheetNumber={outPatientAgeValue}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-2 w-1/4 text-lg">Dental</h1>
        <div className="w-full flex items-center  space-x-2">
          <input
            type="checkbox"
            onChange={handleDentalCheckboxChange}
            checked={dentalSelected}
          />
          <Select
            options={dental}
            value={dentalValue}
            onChange={handleDentalChange}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-28 mr-20">
          <div className="border border-gray-300 rounded-md p-2">
            <IntersectionValueComponent
              limitValue={dentalFinalValue}
              colValue={numberOfMembers.value}
              sheetNumber={4}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-2  w-1/4 text-lg">Optical</h1>
        <div className="w-full flex items-center  space-x-2">
          <input
            type="checkbox"
            onChange={handleOpticalCheckboxChange}
            checked={opticalSelected}
          />
          <Select
            options={optical}
            value={opticalValue}
            onChange={handleOpticalChange}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-28 mr-20">
          <div className="border border-gray-300 rounded-md p-2">
            <IntersectionValueComponent
              limitValue={opticalFinalValue}
              colValue={numberOfMembers.value}
              sheetNumber={4}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center space-x-2 pt-8">
        <h1 className="mr-2 w-1/4 text-lg">Maternity</h1>
        <div className="w-full flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={handleMaternityCheckboxChange}
            checked={maternitySelected}
          />
          <Select
            options={maternity}
            value={maternityValue}
            onChange={handleMaternityChange}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-28 mr-20">
          <div className="border border-gray-300 rounded-md p-2">
            <IntersectionValueComponent
              limitValue={maternityFinalValue}
              colValue={"Premiums"}
              sheetNumber={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
