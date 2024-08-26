import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./Header.tsx";
import { useEffect, useState } from "react";
import WebAppSDK from '@twa-dev/sdk';
import { SendDeploy1, SendDeploy2, SendDeploy3, SendDeploy4 } from "./SendTx.tsx";

declare global {
  interface Window {
    Telegram?: any;
  }
}

function App() {
  const [isTg, setIsTg] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [, setFriendlyAddress] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState<boolean>(false);
  const [isThirdModalVisible, setIsThirdModalVisible] = useState<boolean>(false);
  const [isFourthModalVisible, setIsFourthModalVisible] = useState<boolean>(false);
  

  useEffect(() => {
    const isTgCheck = window.Telegram?.WebApp?.initData !== '';

    if (isTgCheck) {
      WebAppSDK.ready();
      WebAppSDK.enableClosingConfirmation();
      WebAppSDK.expand();
      WebAppSDK.headerColor = "#3c98e8";
      setIsTg(true);
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      const friendly = walletAddress; 
      setFriendlyAddress(friendly);
    } else {
      setFriendlyAddress(null);
    }
  }, [walletAddress]);

  const toggleModal = () => {
    setIsModalVisible(prev => !prev);
  };

  const toggleSecondModal = () => {
    setIsSecondModalVisible(prev => !prev);
  };

  const toggleThirdModal = () => {
    setIsThirdModalVisible(prev => !prev);
  };

  const toggleFourthModal = () => {
    setIsFourthModalVisible(prev => !prev);
  };




  return (
    <>
      {!isTg ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center',
          fontSize: '24px',
        }}>
          Access denied. Please open in Telegram.
        </div>
      ) : (
        <TonConnectUIProvider
          manifestUrl="https://ton-masters.vercel.app/tonconnect-manifest.json"
          uiPreferences={{
            borderRadius: 'm',
            colorsSet: {
              [THEME.DARK]: {
                connectButton: {
                  background: '#5dabf0'
                },
                accent: '#5dabf0',  
                telegramButton: '#3b8fd9',  
                background: {
                  qr: '#ffffff',
                  tint: '#5dabf0', 
                  primary: '#71abde',  
                  secondary: '#5dabf0',  
                  segment: '#5dabf0'  
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#ffffff'
                },
              }
            }
          }}
          actionsConfiguration={{
            modals: 'all',
            notifications: ['error'],
            twaReturnUrl: 'https://t.me/TonMastersMintBot/Mint'
          }}
        >

          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#ffffff',
            position: 'relative',
            top: '190px'
          }}>
            <h1 className="main-h1">
              TON Masters
            </h1>
            <h2 className="main-h2">
              Mint SBT from the TON Masters Series.
            </h2>
            <button
              onClick={toggleModal}
              style={{
                backgroundColor: '#5dabf0',
                border: '2px solid white',
                color: 'white',
                padding: '10px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px',
                width: '80%',
                maxWidth: '400px',
                textAlign: 'center',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              TON Masters: Wallets
            </button>
            <button
              onClick={toggleSecondModal}
              style={{
                backgroundColor: '#5dabf0',
                border: '2px solid white',
                color: 'white',
                padding: '10px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px',
                width: '80%',
                maxWidth: '400px',
                textAlign: 'center',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              TON Masters: WebApps
            </button>
            <button
              onClick={toggleThirdModal}
              style={{
                backgroundColor: '#5dabf0',
                border: '2px solid white',
                color: 'white',
                padding: '10px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px',
                width: '80%',
                maxWidth: '400px',
                textAlign: 'center',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              TON Masters: Testing
            </button>
            <button
              onClick={toggleFourthModal}
              style={{
                backgroundColor: '#5dabf0',
                border: '2px solid white',
                color: 'white',
                padding: '10px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px',
                width: '80%',
                maxWidth: '400px',
                textAlign: 'center',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              TON Masters: Smart-Contracts
            </button>
            {isModalVisible && (
              <div className="modal show">
                <div className="modal-content">
                  <img
                    src="https://ton-devrel.s3.eu-central-1.amazonaws.com/tal-tutorials/1-wallet/image.jpg"
                    alt="Wallet"
                  />
                  <button
                    onClick={toggleModal}
                    className="modal-close"
                  >
                    &times;
                  </button>
                  <SendDeploy1 isButtonDisabled={false} />
                </div>
              </div>
            )}
            {isSecondModalVisible && (
              <div className="modal show">
                <div className="modal-content">
                  <img
                    src="https://ton-devrel.s3.eu-central-1.amazonaws.com/tal-tutorials/3-twa/image.jpg"
                    alt="WebApp"
                  />
                  <button
                    onClick={toggleSecondModal}
                    className="modal-close"
                  >
                    &times;
                  </button>
                  <SendDeploy2 isButtonDisabled={false} />
                </div>
              </div>
            )}
            {isThirdModalVisible && (
              <div className="modal show">
                <div className="modal-content">
                  <img
                    src="https://ton-devrel.s3.eu-central-1.amazonaws.com/tal-tutorials/4-testing/image.jpg"
                    alt="Testing"
                  />
                  <button
                    onClick={toggleThirdModal}
                    className="modal-close"
                  >
                    &times;
                  </button>
                  <SendDeploy3 isButtonDisabled={false} />
                </div>
              </div>
            )}
            {isFourthModalVisible && (
              <div className="modal show">
                <div className="modal-content">
                  <img
                    src="https://ton-devrel.s3.eu-central-1.amazonaws.com/tal-tutorials/2-smart/image.jpg"
                    alt="Smart Contracts"
                  />
                  <button
                    onClick={toggleFourthModal}
                    className="modal-close"
                  >
                    &times;
                  </button>
                  <SendDeploy4 isButtonDisabled={false} />
                </div>
              </div>
            )}
          </div>
          {(isModalVisible || isSecondModalVisible || isThirdModalVisible || isFourthModalVisible) && <div className="blur-background"></div>}
          <Header setWalletAddress={setWalletAddress} />
          
        </TonConnectUIProvider>
      )}
    </>
  );
}

export default App;
