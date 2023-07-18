import React, { useState } from "react";
import Timer from "../../components/Timer";
import {
  ArrowDownIcon,
  QuestionIcon,
  ArrowDownIcon2,
  ArrowUpIcon,
} from "../../assets/Icons";

const ThirdBox = ({
  headerTabsList,
  selectedTab3,
  setSelectedTab3,
  boxNumb,
  setBoxNumb,
  tokensList,
  hide7,
  setHide7,
  hide8,
  setHide8,
  token7,
  setToken7,
  token8,
  setToken8,
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
            <div className="val-side">Get KORE/WBTC</div>
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
              (selectedTab3 === item.title) & (boxNumb === 3) ? "active" : ""
            }`}
            onClick={(e) => {
              setSelectedTab3(item.title);
              setBoxNumb(3);
            }}
          >
            <h1 className="item-tag flex items-center justify-center">
              {item.title}
            </h1>
          </div>
        ))}
      </div>
      {selectedTab3 === "Stake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 3 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab3("Stake");
            setBoxNumb(3);
          }}
        >
          {boxNumb !== 3 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s3.png" className="img" />
            <h1 className="top-tag">KORE/WBTC</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Lock-up Period:</h1>
                  <h1 className="item-lbl text-white">45 days</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">APY:</h1>
                  <h1 className="item-lbl text-white">40%</h1>
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
      ) : selectedTab3 === "Unstake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 3 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab3("Unstake");
            setBoxNumb(3);
          }}
        >
          {boxNumb !== 3 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s3.png" className="img" />
            <h1 className="top-tag">wPLS/WBTC</h1>
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
                          setHide7(!hide7);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {token7 ? token7.lbl : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide7 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {tokensList.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide7(!hide7);
                              setToken7(item);
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
      ) : selectedTab3 === "Reward" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 3 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab3("Reward");
            setBoxNumb(3);
          }}
        >
          {boxNumb !== 3 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s3.png" className="img" />
            <h1 className="top-tag">KORE/WBTC</h1>
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
                          setHide8(!hide8);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {token8 ? token8.lbl : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide8 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {tokensList.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide8(!hide8);
                              setToken8(item);
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

export default ThirdBox;
