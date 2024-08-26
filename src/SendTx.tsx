import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { beginCell, Cell } from "@ton/core";
import { useState } from "react";
import { MainButton } from "./MainButton";

export const SendDeploy1 = ({ isButtonDisabled }: { isButtonDisabled: boolean }) => {
    const wallet = useTonWallet();
    const [tonConnectUi] = useTonConnectUI();
    const [, setTxInProgress] = useState(false);

    const onSendDeploy1 = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }

        setTxInProgress(true);

        try {
            const payloadCell = beginCell()
                .storeUint(0, 32)
                .storeStringTail("Hello")
                .endCell();

            const payload = payloadCell.toBoc().toString('base64');

            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
                        amount: "50000000",
                        payload
                    },
                    {
                        address: "UQC3aNO4krkuA7ZUiF5D6MuG1vfxHUDdoXYV8odp0sJZbqch",
                        amount: "50000000",
                    }
                ]
            };

            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });

            const imMsgCell = Cell.fromBase64(result.boc);
            console.log(imMsgCell);

        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };

    return (
        <MainButton
            text="TON Masters: Wallet"
            onClick={onSendDeploy1}
            color="#5dabf0"
            textColor="#FFFFFF"
            disabled={isButtonDisabled}
        />
    );
};

export const SendDeploy2 = ({ isButtonDisabled }: { isButtonDisabled: boolean }) => {
    const wallet = useTonWallet();
    const [tonConnectUi] = useTonConnectUI();
    const [, setTxInProgress] = useState(false);

    const onSendDeploy2 = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }

        setTxInProgress(true);

        try {
            const payloadCell = beginCell()
                .storeUint(0x00f4c826, 32)
                .endCell();

            const payload = payloadCell.toBoc().toString('base64');

            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "EQCZ52LU4PsK71IVjn4Ur599R4ZdsnT9ToAEqysot628BEdo",
                        amount: "50000000",
                        payload
                    },
                    {
                        address: "UQC3aNO4krkuA7ZUiF5D6MuG1vfxHUDdoXYV8odp0sJZbqch",
                        amount: "50000000",
                    }
                ]
            };

            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });

            const imMsgCell = Cell.fromBase64(result.boc);
            console.log(imMsgCell);

        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };

    return (
        <MainButton
            text="TON Masters: WebApps"
            onClick={onSendDeploy2}
            color="#5dabf0"
            textColor="#FFFFFF"
            disabled={isButtonDisabled}
        />
    );
};

export const SendDeploy3 = ({ isButtonDisabled }: { isButtonDisabled: boolean }) => {
    const wallet = useTonWallet();
    const [tonConnectUi] = useTonConnectUI();
    const [, setTxInProgress] = useState(false);

    const onSendDeploy3 = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }

        setTxInProgress(true);

        try {
            const payloadCell = beginCell()
                .storeUint(0x000f9847, 32)
                .endCell();

            const payload = payloadCell.toBoc().toString('base64');

            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "EQCZ52LU4PsK71IVjn4Ur599R4ZdsnT9ToAEqysot628BEdo",
                        amount: "50000000",
                        payload
                    },
                    {
                        address: "UQC3aNO4krkuA7ZUiF5D6MuG1vfxHUDdoXYV8odp0sJZbqch",
                        amount: "50000000",
                    }
                ]
            };

            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });

            const imMsgCell = Cell.fromBase64(result.boc);
            console.log(imMsgCell);

        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };

    return (
        <MainButton
            text="TON Masters: Testing"
            onClick={onSendDeploy3}
            color="#5dabf0"
            textColor="#FFFFFF"
            disabled={isButtonDisabled}
        />
    );
};

export const SendDeploy4 = ({ isButtonDisabled }: { isButtonDisabled: boolean }) => {
    const wallet = useTonWallet();
    const [tonConnectUi] = useTonConnectUI();
    const [, setTxInProgress] = useState(false);

    const onSendDeploy4 = async () => {
        if (!wallet) {
            console.error('Wallet is not connected');
            return;
        }

        setTxInProgress(true);

        try {
            const payloadCell = beginCell()
                .storeUint(0x0099fdf5, 32)
                .endCell();

            const payload = payloadCell.toBoc().toString('base64');

            const tx: SendTransactionRequest = {
                validUntil: Math.round(Date.now() / 1000) + 60 * 5,
                messages: [
                    {
                        address: "EQCZ52LU4PsK71IVjn4Ur599R4ZdsnT9ToAEqysot628BEdo",
                        amount: "50000000",
                        payload
                    },
                    {
                        address: "UQC3aNO4krkuA7ZUiF5D6MuG1vfxHUDdoXYV8odp0sJZbqch",
                        amount: "50000000",
                    }
                ]
            };

            const result = await tonConnectUi.sendTransaction(tx, {
                modals: 'all',
                notifications: ['error']
            });

            const imMsgCell = Cell.fromBase64(result.boc);
            console.log(imMsgCell);

        } catch (e) {
            console.error('Error sending transaction:', e);
        } finally {
            setTxInProgress(false);
        }
    };

    return (
        <MainButton
            text="TON Masters: Smart-Contracts"
            onClick={onSendDeploy4}
            color="#5dabf0"
            textColor="#FFFFFF"
            disabled={isButtonDisabled}
        />
    );
};

