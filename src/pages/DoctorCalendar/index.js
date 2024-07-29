import {
  Button,
  Modal,
  Space,
  Tabs,
  Timeline,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Collapse,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSlash,
  faEye,
  faMagnifyingGlass,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Option } from "antd/es/mentions";

export default function DoctorCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dayBookingFrom, setDayBookingFrom] = useState(null);
  const [dayBookingTo, setDayBookingTo] = useState(null);

  const dayBookingFromChange = (date, dateString) => {
    setDayBookingFrom(dateString);
  };
  const dayBookingToChange = (date, dateString) => {
    setDayBookingTo(dateString);
  };
  const isFormBookingOpen = (item) => {
    setIsModalOpen(true);
    setSelectedBooking(item);
  };
  const handleOkFormBooking = () => {
    setIsModalOpen(false);
  };
  const handleCancelFormBooking = () => {
    setIsModalOpen(false);
  };

  const bookingData = [
    {
      day: "Monday",
      bookings: [
        {
          id: "1",
          createDate: "20/7/2024",
          dateOfBirth: "09/03/2003",
          major: "Gan",
          gmail: "hoangphamhuy275132@gmail.com",
          fullname: "Phạm Huy Hoàng",
          gender: "Nam",
          note: "Vàng da, tiểu đặc, chán ăn, liệu tôi có phải đã bị ngộ độc gan không hả bác sĩ ơi huhuhu",
          phone: "0985693949",
          status: "Chờ xử lý",
          timeBooking: "9h - 10h",
          dayBooking: "23/7/2024",
        },
        {
          id: "1",
          createDate: "20/7/2024",
          dateOfBirth: "09/03/2003",
          major: "Gan",
          gmail: "hoangphamhuy275132@gmail.com",
          fullname: "Cù Ngọc Tuấn Hưng",
          gender: "Nam",
          note: "Gãy tay cmnr",
          phone: "0985999900",
          status: "Chờ xử lý",
          timeBooking: "9h - 10h",
          dayBooking: "23/7/2024",
        },
        {
          id: "2",
          createDate: "20/7/2024",
          dateOfBirth: "09/03/2003",
          major: "Gan",
          gmail: "hoangphamhuy275132@gmail.com",
          fullname: "Lê Hoàng Minh Hà",
          gender: "Nữ",
          note: "Ngộ độc gan cmnr",
          phone: "0985693949",
          status: "Chờ xử lý",
          timeBooking: "10h - 11h",
          dayBooking: "24/7/2024",
        },
      ],
    },
    {
      day: "Tuesday",
      bookings: [
        { time: "8:00 - 9:00", fullname: "Khám bệnh nhân 3" },
        { time: "9:00 - 10:00", fullname: "Khám bệnh nhân 4" },
      ],
    },
    // Thêm dữ liệu cho các ngày khác
  ];

  const processBookingData = (data) => {
    return data.map((dayData) => {
      const groupedBookings = dayData.bookings.reduce((acc, booking) => {
        const existing = acc.find((b) => b.time === booking.timeBooking);
        if (existing) {
          existing.bookings.push(booking);
        } else {
          acc.push({ time: booking.timeBooking, bookings: [booking] });
        }
        return acc;
      }, []);
      return { ...dayData, bookings: groupedBookings };
    });
  };

  const processedData = processBookingData(bookingData);

  var onFinish = (values) => {
    values.dayBookingFrom = dayBookingFrom;
    values.dayBookingTo = dayBookingTo;
    let finalValues = { ...values };
    console.log("sucess", finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  var optionStatus = [
    {
      value: "Chưa xác nhận",
      label: "Chưa xác nhận",
    },
    {
      value: "Chờ xử lý",
      label: "Chờ xử lý",
    },
    {
      value: "Không tới khám",
      label: "Không tới khám",
    },
    {
      value: "Thành công",
      label: "Thành công",
    },
  ];

  const datePickkerStyle = {
    width: "100%",
  };

  const [form] = Form.useForm();

  const formSearchBooking = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          {/* Ngày đặt từ */}
          <Col span={8}>
            <Form.Item label="Ngày đặt từ" name="dayBookingFrom">
              <DatePicker
                style={datePickkerStyle}
                onChange={dayBookingFromChange}
              />
            </Form.Item>
          </Col>

          {/* Ngày đặt đến */}
          <Col span={8}>
            <Form.Item label="Ngày đặt đến" name="dayBookingTo">
              <DatePicker
                style={datePickkerStyle}
                onChange={dayBookingToChange}
              />
            </Form.Item>
          </Col>

          {/* Trạng thái */}
          <Col span={8}>
            <Form.Item label="Chọn trạng thái" name="status">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chon trạng thái"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.key ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.key ?? "").toLowerCase())
                }
              >
                {optionStatus.map((option) => (
                  <Option
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );

  const items = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: formSearchBooking,
    },
  ];

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h1>Lịch Khám Bệnh</h1>
        <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />
        <Tabs defaultActiveKey="Monday">
          {processedData.map((dayData) => (
            <Tabs.TabPane tab={dayData.day} key={dayData.day}>
              <Timeline mode="left">
                {dayData.bookings.map((group, index) => (
                  <Timeline.Item key={index} label={group.time}>
                    {group.bookings.map((item, subIndex) => (
                      <Row
                        gutter={16}
                        key={subIndex}
                        style={{ marginBottom: "10px" }}
                      >
                        <Col span={4}>{item.fullname}</Col>
                        <Col span={2}>{item.dateOfBirth}</Col>
                        <Col span={1}>{item.gender}</Col>
                        <Col span={2}>{item.phone}</Col>
                        <Col span={8}>{item.note}</Col>
                        <Col span={6}>
                          <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faEye} />}
                            style={{ marginLeft: 8 }}
                            onClick={() => isFormBookingOpen(item)}
                            ghost
                          >
                            Xem
                          </Button>
                          <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faStethoscope} />}
                            style={{ marginLeft: 8 }}
                            onClick={() => console.log("Khám bệnh", item)}
                          >
                            Khám
                          </Button>
                          <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faUserSlash} />}
                            style={{ marginLeft: 8 }}
                            danger
                            onClick={() => console.log("Không đến", item)}
                          >
                            Không đến
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Space>
      <Modal
        title={<p className="ant-modal-title">Thông tin lịch khám</p>}
        open={isModalOpen}
        onOk={handleOkFormBooking}
        onCancel={handleCancelFormBooking}
        zIndex={10}
      >
        {selectedBooking && (
          <Form layout="vertical">
            <Form.Item label="Họ và tên">
              <Input value={selectedBooking.fullname} readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Ngày sinh">
                  <Input value={selectedBooking.dateOfBirth} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giới tính">
                  <Input value={selectedBooking.gender} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Gmail">
              <Input value={selectedBooking.gmail} readOnly />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input value={selectedBooking.phone} readOnly />
            </Form.Item>
            <Form.Item label="Khoa khám">
              <Input value={selectedBooking.major} readOnly />
            </Form.Item>
            <Form.Item label="Thời gian khám">
              <Input
                value={
                  selectedBooking.dayBooking +
                  " : " +
                  selectedBooking.timeBooking
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input.TextArea rows={4} value={selectedBooking.note} readOnly />
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Input value={selectedBooking.status} readOnly />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
