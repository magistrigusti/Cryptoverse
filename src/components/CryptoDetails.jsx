import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { 
  MoneyCollectOutlined, 
  DollarCircleOutlined, 
  FundOutlined, 
  ExclamationCircleOutlined, 
  StopOutlined, TrophyOutlined, 
  CheckOutlined, NumberOutlined, 
  ThunderboltOutlined 
} from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  console.log(data)

  if (isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '1m', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title className="coin-name" level={2}>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>

        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>

      <Select className="select-timperiod"
        placeholder="Select Time Period"
        defaultValue="7d"
        onChange={(value) => setTimePeriod(value)}
      >
         {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value=statistics-heading">
            <Title className="coin-detailes-heading" level={3}>
              {cryptoDetails.name} Value Statistics
            </Title>

            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>

          {stats.map(({icon, title, value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>

              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value=statistics-heading">
            <Title className="coin-details-heading" level={3}>
               Other Statistics
            </Title>

            <p>
              An overview showing the stats of all cryptourrencies
            </p>
          </Col>

          {genericStats.map(({icon, title, value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>

              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title className="coin-details-heading" level={3}>
              What is {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>

          <Col className="coin-links">
            <Title classNam="coin-details-heading" level={3}>
              
            </Title>
          </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails;