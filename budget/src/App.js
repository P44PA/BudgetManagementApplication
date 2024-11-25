import { Routes, Route } from 'react-router-dom';
import './App.css'
import { useState, useEffect } from "react";
import MainDash from './components/maindash/Maindash';
import Sidebar from './components/sidebar/Sidebar';
import Expense from './components/expense/Expense';
import Income from './components/income/Income';
import Message from './components/message/Message';
import { AnimatePresence, motion } from 'framer-motion';
import { dataExpense, dataIncome } from './data/Data';




function App() {

  const [searchActive, setSearchActive] = useState(false)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  const [show, setShow] = useState(true)

  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 8000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  return (
      <div className="app">
        <AnimatePresence>
          {show &&
            <motion.div
              key={1}
              initial={{ y: -50, opacity: 0, height: "auto" }}
              animate={{ y: 0, opacity: 1, height: "auto" }}
              transition={{ duration: 1 }}
              exit={{ y: -50, opacity: 0, height: 0 }}
            >
              <div className='welcome-text'>
                <Message dataIncome={dataIncome} dataExpense={dataExpense} />
              </div>
            </motion.div>
          }
          <div className="app-glass">
            <Sidebar page={page} setPage={setPage} dataIncome={dataIncome} dataExpense={dataExpense} show={show} setSearchActive={setSearchActive} searchActive={searchActive} query={query} setQuery={setQuery} />
            <Routes>
              <Route path='/' exact element={<MainDash page={page} setPage={setPage} setSearchActive={setSearchActive} searchActive={searchActive} query={query} setQuery={setQuery} isAdded={isAdded} setIsAdded={setIsAdded} />} />
              <Route path='/add-income' exact element={<Income isAdded={isAdded} setIsAdded={setIsAdded} />} />
              <Route path='/add-expense' exact element={<Expense isAdded={isAdded} setIsAdded={setIsAdded} />} />
            </Routes>
          </div>
        </AnimatePresence>
      </div>
  );
}

export default App;

