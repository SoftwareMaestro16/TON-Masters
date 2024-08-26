import { useState, useEffect, useRef } from 'react';
import { useTonConnectModal, useTonConnectUI, useTonWallet, CHAIN, toUserFriendlyAddress } from "@tonconnect/ui-react";
import './App.css';

interface HeaderProps {
    setWalletAddress: (address: string | null) => void;
}

export const Header = ({ setWalletAddress }: HeaderProps) => {
    const wallet = useTonWallet();
    const { open } = useTonConnectModal();
    const [tonConnectUi] = useTonConnectUI();
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletImageUrl, setWalletImageUrl] = useState<string | null>(null);
    const [walletAddress, setWalletAddressLocal] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy Address');

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (wallet) {
            setIsWalletConnected(true);
            if ('imageUrl' in wallet) {
                setWalletImageUrl(wallet.imageUrl);
            }
            const address = wallet.account?.address;
            if (address) {
                const friendly = toUserFriendlyAddress(address, wallet.account.chain === CHAIN.TESTNET);
                setWalletAddressLocal(friendly);
                setWalletAddress(friendly); // Update wallet address in App component
            } else {
                setWalletAddressLocal(null);
                setWalletAddress(null);
            }
        } else {
            setIsWalletConnected(false);
            setWalletImageUrl(null);
            setWalletAddressLocal(null);
            setWalletAddress(null);
        }
    }, [wallet, setWalletAddress]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDisconnect = async () => {
        try {
            await tonConnectUi.disconnect();
            setIsWalletConnected(false);
            setWalletImageUrl(null);
            setWalletAddressLocal(null);
            setWalletAddress(null);
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    const handleOpenModal = () => {
        if (!isWalletConnected) {
            open();
        }
    };

    const handleCopyAddress = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopyButtonText('Copied!');
            setTimeout(() => {
                setCopyButtonText('Copy Address');
            }, 2000);
        }
    };

    const truncateAddress = (address: string) => {
        if (address.length <= 8) return address;
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            padding: '10px',
            zIndex: 1000
        }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                {!isWalletConnected ? (
                    <button
                        onClick={handleOpenModal}
                        style={{
                            background: '#5dabf0', // Updated color
                            borderRadius: '15px',
                            border: '2px solid white',
                            color: 'white',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            outline: 'none',
                            boxShadow: 'none'
                        }}
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <button
                        ref={buttonRef}
                        onClick={() => setShowMenu(!showMenu)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'linear-gradient(45deg, #5dabf0, #4794d0)', // Gradient from #5dabf0 to a similar shade
                            border: '2px solid white',
                            borderRadius: '15px',
                            color: 'white',
                            padding: '7px 18px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            outline: 'none',
                            boxShadow: 'none'
                        }}
                    >
                        {walletImageUrl && (
                            <img
                                src={walletImageUrl}
                                height="35px"
                                width="35px"
                                style={{ borderRadius: '50%', marginRight: '10px' }}
                                alt="Wallet"
                            />
                        )}
                        <strong>{truncateAddress(walletAddress || '')}</strong>
                    </button>
                )}
                {showMenu && walletAddress && (
                    <div ref={menuRef} style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(45deg, #4794d0, #5dabf0)', // Updated gradient colors
                        borderRadius: '20px',
                        border: '2px solid white',
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                        padding: '4px',
                        zIndex: 1000,
                        width: buttonRef.current ? `${buttonRef.current.offsetWidth * 0.8}px` : 'auto',
                        opacity: showMenu ? 1 : 0,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}>
                        <button
                            onClick={handleCopyAddress}
                            style={{
                                display: 'block',
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                padding: '5px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                transition: 'background 0.3s',
                                marginBottom: '3px',
                                outline: 'none',
                                boxShadow: 'none'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#539bd9')} // Updated hover color
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                            {copyButtonText}
                        </button>
                        <button
                            onClick={handleDisconnect}
                            style={{
                                display: 'block',
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                padding: '5px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                transition: 'background 0.3s',
                                marginBottom: '5px',
                                outline: 'none',
                                boxShadow: 'none'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#539bd9')} // Updated hover color
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
