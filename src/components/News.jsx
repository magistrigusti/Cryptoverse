import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import NewsImage from '../images/joker-poker.png';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  const { data: cryptosList } = useGetCryptosQuery(10);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    if (cryptoNews) {
      setNewsData(cryptoNews);
    }
  }, [cryptoNews]);

  if (isFetching) return 'Loading...';
  if (error) return `Error occurred: ${error.message}`;
  if (!newsData.length) return 'No news found';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
            className="select-news"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => setNewsCategory(value)}
            placeholder="Select a Crypto"
            optionFilterProp="children"
            showSearch
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptosList?.data?.coins.map((coin) => (
              <Option key={coin.id} value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {newsData.map((news, i) => (
        <Col key={news.url || i} xs={24} sm={12} lg={8}>
          <Card className="news-card" hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img
                  src={news.thumbnail || NewsImage}
                  alt="news"
                  style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'cover', borderRadius: '10px' }}
                />
              </div>
              <p>
                {news.description.length > 100 
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.thumbnail || NewsImage} />
                  <Text className="provider-name">{news.provider?.name}</Text>
                </div>
                <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
