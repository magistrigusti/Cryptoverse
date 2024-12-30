import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  console.log(data)

  if (isFetching) return <Loader />;

  const exchangesList = data?.data?.exchanges || [];

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>

      <Row>
        {exchangesList.length > 0 ? (
          exchangesList.map((exchange) => (
            <Col span={24} key={exchange.id}>
              <Collapse>
                <Panel
                  key={exchange.id}
                  showArrow={false}
                  header={(
                    <Row key={exchange.id}>
                      <Col span={6}>
                        <Text><strong>{exchange.rank}</strong></Text>
                        <Avatar className="exchange-image" src={exchange.iconUrl} />
                        <Text><strong>{exchange.name}</strong></Text>
                      </Col>
                      <Col span={6}>${millify(exchange.volume)}</Col>
                      <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                      <Col span={6}>{millify(exchange.marketShare)}%</Col>
                    </Row>
                  )}
                >
                  {HTMLReactParser(exchange.description || '')}
                </Panel>
              </Collapse>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Text>No exchange data available.</Text>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Exchanges;
