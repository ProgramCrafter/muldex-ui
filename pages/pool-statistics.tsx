import dynamic from "next/dynamic";
import styles from "../styles/PoolStatistics.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { faCaretUp, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pool } from "../interfaces/pool";
import type { NextPage } from "next";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PoolStatistics: NextPage = () => {
  const [dataSample, setDataSample] = useState({
    chart: {
      height: 260,
      width: 450,
      type: "area",
    },
    options: {
      chart: {
        id: "basic-bar",
        sparkline: {
          enabled: false,
        },
        toolbar: {
          show: true,
        },
      },
      colors: ["#303757"],
      dataLabels: {
        enabled: false,
      },
      fill: {
        colors: ["#303757"],
        gradient: {
          shadeIntensity: 0.3,
          opacityFrom: 0.5,
          opacityTo: 1,
          stops: [0, 100],
        },
        type: "gradient",
      },
      markers: {
        hover: {
          size: 3,
          colors: ["#303757"],
        },
        size: 0,
      },
      stroke: {
        colors: ["#303757"],
        width: 3,
      },
      xaxis: {
        categories: [24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4],
      },
    },
    series: [
      {
        name: "Daily Value",
        data: [40, 65, 158, 68, 39, 109, 109, 259, 169, 190, 140],
      },
    ],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const pools: Pool[] = [
    { id: 1, title: "Pool 1" },
    { id: 2, title: "Pool 2" },
    { id: 3, title: "Pool 3" },
    { id: 4, title: "Pool 4" },
    { id: 5, title: "Pool 5" },
  ];

  function search(pools: any) {
    return pools.filter((pool: any) => {
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
            <div className={[styles.pools_info, "text-center"].join(" ")}>
              <h1 className={styles.name}>Pools</h1>
              <p>Trading</p>
            </div>
            <div className={styles.pools_tab_wrapper}>
              <div
                className={[styles.tab_btn_wrapper, "text-center"].join(" ")}
              >
                <button
                  className={[styles.active, styles.btn, styles.tab_btnp].join(
                    " "
                  )}
                >
                  Best
                </button>
                <button className={[styles.btn, styles.tab_btnp].join(" ")}>
                  Worst
                </button>
                <button className={[styles.btn, styles.tab_btnp].join(" ")}>
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
                    className={[
                      styles.btn,
                      styles.btn_primary,
                      "d_flex",
                      "align_items_center",
                    ].join(" ")}
                    type="submit"
                  >
                    <i className="fab fa-sistrix"></i> Search
                  </button>
                </form>
              </div>
              <div
                id="best"
                className={[styles.pool_search_tabs, styles.active].join(" ")}
              >
                <div className={styles.pools_responsive_table_wrapper}>
                  <table className={styles.table}>
                    {search(pools).length > 0 ? (
                      <Fragment>
                        {search(pools).map((pool: any) => (
                          <tr key={pool.id}>
                            <td className={styles.profile_info}>
                              <div className="d-flex align-items-center justify-content-start">
                                <div className={styles.wrapper}>
                                  <img
                                    alt={pool.title}
                                    src="/avatar_1.png"
                                    title={pool.title}
                                  />
                                </div>
                                <div className={styles.pool_name}>
                                  <p>{pool.title}</p>
                                </div>
                              </div>
                            </td>
                            <td className={styles.price_range}>
                              <div className="d-flex align-items-center justify-content-center">
                                <div className={styles.price}>
                                  <p>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                    3.91
                                  </p>
                                  <p>
                                    <FontAwesomeIcon icon={faCaretUp} />
                                    +8.12
                                  </p>
                                </div>
                                <Chart
                                  height={dataSample.chart.height}
                                  options={dataSample.options}
                                  series={dataSample.series}
                                  type="area"
                                  width={dataSample.chart.width}
                                />
                              </div>
                            </td>
                            <td>
                              <a
                                href="trade.html"
                                className={[styles.btn, "btn_primary"].join(
                                  " "
                                )}
                              >
                                SELL
                              </a>
                              <a
                                href="trade.html"
                                className={[styles.btn, "btn_primary"].join(
                                  " "
                                )}
                              >
                                BUY
                              </a>
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ) : (
                      <h4>No results for searched pools.</h4>
                    )}
                  </table>
                </div>
                <div className={[styles.show_wrapper, "text-center"].join(" ")}>
                  <a href="#">View More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href="/">
          <a className={styles.card}>Home</a>
        </Link>
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
