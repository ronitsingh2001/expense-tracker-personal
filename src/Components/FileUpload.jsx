import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseToFirestore } from "../utils/functions";
import Backdrop from "./Backdrop";
import { addDoc, collection } from "firebase/firestore";
import { addExpense } from "../utils/expenseSlice";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    // console.log(file);
    // console.log(user);
    // const storageRef = ref(storage, `${user.userId}/${file.name}`);
    // await uploadBytes(storageRef, file);
    // const downloadURL = await getDownloadURL(storageRef);

    // console.log('File uploaded successfully:', downloadURL);
    const allTransactions = readXlsTransactions(file);
  };

  const addToFirestore = async (expenseArray) => {
    setIsLoading(true);
    const promises = expenseArray.map(async (expense) => {
      try {
        const expenseData = {
          category: "Not Mentioned",
          title: expense?.description,
          amount: expense?.amount,
          date: expense?.date,
          description: "",
        };
        const docRef = await addDoc(collection(db, user?.userId), expenseData);
        dispatch(addExpense({ id: docRef.id, ...expenseData }));
      } catch (err) {
        console.log(err);
      }
    });
    await Promise.all(promises);

    setIsLoading(false);
  };

  const readXlsTransactions = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet contains the transactions
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extracting the transactions
      const transactions = sheetData.reduce((acc, row) => {
        // Checking if the first element of the row is a valid date
        let trmp = "" + row[2];
        if (trmp.length === 16 && row[4] > 0) {
          acc.push({
            date: row[0],
            description: row[1],
            amount: row[4],
          });
        }
        return acc;
      }, []);

      let expenseArray = addExpenseToFirestore(transactions);
      addToFirestore(expenseArray);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="pt-32 p-10 flex flex-col space-y-6 bg-blue-950 text-white">
      <Backdrop isOpen={isLoading} />
      <h2>Upload Bank Statement</h2>
      <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
      <button
        className="w-fit border-purple-500 border rounded p-1"
        onClick={handleFileUpload}
      >
        Upload and Read Transactions
      </button>
    </div>
  );
};

export default FileUpload;
