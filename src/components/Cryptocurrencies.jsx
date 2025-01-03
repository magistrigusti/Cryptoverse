import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(cryptos)

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input 
            placeholder="Search Cryptocurrency" 
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      )}

      <Row className="crypto-card-container" gutter={[32, 32]}>
        {cryptos?.map((currency) => (
          <Col 
            className="crypto-card" 
            xs={24} sm={12} lg={6}
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt="" />}
                hoverable
              >
                <p>Price: {Number(currency.price).toFixed(4)}</p>
                <p>Market Cap: {Number(currency.marketCap).toFixed(4)}</p>
                <p>Daily Change: {Number(currency.change).toFixed(4)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
