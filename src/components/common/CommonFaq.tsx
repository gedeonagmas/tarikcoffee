"use client";
import faq_data from "@/data/FaqData";
import React, { useEffect, useState } from "react";

interface DataType {
  id: number;
  page: string;
  question: string;
  answer: string;
  showAnswer: boolean;
}

const CommonFaq = ({ style }: any) => {
  const [ids, setIds] = useState(1);
  return (
    <>
      {faq_data.map((item) => (
        <div
          key={item.id}
          className={`accordion-item single-accordion-inner ${
            style ? "style-2" : ""
          }`}
        >
          <h2 className="accordion-header" id={`heading${item.id}`}>
            <button
              onClick={() => setIds(ids === item.id ? 4 : item?.id)}
              className={`accordion-button ${
                item.id === 1 ? "show" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${item.id}`}
              aria-expanded="true"
              aria-controls={`collapse${item.id}`}
            >
              {item.question}
            </button>
          </h2>
          {/* <div
            id={`collapse${item.id}`}
            className={`accordion-collapse collapse ${
              item.id === 1 ? "show" : "show"
            }`}
            aria-labelledby={`heading${item.id}`}
            data-bs-parent="#accordionExample"
          >
            
          </div> */}
          {/* {item.answer} */}
          <div className={`px-7 ${item.id === ids ? "h-32" : "h-2"}`}>
            {item.answer}
          </div>
        </div>
      ))}
    </>
  );
};

export default CommonFaq;
