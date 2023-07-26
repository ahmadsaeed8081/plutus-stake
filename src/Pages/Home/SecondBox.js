import React, { useEffect, useState } from "react";
import Timer from "../../components/Timer";
import Modal from "../../components/Modal";

import {
  ArrowDownIcon,
  QuestionIcon,
  ArrowDownIcon2,
  ArrowUpIcon,
} from "../../assets/Icons";
import ConfirmationPopup from "../../components/confirmationPopup";
import Web3 from "web3";
import { useAccount, useDisconnect } from 'wagmi'
import { stake1_address,stake2_address,stake3_address,stake1_abi,stake2_3_abi,token_abi,Stake2_token_Address } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
const stake2_Contract = {
  address: stake2_address,
  abi: stake2_3_abi,
}
const stakeTokem_Contract = {
  address: Stake2_token_Address,
  abi: token_abi,
}


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
}) => {


  const [open, setOpen] = useState(false);

  const [expend, setExpend] = useState(false);
  const [totalReward, set_totalReward] = useState(0);
  const [Total_withdraw, set_Total_withdraw] = useState(0);

  const [stakeAmount, setStakedAmount] = useState(0);

  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);


  const { address, isConnecting ,isDisconnected} = useAccount()
  // const { disconnect } = useDisconnect()

  // console.log(typeOf(address));

  // const { config } = usePrepareContractWrite({
  //   address: Stake2_token_Address,
  //   abi: token_abi,
  //   functionName: 'approve',
  //   args: [stake2_address,stakeAmount*10**18]
  // })
  
  // const { config:stakeConfig } = usePrepareContractWrite({
  //   address: stake2_address,
  //   abi: stake2_3_abi,
  //   functionName: 'Stake',
  //   args: [stakeAmount*10**18],
  //   value: ((stakeAmount*0.3/100) * (10**18)).toString() })



    const { data:stakeResult, isLoading2, isSuccess:stakeSuccess, write:staking } = useContractWrite({

      address: stake2_address,
    abi: stake2_3_abi,
    functionName: 'Stake',
    args: [stakeAmount*10**18],
    value: Convert_To_Wei((stakeAmount*0.3/100)),
    onSuccess(data) {
      test();
      console.log('Success', data)
    },
  

  })

  const { config:appConfig } = usePrepareContractWrite({
    address: Stake2_token_Address,
    abi: token_abi,
      functionName: 'approve',
      args: [stake2_address,stakeAmount*10**18],
  })




    const { config:unstakeConfig } = usePrepareContractWrite({
      address: stake2_address,
      abi: stake2_3_abi,
      functionName: 'unStake',
      args: [choosed_Unstake_inv],
    
    })


    const { config:claimRewardConfig } = usePrepareContractWrite({
      address: stake2_address,
      abi: stake2_3_abi,
      functionName: 'withdrawReward',
    
    })

    const {data:data_app, isLoading:isLoading_app, isSuccess:isSuccess_app,write: approval} = useContractWrite(appConfig)

  const { data:data__unstake, isLoading:isLoading_unstake, isSuccess:isSuccess_unstake, write:unstake } = useContractWrite(unstakeConfig)


  const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdrawReward } = useContractWrite(claimRewardConfig)


  const waitForTransaction = useWaitForTransaction({
    hash: data_app?.hash,
    onSuccess(data) {
    // alert("its run")
    staking?.()
      console.log('Success',data )
    },
  })

  const waitForTransaction2 = useWaitForTransaction({
    hash: stakeResult?.hash,
    onSuccess(data) {
    test?.()
      console.log('Success2',data )
    },
  })

  const waitForTransaction3 = useWaitForTransaction({
    hash: data__unstake?.hash,
    onSuccess(data) {
    test?.()
      console.log('Success2',data )
    },
  })

  const waitForTransaction4 = useWaitForTransaction({
    hash: stakeResult_withdrawReward?.hash,
    onSuccess(data) {
    test?.()
      console.log('Success2',data )
    },
  })

useEffect(()=>{
  let count=0;
  if(count==0&& address!=undefined)
  {
      test()
      count++;
  }

},address)
  const { data, isError1, isLoading1 } = useContractReads({
    contracts: [
      {
        ...stake2_Contract,
        functionName: 'Apy',
      },
      {
        ...stake2_Contract,
        functionName: 'getTotalInvestment',

      },
      {
        ...stake2_Contract,
        functionName: 'get_currTime',
        
      },

      {
        ...stake2_Contract,
        functionName: 'owner',
        
      },
      {
        ...stake2_Contract,
        functionName: 'totalusers',
        
      },
      {
        ...stake2_Contract,
        functionName: 'totalbusiness',
        
      },
      {
        ...stake2_Contract,
        functionName: 'user',
        args:[address]
        
      },
      {
        ...stake2_Contract,
        functionName: 'get_withdrawnTime',
        args: [1]
        
      },





      {
        ...stakeTokem_Contract,
        functionName: 'balanceOf',
        args: [address]
        
      },
      
      
      

    ],
  })


  function Convert_To_Wei( val){
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/tJeV2dJPtzoWZgLalzn380ynAKIWX9FM"));
    val= web3.utils.toWei(val.toString(),"ether");
    return val;
  
  }
  function Convert_To_eth( val){
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/tJeV2dJPtzoWZgLalzn380ynAKIWX9FM"));
    val= web3.utils.fromWei(val.toString(),"ether");
    return val;
  
  }
  
  async function test(){
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/tJeV2dJPtzoWZgLalzn380ynAKIWX9FM"));
  
              
   const balance =await  web3.eth.getBalance(address)
    const contract=new web3.eth.Contract(stake2_3_abi,stake2_address);
    
    let totalReward = await contract.methods.get_TotalReward().call({ from: address });       
    let Total_withdraw = await contract.methods.total_withdraw_reaward().call({ from: address });       

    let allInvestments = await contract.methods.getAll_investments().call({from: address});
             console.log("bal "+allInvestments);

    set_investmentList(allInvestments);
    setSelectedAmount(allInvestments[0]);
    set_totalReward(totalReward);
    set_Total_withdraw(Total_withdraw);



  }  
