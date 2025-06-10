import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TaskList from './components/TaskList/TaskList';
import NewItem from './components/NewItem/NewItem';

function App() {
  

  return (
    <>
      <Header />
      <NewItem />
      <TaskList />
      <Footer />
    </>
  )
}

export default App
