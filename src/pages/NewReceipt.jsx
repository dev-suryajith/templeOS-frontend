import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ReceiptForm from "../components/ReceiptForm";
import ReceiptPreview from "../components/ReceiptPreview";
import ReceiptPreview2 from "../components/Preview2";
import PrintableReceipts from "@/components/PrintableReceipts";
import { useReactToPrint } from "react-to-print";
import { generateReceiptNumberAPI, saveReceiptsAPI } from "../../services/allAPI";
import ReceiptQueueModal from "@/components/ReceiptQueueModal";

function NewReceipt() {

  const [receiptQueue, setReceiptQueue] = useState([]);
  const [showQueue, setShowQueue] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isEditing, setIsEditing] = useState(false)

  const receiptRef = useRef(null);
  const printReceipt = useReactToPrint({ contentRef: receiptRef, });

  const onPrintReceipt = async () => {
    const res = await saveReceiptsAPI(receiptQueue)
    if (res.status == 200) {
      alert(res.data)
      setTimeout(() => {
        printReceipt()
      }, 500)
    }
  }

  const [receipt, setReceipt] = useState({
    receiptNumber: "",
    date: "",
    name: "",
    nakshatram: "",
    pooja: "",
    amount: "",

  })
  const generateReceiptNumber = async () => {
    try {
      const res = await generateReceiptNumberAPI();

      if (res.status === 200) {
        setReceipt((prev) => ({
          ...prev,
          receiptNumber: res.data,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([generateReceiptNumber()])
      setReceipt((prev) => ({ ...prev, date: new Date().toISOString().split("T")[0] }))
    };
    console.log(receiptQueue);
    loadData();
  }, [receiptQueue]);


  return (
    <div style={{ fontFamily: 'Gelasio' }} className="min-h-screen overflow-hidden bg-[#FFF8EE]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-sm text-[#C46E16] font-semibold">
            New Receipt
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-12 gap-6">

          {/* Left */}
          <div className="md:col-span-8">
            <ReceiptForm receipt={receipt} setReceipt={setReceipt} />
          </div>

          {/* Right */}
          <div className="md:col-span-4">
            <ReceiptPreview2
              setShowQueue={setShowQueue}
              receipt={receipt}
              setReceipt={setReceipt}
              receiptQueue={receiptQueue}
              setReceiptQueue={setReceiptQueue}
              setSelectedReceipt={setSelectedReceipt}
              isEditing={isEditing} 
              setIsEditing={setIsEditing}
            />
            <div className="hidden">
              <div ref={receiptRef}>
                <PrintableReceipts
                  receiptQueue={receiptQueue}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
      <ReceiptQueueModal
        open={showQueue}
        receipts={receiptQueue}
        setReceiptQueue={setReceiptQueue}
        onPrint={onPrintReceipt}
        onClose={() => setShowQueue(false)}
        setIsEditing={setIsEditing}
        setReceipt={setReceipt}
      />
    </div>
  );
}

export default NewReceipt;