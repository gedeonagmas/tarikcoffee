"use client";
import Pagination from "@/components/pagination/Pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface item {
  id: number;
  full_name: string;
  image: string;
  title: string;
  position: string;
}

const Team = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teams-list`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchEvents();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const currentEvents = events.slice(indexOfFirstProduct, indexOfLastProduct);

  // Total number of pages
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Logic for handling page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const truncateText = (text: string, length: number) => {
    if (typeof text !== "string") {
      return "";
    }
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <>
      <div
        style={{ marginTop: "50px", marginBottom: "40px" }}
        className="it-team-4__area it-team-4__yellow-color pt-120 pb-90"
      >
        <div className="container">
          <div className="row">
            {currentEvents?.map((item: item) => {
              return (
                <div key={item.id} className="col-lg-3 col-md-6">
                  <div className="single-team-inner text-center">
                    <div className="thumb">
                      <img
                        style={{ width: "100%", height: "200px" }}
                        className=""
                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item.image}`}
                        alt="rk-theme"
                      />
                    </div>
                    <div className="details-wrap">
                      <div className="details-inner">
                        <h4>{item?.position}</h4>
                        <p>
                          {item.title} {item.full_name}
                        </p>
                      </div>
                    </div>
                    <div className="hover-details-wrap">
                      <div className="hover-details-inner">
                        <h4>
                          {item.title} {item.full_name}
                        </h4>
                        <p>{item.position}</p>
                        <ul className="social-media mt-3">
                          {/* <SocialIcon /> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{ marginBottom: "30px", marginTop: "40px" }}
            className="d-flex justify-content-center"
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;