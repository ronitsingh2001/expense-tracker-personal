// FileUpload.js
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { useSelector } from 'react-redux';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const user = useSelector(store => store.user);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    console.log(file)
    console.log(user)

    readPdfTransactions(file);
  };

  const readPdfTransactions = async (file) => {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const loadingTask = pdfjsLib.getDocument({ data: typedarray });

      loadingTask.promise.then(async (pdf) => {
        const numPages = pdf.numPages;
        let allTransaction = '';
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const textItems = textContent.items;
          const transactions = textItems.map(item => item.str.trim()).join(', ');
        
          allTransaction += transactions;
        }
        console.log(allTransaction.split(', '));
      });
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className='pt-32 p-10 flex flex-col space-y-6 bg-blue-950 text-white'>
      <h2>Upload Bank Statement</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button className='w-fit border-purple-500 border rounded p-1' onClick={handleFileUpload}>Upload and Read Transactions</button>
    </div>
  );
};

export default FileUpload;
