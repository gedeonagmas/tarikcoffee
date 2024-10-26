"use client";
import Link from "next/link";

import Image from "next/image";
import UseSticky from "@/hooks/UseSticky";
import React, { useEffect, useState } from "react";
import axios from "axios";
interface item {
  phone1: string;
  email: string;
  address: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedInLink: string;
}

const HeaderTopOne = () => {
  const [contact, setContact] = useState<item>();
  useEffect(() => {
    const fetchCategory = async () => {
      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/business-setup`
      );
      setContact(response2?.data);
    };
    fetchCategory();
  }, []);
   
   console.log(contact,'contact')
  return (
    <div className="navbar-top">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <ul className="topbar-right text-md-start text-center">
              <li className="d-none d-none d-lg-inline-block">
                <p>
                  <i className="far fa-clock"></i> Opening Hour 9:00am - 10:00pm
                </p>
              </li>
              <li>
                <p>
                  <span>
                    <i className="far fa-envelope"></i>
                    <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="col-sm-6">
            <ul className="topbar-right text-white text-md-end text-center">
              <li className="d-none d-none d-lg-inline-block">
                <span className="d-none d-md-inline-block">
                  <i className="fa fa-phone"></i>
                  <a href={`tel:${contact?.phone1}`}>{contact?.phone1}</a>
                </span>
              </li>
              <li className="social-area">
                <p className="d-inline-block">Follow Us On:</p>
                <a href={contact?.facebookLink}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href={contact?.twitterLink}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={contact?.instagramLink}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href={contact?.linkedInLink}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopOne;