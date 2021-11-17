import styles from "../styles/PoolStatistics.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, Fragment } from "react";
import { Pool } from "../interfaces/pool";
import { POOLS } from "../config/data/pools/dummy-pools";
import type { NextPage } from "next";
import PoolTableItem from "../components/PoolTableItem";

const PoolStatistics: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  function search(pools: Pool[]) {
    return pools.filter((pool: Pool) => {
      return (
        pool.title.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >
        -1
      );
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pool Statistics</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container-fluid">
          <div className="row">
            <div className={`${styles.pools_info} text-center`}>
              <h1 className={styles.name}>Pools</h1>
              <p>Trading</p>
            </div>
            <Link href="/">
              <a className={styles.card}>Home</a>
            </Link>
            <div className={styles.pools_tab_wrapper}>
              <div className={`${styles.tab_btn_wrapper} text-center`}>
                <button
                  className={`${styles.active} ${styles.btn} ${styles.tab_btnp}`}
                >
                  Best
                </button>
                <button className={`${styles.btn} ${styles.tab_btnp}`}>
                  Worst
                </button>
                <button className={`${styles.btn} ${styles.tab_btnp}`}>
                  Recent
                </button>
              </div>
              <div className={styles.pool_search_tab_wrapper}>
                <form action="#" method="post">
                  <input
                    aria-describedby="poolSearch"
                    className={styles.form_control}
                    id="poolSearch"
                    name="poolSearch"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Pool"
                    required
                    type="text"
                  />
                  <button
                    className={`${styles.btn} ${styles.btn_primary} d_flex align_items_center`}
                  >
                    <i className="fab fa-sistrix"></i>
                    Search
                  </button>
                </form>
              </div>
              <div
                id="best"
                className={`${styles.pool_search_tabs} ${styles.active}`}
              >
                <div className={styles.pools_responsive_table_wrapper}>
                  <table className={styles.table}>
                    {search(POOLS).length > 0 ? (
                      <Fragment>
                        {search(POOLS).map((pool: Pool) => (
                          <PoolTableItem pool={pool} key={pool.id} />
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No results for searched pools.</h4>
                    )}
                  </table>
                </div>
                <div className={`${styles.show_wrapper} text-center`}>
                  <a href="#">View More</a>
                </div>
              </div>
            </div>
          </div>
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

export default PoolStatistics;
