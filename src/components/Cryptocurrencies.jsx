import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  console.log(cryptos);

  return (
    <>
      <Row className="crypto-card-container" gutters={[32, 32]}>
        {cryptos.map((currency) => (
          <Col className="crypto-card" 
            xs={24} sm={12} lg={6}
            key={currency.id}
          >
            <Link to={`/crypto/${currency.id}`} >
              <Card title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >

              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies;