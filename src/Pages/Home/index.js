import React, { useState, useEffect } from "react";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import './styles.css';

// import required modules
import { Pagination } from "swiper/modules";
import Web3 from "web3";

import Timer from "../../components/Timer";
import Modal from "../../components/Modal";
import Wrapper from "../../routes/Wrapper";
import ConfirmationPopup from "../../components/confirmationPopup";
import { QuestionIcon, ArrowDownIcon } from "../../assets/Icons";

import { stake1_address,stake2_address,stake3_address,stake1_abi,stake2_3_abi } from "../../components/config";
const stake1_Contract = {
  address: stake1_address,
  abi: stake1_abi,
}
const stake2_Contract = {
  address: stake2_address,
  abi: stake2_3_abi,
}
const stake3_Contract = {
  address: stake3_address,
  abi: stake2_3_abi,
}


const Main = () => {

  const [boxNumb, setBoxNumb] = useState(1);
  const [selectedTab, setSelectedTab] = useState("Stake");
  const [selectedTab2, setSelectedTab2] = useState("Stake");
  const [selectedTab3, setSelectedTab3] = useState("Stake");
  const headerTabsList = [
    { title: "Stake" },
    { title: "Unstake" },
    { title: "Reward" },
  ];
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [hide5, setHide5] = useState(false);
  const [hide6, setHide6] = useState(false);
  const [hide7, setHide7] = useState(false);
  const [hide8, setHide8] = useState(false);
  const [token1, setToken1] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const [token2, setToken2] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const [token3, setToken3] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const [token4, setToken4] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const [token5, setToken5] = useState([]);
  const [token6, setToken6] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const [token7, setToken7] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const [token8, setToken8] = useState({ img: "/images/btc.png", lbl: "BTC" });
  const tokensList = [
    { img: "/images/btc.png", lbl: "PLUTUS/BTC"},
    { img: "/images/usdt.png", lbl: "PLUTUS/USDT" },
    { img: "/images/trx.png", lbl: "PLUTUS/BUSD" },
    { img: "/images/btcoin.png", lbl: "PLUTUS/BTC" },
  ];

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide1(false);
      setHide2(false);
      setHide3(false);
      setHide4(false);
      setHide5(false);
      setHide6(false);
    });
  }, []);



 


















  return (
    <Wrapper>
      <div className="lading-page bg-themeColor h-screen flex">
        <div className="wrap wrapWidth flex flex-col text-white">
          <div className="page-meta flex flex-col items-center">
            <h1 className="slug">Stake Pool</h1>
            <p className="desc">Stake LP tokens and earn Incentive token</p>
          </div>
          <div className="page-grid">
            {/* First Box */}
            <FirstBox
              headerTabsList={headerTabsList}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              boxNumb={boxNumb}
              setBoxNumb={setBoxNumb}
              tokensList={tokensList}
              hide1={hide1}
              setHide1={setHide1}
              hide2={hide2}
              setHide2={setHide2}
              hide3={hide3}
              setHide3={setHide3}
              hide4={hide4}
              setHide4={setHide4}
              token1={token1}
              setToken1={setToken1}
              token2={token2}
              setToken2={setToken2}
              token3={token3}
              setToken3={setToken3}
              token4={token4}
              setToken4={setToken4}
            />
            {/* Second Box */}
            <SecondBox
              headerTabsList={headerTabsList}
              selectedTab2={selectedTab2}
              setSelectedTab2={setSelectedTab2}
              boxNumb={boxNumb}
              setBoxNumb={setBoxNumb}
              tokensList={tokensList}
              hide5={hide5}
              setHide5={setHide5}
              hide6={hide6}
              setHide6={setHide6}
              token5={token5}
              setToken5={setToken5}
              token6={token6}
              setToken6={setToken6}
            />
            {/* Third Box */}
            <ThirdBox
              headerTabsList={headerTabsList}
              selectedTab3={selectedTab3}
              setSelectedTab3={setSelectedTab3}
              boxNumb={boxNumb}
              setBoxNumb={setBoxNumb}
              tokensList={tokensList}
              hide7={hide7}
              setHide7={setHide7}
              hide8={hide8}
              setHide8={setHide8}
              token7={token7}
              setToken7={setToken7}
              token8={token8}
              setToken8={setToken8}
            />
          </div>
          <div className="page-slider">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <FirstBox
                  headerTabsList={headerTabsList}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  boxNumb={boxNumb}
                  setBoxNumb={setBoxNumb}
                  tokensList={tokensList}
                  hide1={hide1}
                  setHide1={setHide1}
                  hide2={hide2}
                  setHide2={setHide2}
                  hide3={hide3}
                  setHide3={setHide3}
                  hide4={hide4}
                  setHide4={setHide4}
                  token1={token1}
                  setToken1={setToken1}
                  token2={token2}
                  setToken2={setToken2}
                  token3={token3}
                  setToken3={setToken3}
                  token4={token4}
                  setToken4={setToken4}
                />
              </SwiperSlide>
              <SwiperSlide>
                <SecondBox
                  headerTabsList={headerTabsList}
                  selectedTab2={selectedTab2}
                  setSelectedTab2={setSelectedTab2}
                  boxNumb={boxNumb}
                  setBoxNumb={setBoxNumb}
                  tokensList={tokensList}
                  hide5={hide5}
                  setHide5={setHide5}
                  hide6={hide6}
                  setHide6={setHide6}
                  token5={token5}
                  setToken5={setToken5}
                  token6={token6}
                  setToken6={setToken6}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ThirdBox
                  headerTabsList={headerTabsList}
                  selectedTab3={selectedTab3}
                  setSelectedTab3={setSelectedTab3}
                  boxNumb={boxNumb}
                  setBoxNumb={setBoxNumb}
                  tokensList={tokensList}
                  hide7={hide7}
                  setHide7={setHide7}
                  hide8={hide8}
                  setHide8={setHide8}
                  token7={token7}
                  setToken7={setToken7}
                  token8={token8}
                  setToken8={setToken8}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

export default Main;
