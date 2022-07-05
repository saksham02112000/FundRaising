import logo from './logo.svg';
import './App.css';
import {ethers} from "ethers";
import CrowdFunding from "./artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";
import {useState} from "react";

function App() {

    const [balance, setBalance] = useState();
  const donateMoney = async () => {
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      // const provider = new ethers.providers.Web3Provider(window.ethereum)

      // await provider.send("eth_requestAccounts", []);
      // const signer = provider.getSigner()
        const url = "http://localhost:8545";
        const provider = new ethers.providers.JsonRpcProvider(url);

      const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, provider)
      console.log(contract)
      const signer = contract.connect(provider.getSigner());
      console.log(signer.getBalance());

      let x = 20;
      const funding = signer.contribute({
          value: ethers.utils.parseEther(x.toString())
      });
          console.log(funding);
  }

  const getBalanceT = async () => {
      if (typeof window.ethereum !== "undefined") {
          const url = "http://localhost:8545";
          const provider = new ethers.providers.JsonRpcProvider(url);
          const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

          const contract = new ethers.Contract(contractAddress, CrowdFunding.abi, provider);
          console.log(contract)
          const signer = contract.connect(provider.getSigner());

          try {
              const getBal = await signer.getBalance();
              console.log(ethers.utils.formatEther(getBal));
          } catch (error) {
              console.log("Error: ", error);
          }
      }
  }


  return (
    <div className="App">
      <button className="addMoney" onClick={donateMoney}>
        Donate Money
      </button>
        <button className="getBalance" onClick={getBalanceT}>
            Get Balance
        </button>
        Balance : {balance}
    </div>
  );
}

export default App;
