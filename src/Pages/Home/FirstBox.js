import React, { useState,useEffect } from "react";
import Timer from "../../components/Timer";
import {
  ArrowDownIcon,
  QuestionIcon,
  ArrowDownIcon2,
  ArrowUpIcon,
} from "../../assets/Icons";
import Modal from "../../components/Modal";

import { stake1_address,stake1_abi,token_abi,Stake2_token_Address } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite } from 'wagmi'
import ConfirmationPopup from "../../components/confirmationPopup";

import { useAccount, useDisconnect } from 'wagmi'

import Web3 from "web3";
const stake2_Contract = {
  address: stake1_address,
  abi: stake1_abi,
}
const stakeTokem_Contract = {
  address: Stake2_token_Address,
  abi: token_abi,
}

const FirstBox = ({
  headerTabsList,
  selectedTab,
  setSelectedTab,
  boxNumb,
  setBoxNumb,
  tokensList,
  hide1,
  setHide1,
  hide2,
  setHide2,
  hide3,
  setHide3,
  hide4,
  setHide4,
  token1,
  setToken1,
  token2,
  setToken2,
  token3,
  setToken3,
  token4,
  setToken4,
}) => {
  const { address, isConnecting ,isDisconnected} = useAccount()
  const [open, setOpen] = useState(false);

  const [expend, setExpend] = useState(false);
  const [allowedTokens, set_allowedTokens] = useState([]);
  const [stakeAmount, setStakedAmount] = useState(0);
  const [unstakeDetails, set_unstakeDetails] = useState([]);
  const [slected_pair, set_slected_pair] = useState([[]]);
  const [slected_pair_inv, set_slected_pair_inv] = useState([]);
  const [totalReward, set_totalReward] = useState(0);
  const [Total_withdraw, set_Total_withdraw] = useState(0);
  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [slected_plp_add, set_slected_plp_add] = useState("");

  let details=[];
  let count=0;


  useEffect(()=>{
    if(count==0&& address!=undefined)
    {
        test()
        count++;
    }
  
  },address)






  
    const { data:stakeResult, isLoading2, isSuccess:stakeSuccess, write:staking } = useContractWrite({

      address: stake1_address,
    abi: stake1_abi,
    functionName: 'Stake',
    args: [token1[1],stakeAmount*10**18],
    value: ((stakeAmount*0.3/100) * (10**18)).toString(),
    onSuccess(data) {
      test();
      console.log('Success', data)
    },
  

  })




    const { write } = useContractWrite({
      
      address: token1[1],
      abi: token_abi,
      functionName: 'approve',
      args: [stake1_address,stakeAmount*10**18],
      onSuccess(data) {
        staking?.()
        console.log('Success', data)
      },
    
    })


    
    const { config:unstakeConfig } = usePrepareContractWrite({
      address: stake1_address,
      abi: stake1_abi,
      functionName: 'unStake',
      args: [slected_pair_inv?slected_pair_inv[3]:null,slected_plp_add],
    
    })


    const { config:claimRewardConfig } = usePrepareContractWrite({
      address: stake1_address,
      abi: stake1_abi,
      functionName: 'withdrawReward',
    
    })
    const { data:data__unstake, isLoading:isLoading_unstake, isSuccess:isSuccess_unstake, write:unstake } = useContractWrite(unstakeConfig)
    const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdrawReward } = useContractWrite(claimRewardConfig)

  const { data, isError1, isLoading1 } = useContractReads({
    contracts: [
      {
        ...stake2_Contract,
        functionName: 'Apy',
      },
      // {
      //   ...stake2_Contract,
      //   functionName: 'getTotalInvestment',

      // },
      // {
      //   ...stake2_Contract,
      //   functionName: 'get_currTime',
        
      // },

      // {
      //   ...stake2_Contract,
      //   functionName: 'owner',
        
      // },
      // {
      //   ...stake2_Contract,
      //   functionName: 'totalusers',
        
      // },
      // {
      //   ...stake2_Contract,
      //   functionName: 'totalbusiness',
        
      // },
      // {
      //   ...stake2_Contract,
      //   functionName: 'user',
      //   args:[address]
        
      // },
      // {
      //   ...stake2_Contract,
      //   functionName: 'get_withdrawnTime',
      //   args: [1]
        
      // },





      {
        ...stakeTokem_Contract,
        functionName: 'balanceOf',
        args: [address]
        
      },
      
      
      

    ],
  })

  async function test(){
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/tJeV2dJPtzoWZgLalzn380ynAKIWX9FM"));
  
              
  //  const balance =await  web3.eth.getBalance(address)
    const contract=new web3.eth.Contract(stake1_abi,stake1_address);
    let totalReward = await contract.methods.getReward().call({ from: address });       

    let allowed_tokens = await contract.methods.getAll_allowedTokens().call({from:address});    
    set_allowedTokens(allowed_tokens);
    console.log("allowed_tokens "+allowed_tokens[1][1]);
    for(let i=0;i < allowed_tokens.length;i++)
    {
       let temp  = await contract.methods.getAll_investments(allowed_tokens[i][1].toString()).call({from:address}); 
   
        // unstakeDetails.push(temp);
        details.push(temp? temp :[]);
        console.log("token add "+i +" "+allowed_tokens[i][1]);
        console.log("details  "+i +" " +temp);

    }
    console.log("test unstake prrr "+ details);

    set_unstakeDetails(details)
    set_slected_plp_add(allowed_tokens[0][1])

    console.log("test unstake "+ details[2][0]);

    set_slected_pair(details[0])

    set_slected_pair_inv(details[0][0])

    setToken1(allowed_tokens[0])
    setToken3(allowed_tokens[0])


    let Total_withdraw = await contract.methods.total_withdrawReward(address).call();       


    set_totalReward(totalReward);
    set_Total_withdraw(Total_withdraw);
    
    // let Total_withdraw = await contract.methods.total_withdraw_reaward().call({ from: address });       

    // let allInvestments = await contract.methods.getAll_investments().call({from: address});

    // set_investmentList(allInvestments);
    // setSelectedAmount(allInvestments[0]);
    // set_totalReward(totalReward);
    // set_Total_withdraw(Total_withdraw);



  } 

   async function stake()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }
    let fee= (stakeAmount*0.3)/(100)
    fee=fee*10**18;

    if(Number(data[1].result) < Number(fee))
    {
      alert("You dont have enough balance");
      return;
    }

