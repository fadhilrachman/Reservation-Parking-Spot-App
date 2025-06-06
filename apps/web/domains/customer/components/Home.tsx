import React from "react";
import NavbarCustomer from "./NavbarCustomer";
import Jumbotron from "./Jumbotron";
import ListParkingPlace from "./ListParkingPlace";
import Footer from "../../../shared/components/Footer";

const Home = () => {
  return (
    <div className="">
      <NavbarCustomer />
      <Jumbotron />
      <ListParkingPlace />
      <Footer />
    </div>
  );
};

export default Home;
