import React from "react";
import { Pie, Column } from "@ant-design/plots";
import { format } from "fecha";
import { Card, Col, Row, Space, Statistic } from "antd";

export default function AdminHome() {
  const dataDoctor = [
    {
      id: "abc",
      gmail: "hoangphamhuy275132@gmail.com",
      name: "Phạm Huy Hoàng",
      phoneNumber: "0985693949",
      experience: 15,
      certification: 25,
      degree: "GS",
      gender: "Nam",
      dateOfBirth: "07/03/2003",
    },
    {
      id: "2",
      name: "Cù Ngọc Tuấn Hưng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth: "18/05/2003",
    },
    {
      id: "3",
      name: "Trần Đình Hoan",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth: "18/05/2003",
    },
    {
      id: "4",
      name: "Đỗ Văn Hùng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth: "18/05/2003",
    },
    {
      id: "5",
      name: "Lê Tuấn Hưng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth: "18/05/2003",
    },
    {
      id: "6",
      name: "Đào Xuân Đông",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth: "18/05/2003",
    },
  ];

  const dataMajor = [
    {
      id: "1",
      name: "Tim mạch",
      numberOfDoctor: 100,
      shortDescription: "Khám tim nè",
    },
    {
      id: "2",
      name: "Răng",
      numberOfDoctor: 105,
      shortDescription: "Nhổ răng nè",
    },
  ];

  const dataBooking = [
    {
      id: "1",
      createDate: "20/7/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Chờ xử lý",
      timeBooking: "9h - 10h",
      dayBooking: "23/7/2024",
    },
    {
      id: "2",
      createDate: "10/7/2024",
      dateOfBirth: "18/05/2003",
      major: "Nam khoa",
      doctor: "Bảnk",
      gmail: "hungtuancn@gmail.com",
      fullname: "Cù",
      phone: "0985123456",
      status: "Thành công",
      timeBooking: "10h - 11h",
      dayBooking: "23/7/2024",
    },
    {
      id: "3",
      createDate: "21/7/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Chờ xác nhận",
      timeBooking: "14h - 15h",
      dayBooking: "23/7/2024",
    },
    {
      id: "4",
      createDate: "21/7/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Đã xử lý",
      timeBooking: "14h - 15h",
      dayBooking: "23/7/2024",
    },
    {
      id: "5",
      createDate: "19/7/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Đã từ chối",
      timeBooking: "14h - 15h",
      dayBooking: "23/7/2024",
    },
    {
      id: "6",
      createDate: "19/7/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Không tới khám",
      timeBooking: "14h - 15h",
      dayBooking: "23/7/2024",
    },
    {
      id: "7",
      createDate: "19/6/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Không tới khám",
      timeBooking: "7h - 8h",
      dayBooking: "23/7/2024",
    },
    {
      id: "8",
      createDate: "19/7/2024",
      dateOfBirth: "09/03/2003",
      major: "Gan",
      doctor: "Gà Con",
      gmail: "hoangphamhuy275132@gmail.com",
      fullname: "Phạm Huy Hoàng",
      gender: "Nam",
      note: "Ngộ độc gan cmnr",
      phone: "0985693949",
      status: "Thành công",
      timeBooking: "20h - 21h",
      dayBooking: "13/7/2024",
    },
  ];

const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const sortedDataBooking = [...dataBooking].sort((a, b) => 
  new Date(formatDate(a.createDate)) - new Date(formatDate(b.createDate))
);

// Tạo đối tượng để đếm số lượng booking theo ngày và trạng thái
const countByDateAndStatus = sortedDataBooking.reduce((acc, booking) => {
  const { createDate, status } = booking;
  const formattedDate = formatDate(createDate);

  if (!acc[formattedDate]) {
      acc[formattedDate] = {};
  }
  if (acc[formattedDate][status]) {
      acc[formattedDate][status] += 1;
  } else {
      acc[formattedDate][status] = 1;
  }
  return acc;
}, {});

const dataDateBooking = Object.keys(countByDateAndStatus).map(date => ({
  date,
  close: Object.values(countByDateAndStatus[date]).reduce((sum, count) => sum + count, 0)
}));

  // Tạo đối tượng để đếm số lượng booking cho từng trạng thái
  const countByStatus = dataBooking.reduce((acc, booking) => {
    const status = booking.status;
    if (acc[status]) {
      acc[status] += 1;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  const dataStatus = Object.keys(countByStatus).map((status) => ({
    type: status,
    value: countByStatus[status],
  }));

  // Tạo đối tượng để đếm số lượng booking cho từng khung giờ
  const countByTime = dataBooking.reduce((acc, booking) => {
    const time = booking.timeBooking;
    if (acc[time]) {
      acc[time] += 1;
    } else {
      acc[time] = 1;
    }
    return acc;
  }, {});

  const dataTime = Object.keys(countByTime).map((time) => ({
    type: time,
    value: countByTime[time],
  }));

  const config = {
    data: dataDateBooking,
    xField: 'date', // Ensure your data field is 'date'
    yField: 'close',
    axis: { x: { title: false, size: 40 }, y: { title: false, size: 36 } },
    slider: {
      x: { 
        labelFormatter: (d) => format(new Date(d), 'dd/MM/yyyy') // Format the date to "day/month/year"
      },
      y: { labelFormatter: "~s" },
    },
  };

  const config2 = {
    data: dataStatus,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 3,
      },
    },
    scale: {
      color: {
        palette: ['#FF6600', '#FFFF00', '#2F9A00', '#1677FF', '#660066', '#CD0000'],
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

  const config3 = {
    data: dataTime,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    scale: {
      color: {
        palette: ['#660066', '#9A0066', '#CD0000', '#FF3000', '#FF6600', '#FF9A00', '#FFFF00', '#66CD00', '#2F9A00', '#006666', '#1677FF', '#00309A', '#000066'],
        offset: (t) => t * 0.8 + 0.1,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Tâm Anh\nHospital",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row gutter={[60, 60]}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="Bác sĩ" value={dataDoctor.length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="Chuyên khoa" value={dataMajor.length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="Lịch khám" value={dataBooking.length} />
            </Card>
          </Col>

          <Col span={12}>
            <h1 style={{textAlign: "center", marginBottom: "10px"}}>Số lượng lịch khám</h1>
            <Column {...config} />
          </Col>

          <Col span={12}>
            <h1 style={{textAlign: "center",  marginBottom: "10px"}}>Tỷ lệ trạng thái lịch khám</h1>
            <Pie {...config2} />
          </Col>

          <Col span={12}>
            <h1 style={{textAlign: "center",  marginBottom: "10px"}}>Tỷ lệ lịch khám theo khung giờ</h1>
            <Pie {...config3} />
          </Col>
        </Row>
      </Space>
    </>
  );
}