console.log("choosed stake token "+token1[1]);

    write?.()


  }

  function unstaking()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    console.log("object unstake "+slected_pair_inv);
    if(slected_pair_inv==undefined)
    {
      // alert("sorry")
      return
    }
    console.log("object unstake1 "+slected_plp_add);

    unstake?.()

    // console.log(data__unstake);
    

  }

  function ClaimReward()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    if(totalReward==0 )
    {
      alert("You dont have reward to withdraw");
      return;
    }


    // if(Number(data[10].result) < Number(fee))
    // {
    //   alert("You dont have enough balance");
    //   return;
    // }
    withdrawReward?.()
    

  }



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
            <div className="val-side">Get Plutus/PRC20</div>
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
            className={`header-item flex items-center justify-center ${
              (selectedTab === item.title) & (boxNumb === 1) ? "active" : ""
            }`}
            onClick={(e) => {
              setSelectedTab(item.title);
              setBoxNumb(1);
            }}
          >
            <h1 className="item-tag flex items-center justify-center">
              {item.title}
            </h1>
          </div>
        ))}
      </div>
      {selectedTab === "Stake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 1 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab("Stake");
            setBoxNumb(1);
          }}
        >
          {boxNumb !== 1 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s1.png" className="img" />
            <h1 className="top-tag">Plutus/PRC20</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Lock-up Period:</h1>
                  <h1 className="item-lbl text-white">30 days</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">APY:</h1>
                  <h1 className="item-lbl text-white">50%</h1>
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
                    <h1 className="f-tag">Choose PLP Pair:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide1(!hide1);
                        }}
                      >
                        <div className="slt flex items-center">
                          {/* <div className="icon flex items-center justify-center">
                            <img
                              src={token1 ? token1.img : "/images/btc.png"}
                              className="img"
                            />
                          </div> */}
                          <div className="unit-name flex aic font s14 b4">
                            <span
                              className="unit-eng flex aic font s14 b4"
                              placeholder="Plano"
                            >
                              {token1 ? token1[0] : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide1 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {allowedTokens.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide1(!hide1);
                              setToken1(item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item[0]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Paste token:</h1>
                    <h1 className="f-tag">
                      Balance: <span className="font-semibold">{token1?Number(token1[2])/10**18:0}</span>
                    </h1>
                  </div>
                  <div className="field-i-box flex items-center">
                    <input
                      type="number"
                      className="txt cleanbtn w-full"
                      placeholder="Amount"
                      min={0}
                      value={stakeAmount}
                      max={token1?Number(token1[2])/10**18:0}
                      onChange={(e)=>setStakedAmount(e.target.value)}
                    />
                    <div className="ib-right flex items-center">
                      <h1 className="ib-txt">LPT</h1>
                      <button className="ib-btn button"onClick={(e)=>setStakedAmount((Number(token1[2])/10**18))}>Max</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-stack button" onClick={stake}>Stake Now</button>
          </div>
          <BodyBottom />
        </div>
      ) : selectedTab === "Unstake" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 1 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab("Unstake");
            setBoxNumb(1);
          }}
        >
          {boxNumb !== 1 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s1.png" className="img" />
            <h1 className="top-tag">Plutus/PRC20</h1>
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
                    <h1 className="f-tag">Select token:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide1(!hide1);
                        }}
                      >
                        <div className="slt flex items-center">
                          {/* <div className="icon flex items-center justify-center">
                            <img
                              src={token1 ? token1.img : "/images/btc.png"}
                              className="img"
                            />
                          </div> */}
                          <div className="unit-name flex aic font s14 b4">
                            <span
                              className="unit-eng flex aic font s14 b4"
                              placeholder="Plano"
                            >
                              {token1 ? token1[0] : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide1 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {allowedTokens.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide1(!hide1);
                              setToken1(item);
                              
                              set_slected_pair(unstakeDetails[index])
                              set_slected_plp_add(item[1])
                              set_slected_pair_inv(unstakeDetails[index][0])

                              console.log(" todfken index "+ unstakeDetails[index]);

                              console.log(" token index"+ unstakeDetails[2][0]);

                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item[0]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
                          setHide2(!hide2);

                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {slected_pair_inv ? slected_pair_inv[0]/10**18 : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide2 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {slected_pair.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide2(!hide2);
                              // setToken2(item);
                              set_slected_pair_inv(item)
                              set_choosed_Unstake_inv(item[3])

                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item[0]/10**18}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Timer  time={slected_pair_inv ? Number(slected_pair_inv[1]): 0}/>
                </div>
              </div>
            </div>
            <button className="btn-stack button" onClick={(e) => setOpen(true)}>
              Unstake
            </button>
          </div>
          <BodyBottom />
        </div>
      ) : selectedTab === "Reward" ? (
        <div
          className={`box-body flex flex-col ${boxNumb === 1 ? "active" : ""}`}
          onClick={(e) => {
            setSelectedTab("Reward");
            setBoxNumb(1);
          }}
        >
          {boxNumb !== 1 && <div className="overlay" />}
          <div className="body-top flex items-center justify-between">
            <img src="/images/s1.png" className="img" />
            <h1 className="top-tag">Plutus/PRC20</h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Total Earnings</h1>
                  <h1 className="item-lbl text-white">${Number(Total_withdraw)+Number(totalReward)}</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Available for claim:</h1>
                  <h1 className="item-lbl text-white">${Number(totalReward)}</h1>
                </div>
              </div>
              <div className="input-form flex flex-col">
                <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Select token:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide3(!hide3);
                        }}
                      >
                        <div className="slt flex items-center">
                          {/* <div className="icon flex items-center justify-center">
                            <img
                              src={token3 ? token3.img : "/images/btc.png"}
                              className="img"
                            />
                          </div> */}
                          <div className="unit-name flex aic font s14 b4">
                            <span
                              className="unit-eng flex aic font s14 b4"
                              placeholder="Plano"
                            >
                              {token3 ? token3[0] : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide3 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {allowedTokens.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide3(!hide3);
                              setToken3(item);

                              set_slected_pair(unstakeDetails[index])
                              set_slected_pair_inv(unstakeDetails[index][0])
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item[0]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
                          setHide4(!hide4);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                              {slected_pair_inv ? slected_pair_inv[0]/10**18 : ""}
                            </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide4 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {slected_pair.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide4(!hide4);
                              setToken4(item);
                              set_slected_pair_inv(item)

                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item[0]/10**18}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="field-hdr flex items-center justify-end">
                    <h1 className="f-tag">
                    Earning : <span className="c-theme">${slected_pair_inv?slected_pair_inv[6]:0}</span>
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
            <button className="btn-stack button" onClick={ClaimReward}>Claim</button>
          </div>
          <BodyBottom />
        </div>
      ) : null}
                    <Modal open={open} onClose={() => setOpen(false)}>
          <ConfirmationPopup setOpen={setOpen} unstaking={unstaking}/>
        </Modal>
      {/* {unstakeDetails?unstakeDetails[0][0][0]:0} */}
    </div>
  );
};

export default FirstBox;
