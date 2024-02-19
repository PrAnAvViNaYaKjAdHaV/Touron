import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { firedb } from "../../../firebase";
import "./BookingDRecord.css";
// import ReactExport from 'react-export-excel';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCZ2bo_iPbtvarsADQe84qX2s9cWPMq3U",
  authDomain: "touronapp-248e4.firebaseapp.com",
  databaseURL: "https://touronapp-248e4.firebaseio.com",
  projectId: "touronapp-248e4",
  storageBucket: "touronapp-248e4.appspot.com",
  messagingSenderId: "813320271971",
  appId: "1:813320271971:web:5a10483e3c11bc953aa056",
  measurementId: "G-KCPSW6WFC9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

const BookingDRecord = () => {
  const isMounted = useRef(false);
  const [finalLogs, setFinalLogs] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Aprl",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getRecord = () => {
    let log = [];
    const bookingDetailsRef = ref(firedb, "bookingdetails1");

    onValue(bookingDetailsRef, (snapshot) => {
      if (isMounted.current) {
        snapshot.forEach((d) => {
          if (d.val().paymentDetails.amountDetails) {
            d.val().paymentDetails.amountDetails.forEach((final) => {
              if (
                year === moment(final.date).format("YYYY") &&
                month === moment(final.date).month()
              ) {
                log.push({
                  date: final.date,
                  surveyId: d.val().surveyId,
                  customerName: d.val().general.customerName,
                  particulars: final.particulars,
                  recievedType: final.recievedType,
                  recievedAmount: final.recievedAmount,
                  spentAmount: final.spentAmount,
                  remark: final.remark,
                });
              }
            });
          }
        });
        // ... rest of your code
        let sortLog = log.sort(
          (a, b) =>
            parseInt(a.date.slice(8, 10)) - parseInt(b.date.slice(8, 10))
        );
        setFinalLogs(sortLog);
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getRecord();
    return () => (isMounted.current = false);
  }, [year, month]);

  return (
    <div className="BookingDRecord___Main ml-16 sm:ml-52 lg:ml-80 px-10 py-10 flex flex-col gap-5">
      <div className=" flex items-center gap-5">
        <label className=" text-xl font-semibold text-stone-500">Year: </label>
        <input
          className=" border border-stone-500 px-4 py-1 rounded-md focus:outline-none"
          type="text"
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className=" flex items-center gap-5">
        <label className=" text-xl font-semibold text-stone-500">Month: </label>
        <div className=" flex flex-wrap">
          {months.map((m, i) => {
            return (
              <div
                key={i}
                className={
                  month === i
                    ? " bg-primary rounded-md px-4 py-2 text-white mr-2 cursor-pointer"
                    : " border border-stone-300 bg-white rounded-md px-4 py-2 text-primary mr-2 cursor-pointer"
                }
                onClick={() => setMonth(i)}
              >
                {m}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {/* <ExcelFile
          element={
            <button className='BookingDRecord___Main__Excel_Btn'>
              Export to Excel
            </button>
          }>
          <ExcelSheet data={finalLogs} name='finalLogs'>
            <ExcelColumn label='Date' value='date' />
            <ExcelColumn label='Survey Id' value='surveyId' />
            <ExcelColumn label='Customer Name' value='customerName' />
            <ExcelColumn label='Particulars' value='particulars' />
            <ExcelColumn label='Received Type' value='recievedType' />
            <ExcelColumn label='Received Amount' value='recievedAmount' />
            <ExcelColumn label='Spent Amount' value='spentAmount' />
            <ExcelColumn label='Remark' value='remark' />
          </ExcelSheet>
        </ExcelFile> */}
      </div>
      <div className=" overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-2xl ">
          <thead className=" border-b bg-stone-50 border-b-stone-300 text-stone-800 ">
            <tr className=" py-2">
              <th className="py-5 px-4 uppercase font-semibold text-sm">
                Date
              </th>
              <th>Survey Id</th>
              <th>Customer Name</th>
              <th>Particulars</th>
              <th>Received Type</th>
              <th>Received Amount</th>
              <th>Spent Amount</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {finalLogs.map((finalLog, i) => {
              const {
                date,
                surveyId,
                customerName,
                particulars,
                recievedType,
                recievedAmount,
                spentAmount,
                remark,
              } = finalLog;
              return (
                <tr key={i} className="text-center border-b border-stone-200">
                  <td>{date}</td>
                  <td>{surveyId}</td>
                  <td>{customerName}</td>
                  <td>{particulars}</td>
                  <td>{recievedType}</td>
                  <td>{recievedAmount}</td>
                  <td>{spentAmount}</td>
                  <td>{remark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDRecord;