// function Get_all_inv()
// {

  


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

    if(Number(data[8].result) < Number(fee))
    {
      alert("You dont have enough balance");
      return;
    }
    approval?.()


  }


  function unstaking()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    console.log("object unstake "+choosed_Unstake_inv);
    // if(stakeAmount==0 )
    // {
    //   alert("kindly write amount to stake ");
    //   return;
    // }


    // if(Number(data[10].result) < Number(fee))
    // {
    //   alert("You dont have enough balance");
    //   return;
    // }
    unstake?.()

    console.log(data__unstake);
    

  }

  function ClaimReward()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    console.log("object withdraw "+choosed_Unstake_inv);
    // if(stakeAmount==0 )
    // {
    //   alert("kindly write amount to stake ");
    //   return;
    // }


    // if(Number(data[10].result) < Number(fee))
    // {
    //   alert("You dont have enough balance");
    //   return;
    // }
    withdrawReward?.()
    

  }

  // setInterval( test, 60000);


  console.log(data);


console.log(data?data[3].result:null);
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
            <div className="val-side" >                 
            $60,327971

                  
                  </div>
          </div>
          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side"></div>
            <div className="val-side">
            <a
                    href="https://www.plutus.exchange/whitepaper"
                    target="_blank"
                    className="sub-menu-item"
                    style={{ color:"#2498A3" }}
                  >
                    Get wPLS/WBTC
                  </a>
              
              </div>
          </div>

          <div className="detail-item flex items-center justify-between">
            <div className="lbl-side"></div>
            <div className="val-side">
            <a
                    href="https://www.plutus.exchange/whitepaper"
                    target="_blank"
                    className="sub-menu-item"
                    style={{ color:"#2498A3" }}
                  >
                    View Contract
                  </a>
              
              
              </div>
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
                    Balance: <span className="font-semibold">{data?(Number(data[8].result)/10**18).toFixed(2):0} PLP</span>
                    </h1>
                  </div>
                  <div className="field-i-box flex items-center">
                    <input
                      type="number"
                      className="txt cleanbtn w-full"
                      placeholder="Amount"
                      min={0}
                      value={stakeAmount}
                      max={data?(Number(data[8].result)/10**18):0}

                      onChange={(e)=>setStakedAmount(e.target.value)}

                    />
                    <div className="ib-right flex items-center">
                      <h1 className="ib-txt">PLP</h1>
                      <button className="ib-btn button" onClick={(e)=>setStakedAmount((Number(data[8].result)/10**18))} >Max</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-stack button" onClick={stake}>Stake Now</button>
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
                          setHide5(!hide5);
                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                                 {selectedAmount
                                      ? selectedAmount[0]/10**18
                                      : "0"}                            
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
                        {allInvestments.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              console.log("object");
                              setHide5(!hide5);
                              setSelectedAmount(item);
                              set_choosed_Unstake_inv(item[3])
                              console.log("its item "+item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {Number(item[0])/10**18}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Timer  time={selectedAmount ? Number(selectedAmount[1]): 0}
/>
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
            <h1 className="top-tag">wPLS/WBTC </h1>
          </div>
          <div className="body-meta flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <div className="info-list flex flex-col">
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Total Earnings</h1>
                  <h1 className="item-lbl text-white">${((Number(Total_withdraw)+Number(totalReward))/10**18).toFixed(2)}</h1>
                </div>
                <div className="info-item flex items-center justify-between">
                  <h1 className="item-lbl text-white">Available for claim:</h1>
                  <h1 className="item-lbl text-white">${(Number(totalReward)/10**18).toFixed(2)}</h1>
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
                                 {selectedAmount
                                      ? selectedAmount[0]/10**18
                                      : "0"}                               
                                      
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
                        {allInvestments.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide6(!hide6);
                              setSelectedAmount(item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {Number(item[0])/10**18}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="field-hdr flex items-center justify-end">
                    <h1 className="f-tag">
                    Earning : <span className="c-theme">${(selectedAmount? Convert_To_eth(selectedAmount[6]):0)}</span>
                    </h1>
                  </div>
                </div>
                {/* <div className="input-field flex flex-col">
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
                </div> */}
              </div>
            </div>
            <button className="btn-stack button" onClick={ClaimReward}>Claim </button>
          </div>
          <BodyBottom />
        </div>
      ) : null}
              <Modal open={open} onClose={() => setOpen(false)}>
          <ConfirmationPopup setOpen={setOpen} unstaking={unstaking}/>
        </Modal>
    </div>
  );
};

export default SecondBox;
