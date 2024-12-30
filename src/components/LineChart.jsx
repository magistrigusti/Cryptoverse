import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Col, Row, Typography } from 'antd';

const { Title: AntTitle } = Typography;

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ sparkline, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  if (sparkline && sparkline.length) {
    // Временная метка генерируется для каждого значения
    for (let i = 0; i < sparkline.length; i += 1) {
      if (sparkline[i] !== null) { // игнорируем null значения
        coinPrice.push(sparkline[i]);
        coinTimestamp.push(`Point ${i + 1}`);
      }
    }
  }

  // Отладка данных для графика
  console.log('Coin Price:', coinPrice);
  console.log('Coin Timestamp:', coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <AntTitle className="chart-title" level={2}>
          {coinName} Price Chart
        </AntTitle>

        <Col className="price-container">
          <AntTitle className="price-change" level={5}>
            Change: {currentPrice} USD
          </AntTitle>

          <AntTitle className="current-price" level={5}>
            Current {coinName} Price: ${currentPrice}
          </AntTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
