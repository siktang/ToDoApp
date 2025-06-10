import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TodoList from './components/ToDoList/ToDoList';

function App() {
  

  return (
    <>
      <Header />
      <TodoList />
      <Footer />
    </>
  )
}

export default App
