import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News} from '../components';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching} = useGetCryptosQuery(12);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title className="heading" level={2}>
        Global Crypto Stats
      </Title>

      <Row>
        <Col span={12}>
          <Statistic title=" Total Cryptocurrencies " value={globalStats.total} />
        </Col>

        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>

        <Col span={12}>
          <Statistic title="Total Market Cap " value={millify(globalStats.totalMarketCap)} />
        </Col>

        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
        </Col>

        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title className="home-title" level={2} >
          Top 12 Crypto currencies in the world
        </Title>

        <Title className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Latest Crypto News
        </Title>

        <Title className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage;

