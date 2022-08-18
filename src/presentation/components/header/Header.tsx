import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [word, setWord] = useState('');
  const handleWordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const handleSearchData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWord('');
  };
  return (
    <header>
      <nav>
        <ul className="nav-navbar-nav">
          <li>
            <Link
              style={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <form onSubmit={(e) => handleSearchData(e)}>
              <input
                type="text"
                className="w-80 max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40 rounded-md"
                placeholder="상품명 입력(기능 구현X)"
                value={word}
                onChange={handleWordOnChange}
              />
              <button
                type="submit"
                className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
              >
                검색
              </button>
            </form>
          </li>
          <ul className="nav-navbar-nav-right">
            <li className="nav-navbar-nav-right-li">
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
                to="products/add"
              >
                판매하기
              </Link>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
