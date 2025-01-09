import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Table, ButtonGroup } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDollarSign, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement , Tooltip, Legend);

const generateWeekdays = (startDate: string, days: number) => {
  const result = [];
  let date = new Date(startDate);
  while (result.length < days) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      // Skip weekends
      result.push(date.toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() - 1);
  }
  return result.reverse();
};

const SmallFinancialCharts = () => {
  const maxDays = 30; // Maximum days for data (e.g., 6 weeks of weekdays)
  const totalWeeks = Math.ceil(maxDays / 5);
  const [chartIndex, setChartIndex] = useState(0);

  const getChartLabels = (index: number) => {
    const startDate = new Date('2024-11-24'); // Reference date
    startDate.setDate(startDate.getDate() - index * 5); // Adjust by 5 weekdays
    return generateWeekdays(startDate.toISOString().split('T')[0], 5);
  };

  const [chartData, setChartData] = useState({
    labels: getChartLabels(0), // Initial labels (most recent 5 days)
    datasets: [
      {
        label: 'Deposits from new investors',
        data: [1000, 1200, 1100, 1050, 1150], // Example data
        borderColor: 'rgb(94, 123, 88)',
        backgroundColor: 'rgb(184, 214, 177)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Payout to investors',
        data: [800, 850, 900, 870, 950], // Example data
        borderColor: 'rgb(28, 52, 23)',
        backgroundColor: 'rgb(28, 52, 23)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Trading Profits',
        data: [200, 350, 200, 180, 200], // Example data
        borderColor: '#28a745',
        backgroundColor: '#28a745',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  });

  const updateChart = (direction: 'backward' | 'forward') => {
    const newIndex = direction === 'backward' ? chartIndex - 1 : chartIndex + 1;
    const newLabels = getChartLabels(newIndex);

    // Generate new dummy data for demonstration
    const newRevenueData = newLabels.map(() => Math.random() * 1000 + 1000);
    const newExpensesData = newLabels.map(() => Math.random() * 200 + 800);
    const newProfitData = newLabels.map(() => Math.random() * 200 + 100);

    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Revenue\n',
          data: newRevenueData,
          borderColor: '#007bff',
          backgroundColor: '#007bff',
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: 'Expenses',
          data: newExpensesData,
          borderColor:'#dc3545',
          backgroundColor: '#dc3545',
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: 'Profit',
          data: newProfitData,
          borderColor: '#28a745',
          backgroundColor: '#28a745',
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    });

    setChartIndex(newIndex);
  };

  return (
    <div className="mt-2">
   
      <Row className="mt-4">
      
        <Col>
        
          <div style={{ maxHeight: '400px', overflow: 'auto',backgroundColor:'white' }}>
          <Line
  data={chartData}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw.toFixed(2)} USD`, // Adds currency symbol to tooltip
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid:{
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            // Format the date label for vertical display
            const date = new Date(chartData.labels[index]);
            const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US');

            // Break the date string into rows using '\n'
            return formattedDate.replace(',', '').replace(/\s/g, '\n');
          },
          maxRotation: 0, // Prevent default rotation
          minRotation: 0, // Keep vertical alignment
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (USD)',
        },
        grid:{
          display: false,
        },
        beginAtZero: true,
      },
    },
  }}
  style={{ height: '300px', width: '100%' }}
/>

          </div>
        </Col>
      </Row>

      {/* Scrollable Buttons */}
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {chartIndex > 0 && (
              <Button variant="primary" onClick={() => updateChart('backward')}>
                Load Previous 5 Days
              </Button>
            )}
            {chartIndex < totalWeeks - 1 && (
              <Button variant="secondary" onClick={() => updateChart('forward')}>
                Load Next 5 Days
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
     
    </div>
  );
};

export default SmallFinancialCharts;
