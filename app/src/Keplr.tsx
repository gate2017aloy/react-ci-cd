import * as React from 'react';
import { StargateClient } from '@cosmjs/stargate';
import { Window as KeplrWindow } from '@keplr-wallet/types';

const dwindow = window as KeplrWindow;

export default function Keplr() {
  async function connect() {
    if (!dwindow.keplr) {
      alert('keplr not yet loaded ');
      return;
    }

    const chain_id = 'cosmoshub-3';
    const test = 'cosmoshub-testnet';

    await dwindow.keplr.enable(chain_id);

    // @ts-ignore
    const offline_signer = dwindow.getOfflineSigner(chain_id);
    const accounts = await offline_signer.getAccounts();
    const address = accounts[0].address;

    const client = await StargateClient.connect(
      //this works cosmoshub-tesnet
      'https://rpc.testnet.cosmos.network:443'
      //this doesn't work 'cosmoshub-3
      // 'https://node-cosmoshub-3.keplr.app/rpc'
    );

    const _acc = await client.getAccount(address);
    console.log(_acc);
  }

  return <button onClick={connect}>Keplr1: get account via cosmJS</button>;
}
