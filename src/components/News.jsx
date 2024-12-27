import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
// import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import NewsImage from '../images/joker-poker.png';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });


  if (!cryptoNews?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select className="select-news"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => console.log(value)}
            placeholder="Select a Crypto"
            optionFilterProp="children"
            showSearch
          >
            <Option></Option>
          </Select>
        </Col>
      )}
      {cryptoNews.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card className="news-card" hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img
                  src={news.thumbnail || NewsImage}
                  alt="news"
                  style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'cover', borderRadius: '10px' }} // Установим размер изображений
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
                  <Text className="provider-name">{news.name}</Text>
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
