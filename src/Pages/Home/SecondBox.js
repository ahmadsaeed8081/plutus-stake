import React, { useState } from "react";
import Timer from "../../components/Timer";
import {
  ArrowDownIcon,
  QuestionIcon,
  ArrowDownIcon2,
  ArrowUpIcon,
} from "../../assets/Icons";

const SecondBox = ({
  headerTabsList,
  selectedTab2,
  setSelectedTab2,
  boxNumb,
  setBoxNumb,
  tokensList,
  hide5,
  setHide5,
  hide6,
  setHide6,
  token5,
  setToken5,
  token6,
  setToken6,
  setOpen,
}) => {
  const [expend, setExpend] = useState(false);
  const BodyBottom = () => {
    return (
      <div className="body-bottom flex flex-col w-full">
        <div className="expend-tab flex items-center justify-center">
          <div
            className="btn-expend flex items-center justify-center cursor-pointer"
            onClick={(e) => setExpend(!expend)}
          >
            <h1 className="e-tag mr-2">{expend ? "Hide" : "Detail"}</h1>
            <div className="e-icon flex items-center justify-center">
              {expend ? <ArrowUpIcon /> : <ArrowDownIcon2 />}
            </div>
          </div>
        </div>
        <div className={`expend-detail flex flex-col ${expend ? "show" : ""}`}>
          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side">Total Liquidity:</div>
            <div className="val-side">$60,327971</div>
          </div>
          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side"></div>
            <div className="val-side">Get wPLS/WBTC</div>
          </div>
          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side"></div>
            <div className="val-side">View Contract</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="grid-box flex flex-col">
      <div className="box-header flex items-center">
        {headerTabsList.map((item, index) => (
          <div
            key={index}
            className={`header-item flex items-center justify-center ${
              (selectedTab2 === item.title) & (boxNumb === 2) ? "active" : ""
            }`}
            onClick={(e) => {
              setSelectedTab2(item.title);
              setBoxNumb(2);
            }}
          >
            <h1 className="item-tag flex items-center justify-center">
              {item.title}
            </h1>
          </div>
        ))}
      </div>{" "}
      {selectedTab2 === "Stake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 2 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab2("Stake");
            setBoxNumb(2);
          }}
        >
          {boxNumb !== 2 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s2.png" className="img" />
            <h1 className="top-tag">wPLS/WBTC</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Lock-up Period:</h1>
                  <h1 className="item-lbl text-white">120 days</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">APY:</h1>
                  <h1 className="item-lbl text-white">30%</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">
                    Emergency Unstaking Penalties:
                  </h1>
                  <h1 className="item-lbl text-white">10%</h1>
                </div>
              </div>
              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Select Amount:</h1>
                    <h1 className="f-tag">
                      Balance: <span className="font-semibold">0LPT</span>
                    </h1>
                  </div>
                  <div className="field-i-box flex items-center">
                    <input
                      type="text"
                      className="txt cleanbtn w-full"
                      placeholder="Amount"
                    />
                    <div className="ib-right flex items-center">
                      <h1 className="ib-txt">LPT</h1>
                      <button className="ib-btn button">Max</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-stack button">Stake Now</button>
          </div>
          <BodyBottom />
        </div>
      ) : selectedTab2 === "Unstake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 2 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab2("Unstake");
            setBoxNumb(2);
          }}
        >
          {boxNumb !== 2 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s2.png" className="img" />
            <h1 className="top-tag">wPLS/WBTC Pool</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Penalty:</h1>
                  <h1 className="item-lbl text-red-600">10%</h1>
                </div>
              </div>
              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Previous Investment:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide5(!hide5);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {token5 ? token5.lbl : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide5 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {tokensList.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide5(!hide5);
                              setToken5(item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item.lbl}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Timer />
                </div>
              </div>
            </div>
            <button className="btn-stack button" onClick={(e) => setOpen(true)}>
              Unstake
            </button>
          </div>
          <BodyBottom />
        </div>
      ) : selectedTab2 === "Reward" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 2 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab2("Reward");
            setBoxNumb(2);
          }}
        >
          {boxNumb !== 2 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s2.png" className="img" />
            <h1 className="top-tag">wPLS/WBTC Pool</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Total Earnings</h1>
                  <h1 className="item-lbl text-white">$1000.00</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Available for claim:</h1>
                  <h1 className="item-lbl text-white">$100</h1>
                </div>
              </div>
              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Previous Investment:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide6(!hide6);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {token6 ? token6.lbl : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide6 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {tokensList.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide6(!hide6);
                              setToken6(item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item.lbl}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="field-hdr flex items-center justify-end">
                    <h1 className="f-tag">
                      Earning : <span className="c-theme">$700.00</span>
                    </h1>
                  </div>
                </div>
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Claim Reward:</h1>
                  </div>
                  <div className="field-i-box flex items-center">
                    <input
                      type="text"
                      className="txt cleanbtn w-full"
                      placeholder="Amount"
                    />
                    <div className="ib-right flex items-center">
                      <button className="ib-btn button">Max</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-stack button">Unstake</button>
          </div>
          <BodyBottom />
        </div>
      ) : null}
    </div>
  );
};

export default SecondBox;
