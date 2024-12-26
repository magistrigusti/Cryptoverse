import React from 'react';
import { Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import NewsImage from '../images/joker-poker.png';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery();

  if (isFetching) return 'Loading...';
  if (error) return `Error occurred: ${error.message}`;
  if (!cryptoNews) return 'No data found';

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card className="news-card" hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img
                  src={news.thumbnail || NewsImage}
                  alt="news"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} // Установим размер изображений
                />
              </div>
              <p>
                {news.description.length > 100 
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  {news.provider && (
                    <>
                      <Avatar src={news.provider.image} alt="news" />
                      <Text className="provider-name">{news.provider.name}</Text>
                    </>
                  )}
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
