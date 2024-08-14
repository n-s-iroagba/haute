import React, { useEffect, useState } from 'react'
import TransactionComponent from '../components/TransactionComponent';
import { TransactionDto } from '../../../../../common/transactionType';
import { getTransactions } from '../helpers/transactionHelpers';
import LoadingSpinner from '../../../common/components/LoadingSpinner';


const Transactions: React.FC<{id:number}> = ({id}) => {
  const [transactions, setTransactions] = useState<TransactionDto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
    
     
        const transacts = await getTransactions(id)
        setTransactions(transacts);
      } catch (error) {
        console.error('Error loading transactions from localStorage:', error);
      }
    };

    fetchTransactions();
  }, [id]); 

  const handleNext = () => {
    if(transactions){
      if(transactions?.length){
    if (currentIndex + itemsPerPage < (transactions?.length||0)) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  }
  };
}

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };
  const displayedItems = transactions? transactions.slice(currentIndex, currentIndex + itemsPerPage):[];

  return<div className='primary-background text-light round-top px-1 py-5'>
  <h4 className='mb-3 text-center transaction-header'>Transactions</h4>
  {transactions === null ? (
    <LoadingSpinner primaryBackground/>
  ) : (
    <div className='px-3 mt-2'>
      {transactions?.length ? (
        <h5 className='text-center'>No Transactions yet.</h5>
      ) : (
        displayedItems.map((transaction:TransactionDto) => (
          <TransactionComponent transaction={transaction} key={transaction.id} />
        ))
      )}
      <div className="d-flex justify-content-evenly align-items-center">
        {currentIndex > 0 && (
          <button className='background-secondary text-light border-0' onClick={handlePrevious}>
            &larr; Previous
          </button>
        )}
        <span>
          {`${currentIndex + 1} - ${Math.min(currentIndex + itemsPerPage, transactions?.length)} of ${transactions?.length}`}
        </span>
        {currentIndex + itemsPerPage < transactions?.length && (
          <button className='background-secondary text-light border-0' onClick={handleNext}>
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  )}
</div>

 


}
export default Transactions;


