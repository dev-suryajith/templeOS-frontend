import React from 'react'
import ReceiptCard from './ReceiptCard';

function PrintableReceipts({ receiptQueue }) {
    return (
        <>
            {receiptQueue.map(receipt => (
                <ReceiptCard
                    key={receipt.receiptNumber}
                    receipt={receipt}
                />
            ))}
        </>
    );
}

export default PrintableReceipts