import * as React from 'react';
import {
  SigningStargateClient,
  coin as create_coin,
  StdFee,
} from '@cosmjs/stargate';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { chainID, info_cosmos_tesnet, rpc } from './testnet_info';

const dwindow = window as KeplrWindow;

export default function Keplr2() {
  async function connect_and_send() {
    if (!dwindow.keplr) {
      alert('keplr not yet loaded');
      return;
    }

    dwindow.keplr.defaultOptions = {
      sign: { preferNoSetFee: true },
    };

    await dwindow.keplr.experimentalSuggestChain(info_cosmos_tesnet);
    await dwindow.keplr.enable(chainID);

    // @ts-ignore
    const offline_signer = dwindow.getOfflineSigner(chainID);
    const accounts = await offline_signer.getAccounts();
    const address = accounts[0].address;

    const client = await SigningStargateClient.connectWithSigner(
      rpc,
      offline_signer
    );

    const gas_limit = '80000';
    const fee: StdFee = {
      amount: [create_coin(1, 'uphoton')],
      gas: gas_limit,
    };

    const amount = 1000;
    const res = await client.sendTokens(
      address,
      'cosmos1kd63kkhtswlh5vcx5nd26fjmr9av74yd4sf8ve',
      [create_coin(amount, 'uphoton')],
      fee
    );

    console.log(res);
  }

  return (
    <button onClick={connect_and_send}>Keplr2: send with custom fee</button>
  );
}
