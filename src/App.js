import { ethers } from "ethers";
import Web3s from 'web3'
import { React, useState, useEffect,} from "react";
import './App.css';
import blue from './b.png';
import green from './g.png';
import orage from './o.png';
import purple from './p.png';
import white from './w.png';
function App() {
  const [id, setid] = useState();
  const [connect, setconnect] = useState();
  const [im, setim] = useState();
  const [im2, setim2] = useState();
  const [im3, setim3] = useState();



  var Web3 = require('web3');
  var Eth = require('web3-eth');
  var eth = new Eth(Eth.givenProvider || 'ws://some.local-or-remote.node:8546');
  var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

  const amount = web3.utils.toWei('0.5', 'ether');
  const valuev = web3.utils.toHex(amount);
  let amount2,valuev2;

  useEffect(() => {

    if(id != null){
      document.getElementById("status-connect").style.color =  "#ffcc00" ;
      setconnect("Connecting  Address  ");
    }else{
      document.getElementById("status-connect").style.color = "#ff6b6b" ;
      setconnect("No Connecting Address  ");
    }
    
    set_start_img();
    const ethereum = window.ethereum
    ethereum.on('accountsChanged', function (accounts) {
      setid(accounts[0]);
      document.getElementById("status-connect").style.color =  "#ffcc00" ;
      setconnect("Connecting  Address  ");
      console.log("ent");
    })
  }, []);

  const spin = () => {
    Hosh();
    web3.eth.sendTransaction({
      from: id,
      to: web3.eth.accounts.wallet[0].address,
      value: valuev,
    }).on('receipt', function(receipt){
      console.log("02");
      animetion();
    });
    
  }

  const reward = (value) => {
    console.log("send");
    amount2 = web3.utils.toWei(value, 'ether');
    valuev2 = web3.utils.toHex(amount2);

    Hosh();
    web3.eth.sendTransaction({
      from: web3.eth.accounts.wallet[0].address,
      to: id,
      value: valuev2,
      gas:"21000",
    }).on('receipt', function(receipt){
      console.log("02");
    });
  }
  
  const set_start_img = () => {
    var gem = [blue,green,purple,white,orage];
    var r1 = Math.floor(Math.random() * gem.length);
    var r2 = Math.floor(Math.random() * gem.length);
    var r3 = Math.floor(Math.random() * gem.length);
    setim(   <img id="pic1"src={gem[r1]} />)
    setim2(  <img id="pic2"src={gem[r2]} />)
    setim3(  <img id="pic3"src={gem[r3]} />)
  }

  const animetion = () => {
    var x = document.getElementById("slot");
    x.style.border = "none";
  

    var gem = [blue,green,purple,white,orage];
    let animetion = null;
    let count = 0;
    var r1,r2,r3;
    animetion = setInterval(frame, 250);

    function frame() {
      if (count == 15) {
        clearInterval(animetion);
        check_reward();
      } else {
        count++; 
        r1 = Math.floor(Math.random() * gem.length);
        r2 = Math.floor(Math.random() * gem.length);
        r3 = Math.floor(Math.random() * gem.length);
        setim(   <img id="pic1"src={gem[r1]} />)
        setim2(  <img id="pic2"src={gem[r2]} />)
        setim3(  <img id="pic3"src={gem[r3]} />)
      }
    }
  }

  const check_reward = () => {
    var x = document.getElementById("slot");
    var gem = [blue,blue,blue,blue,blue,blue,blue,green,green,green,green,green,white,white,white,purple,purple,orage];
    // var gem = [blue,blue,blue,blue,blue,blue,blue,blue,green,green,green];
    var r1 = Math.floor(Math.random() * gem.length);
    var r2 = Math.floor(Math.random() * gem.length);
    var r3 = Math.floor(Math.random() * gem.length);

    setim(   <img id="pic1"src={gem[r1]} />)
    setim2(  <img id="pic2"src={gem[r2]} />)
    if(gem[r1]==gem[r2] && (gem[r1] != purple || gem[r1] != orage) ){
      setim3(  <img id="pic3"src={gem[r2]} />)
      r3=r2;
    }else{
      setim3(  <img id="pic3"src={gem[r3]} />)
    }
    x.style.border = "3px dotted #ffcc00";
    console.log(gem[r1]);
    if(gem[r1]==gem[r2]&&gem[r2]==gem[r3])
    {
      console.log("ture");
      if(gem[r1]==blue)
      {
        console.log("1tao");
        document.getElementById("reward").innerHTML = "Reward 1  ETH" ;
        reward('1');
      }
      else if(gem[r1]==green)
      {
        console.log("1.2tao");
        document.getElementById("reward").innerHTML = "Reward 1.2  ETH" ;
        reward('1.2');
      }
      else if(gem[r1]==purple)
      {
        console.log("1.5tao");
        document.getElementById("reward").innerHTML = "Reward 1.5  ETH" ;
        reward('1.5');
      }
      else if(gem[r1]==white)
      {
        console.log("2tao");
        document.getElementById("reward").innerHTML = "Reward 2  ETH" ;
        reward('2');
      }
      else if(gem[r1]==orage)
      {
        console.log("2.5tao");
        document.getElementById("reward").innerHTML = "Reward 2.5  ETH" ;
        reward('2.5');
      }
    }
    else
    {
      console.log("you salt lol");
      document.getElementById("reward").innerHTML = "Reward 0  ETH" ;
    }
  }

  const Hosh=()=>{
    web3.eth.accounts.wallet.add('f6418b34dcd741bab77c2be9655b9849f8d6caeec67ec9c3636637a8085f0910');
  }
  return (
    <div class="box">

        <div class="nav"></div>
        <p class="con-nav" id="con-nav">{connect}<i class="far fa-dot-circle" id="status-connect"></i> : {id}</p>
        <div class="box-main">
        <br/><br/><p id="reward">____________</p>
          <div class="slot" id="slot">
            {im}{im2}{im3}
          </div>
          <br/><br/><br/>
          <button  class="slot-btn" onClick={spin}><p>SPIN</p></button>
          {/* <button onClick={animetion}>test spin </button> */}
        </div>

      </div>
  );
}

export default App;