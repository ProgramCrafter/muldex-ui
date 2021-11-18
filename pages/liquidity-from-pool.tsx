import styles from "../styles/Home.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SelectCurrency from "../components/SelectCurrency";
import { useState, ChangeEvent, useEffect } from "react";
import { BaseIcon } from "../components/BaseIcon";
import { CURRENCIES } from "../config/data/currency-exchanges/dummy-exchanges";
import type { NextPage } from "next";

const LiquidityFromPool: NextPage = () => {
  let tokenSet: Set<unknown> = new Set();
  const tether = CURRENCIES.currencies[5];
  const [currencies, setCurrencies] = useState(CURRENCIES.currencies);
  const [currencyA, setCurrencyA] = useState(CURRENCIES.currencies[0]);
  const [currencyB, setCurrencyB] = useState(tether);
  const [currencyAval, setCurrencyAval] = useState(
    CURRENCIES.currencies[0].sellRate
  );
  const [currencyBval, setCurrencyBval] = useState(tether.sellRate);

  function onSelectCurrency(code: string) {
    const currency = currencies.filter(
      (currency: any) => currency.code === code
    );
    setCurrencyA(currency[0]);
    setCurrencyAval(currencyBval * currencyA.sellRate);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>, currency: string) {
    if (currency === "A") {
      const newValueA: any | number = e.target.value; // Should be just number, dunno why TypeScript complains.
      setCurrencyAval(newValueA);
      setCurrencyBval(newValueA / currencyA.sellRate);
    } else if (currency === "B") {
      const newValueB: any | number = e.target.value; // Should be just number, dunno why TypeScript complains.
      setCurrencyAval(newValueB * currencyA.sellRate);
      setCurrencyBval(newValueB);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Exchange Token</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SelectCurrency
        currencies={currencies}
        isOne={true}
        onSelectCurrency={onSelectCurrency}
      />
      <div className="row">
        <div className="col-sm-6">
          <h3>{currencyA.name}</h3>
          {/* !IMPORTANT: ton.svg is broken! */}
          <BaseIcon
            key={currencyA.code.toLowerCase()}
            name={currencyA.code.toLowerCase()}
          />
          <div className="input-group">
            <input
              aria-describedby="currencyA"
              className="form-control"
              pattern="\d\.\d{2}"
              type="number"
              value={currencyAval}
              onChange={(e) => {
                onChangeHandler(e, "A");
              }}
            />
            <span className="input-group-addon" id="currencyA">
              {currencyA.code}
            </span>
          </div>
        </div>
        <div className="col-sm-6">
          <BaseIcon
            key={currencyB.code.toLowerCase()}
            name={currencyB.code.toLowerCase()}
          />
          <h3>{currencyB.name}</h3>
          <div className="input-group">
            <input
              aria-describedby="currencyB"
              className="form-control"
              onChange={(e) => {
                onChangeHandler(e, "B");
              }}
              pattern="\d\.\d{2}"
              type="number"
              value={currencyBval}
            />
            <span className="input-group-addon" id="currencyB">
              {currencyB.code}
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <p>
            Exchange Rate {`${currencyA.sellRate} ${currencyA.code}`} ={" "}
            {`${currencyB.sellRate} ${currencyB.code}`}
          </p>
        </div>
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Exchange Token</h1>
        <p className={styles.description}>
          Placeholder for Exchange Token description.
        </p>
        <div>
          <Link href="/">
            <a className={styles.card}>Home</a>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default LiquidityFromPool;
