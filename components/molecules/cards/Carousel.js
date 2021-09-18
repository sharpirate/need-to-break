import PropTypes from "prop-types";
import React, { useState } from "react";
import ActionButton, { actionButtonTypes } from "../../atoms/ActionButton";
import Arrow, { arrowTypes } from "../../atoms/Arrow";
import { v4 as uuidv4 } from 'uuid';

function generateInitialPages(numOfPages) {
  const pages = [];

  for (let i = 0; i < numOfPages; i++) {
    pages.push({ id: uuidv4() });
  }

  return pages;
}

function Carousel({ initialPages, renderItem, infinite, pageLimit }) {
  const [pages, setPages] = useState(generateInitialPages(initialPages));
  const [currentPage, setCurrentPage] = useState(0);

  const handleArrowClick = type => {
    if (type === arrowTypes.right) {
      if (currentPage === pages.length -1) {
        if (infinite) {
          setCurrentPage(0);
        }
      } else {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage === 0) {
        if (infinite) {
          setCurrentPage(pages.length - 1);
        }
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  }

  const handleActionClick = type => {
    if (type === actionButtonTypes.add) {
      if (pageLimit && pageLimit === pages.length) {
        return;
      } else {
        setPages([...pages, { id: uuidv4() }]);
        setCurrentPage(pages.length);
      }
    } else {
      if (pages.length > 1) {
        setPages(pages.filter((page, index) => index !== currentPage));

        if (currentPage === 0) {
        } else {
          setCurrentPage(currentPage - 1);
        }
      }
    }
  }

  const handlePageClick = id => {
    setCurrentPage(pages.findIndex(page => page.id === id));
  }

  return (
    <div className="overflow-hidden flex flex-col justify-center align-center gap-16 420:gap-24 bg-white">

      {/* Body */}
      <div className="relative z-10">
        <ArrowButton type={arrowTypes.left} handleClick={handleArrowClick} />
        <ArrowButton type={arrowTypes.right} handleClick={handleArrowClick} />

        {/* Placeholder Item */}
        <div className="invisible">
          {renderItem()}
        </div>

        {/* Items */}
        <ul className="absolute left-0 top-0 flex transition-transform duration-500" style={{ transform: `translateX(${-(currentPage * 100 / pages.length)}%)`}}>
          {pages.map(page => (
            <li key={page.id}>
              {renderItem()}
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <Pagination pages={pages} handleClick={handlePageClick} currentPage={currentPage} />

      {/* Buttons */}
      <div className="flex justify-center items-center gap-16">
        <ActionButton type={actionButtonTypes.add} handleClick={handleActionClick} />
        <ActionButton type={actionButtonTypes.remove} handleClick={handleActionClick} />
      </div>

    </div>
  );
}

Carousel.propTypes = {
  initialPages: PropTypes.number,
  renderItem: PropTypes.func,
  infinite: PropTypes.bool,
  pageLimit: PropTypes.number
};

function Pagination({ pages, handleClick, currentPage }) {
  return (
    <ul className="flex justify-center items-center gap-6 420:gap-8">
      {pages.map((page, index) => {

        const baseStyle = "appearance-none block w-6 420:w-8 h-6 420:h-8 rounded-4";
        const bgStyle = (currentPage === index) ? "bg-primary-500" : "bg-gray-400";

        return (
          <li key={page.id}>
            <button
              className={baseStyle + " " + bgStyle}
              onClick={() => handleClick(page.id)}
            />
          </li>
        );
      })}
    </ul>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number,
  handleClick: PropTypes.func,
  currentPage: PropTypes.number
};

function ArrowButton({ type, handleClick }) {
  const baseStyle = "absolute top-1/2 z-10";

  let typeStyle = "";

  if (type === arrowTypes.left) {
    typeStyle = "left-0";
  } else {
    typeStyle = "right-0";
  }

  return (
    <button className={baseStyle + ' ' + typeStyle} onClick={() => handleClick(type)}>
      <Arrow type={type} size={arrowTypes.reg} state={arrowTypes.active} />
    </button>
  );
}

ArrowButton.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func
};

export default Carousel;