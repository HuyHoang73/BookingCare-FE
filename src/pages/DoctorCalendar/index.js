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
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSlash,
  faEye,
  faMagnifyingGlass,
  faStethoscope,
  faCircleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { optionStatus } from "../../utils/DefaultData";
import { getAllBookings, getCalendars, updateBooking } from "../../services/BookingServices";

export default function DoctorCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dayBookingFrom, setDayBookingFrom] = useState(null);
  const [dayBookingTo, setDayBookingTo] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [selectId, setSelectId] = useState(null);

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

  const [isModalDeny, setIsModalDeny] = useState(false);
  const closeDenyModal = () => {
    setIsModalDeny(false);
    setSelectId(null);
  };
  const openDenyModal = (id) => {
    setSelectId(id);
    setIsModalDeny(true);
  };
  const denyBooking = async () => {
    if (selectId) {
      try {
        closeConfirmModal();
        await updateBooking({ id: selectId, status: "failure" });
        const fetchApi = async () => {
          const result = await getAllBookings({});
          if (Array.isArray(result.data)) {
            setBookingData(result.data);
          } else {
            setBookingData([]);
          }
        };
        fetchApi();
        message.success("Thành công!");
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        message.error("Thất bại.");
      }
    }
  };

  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const closeConfirmModal = () => {
    setSelectId(null);
    setIsModalConfirm(false);
  };

  const openConfirmModal = (id) => {
    setSelectId(id);
    setIsModalConfirm(true);
  };

  const acceptBooking = async () => {
    if (selectId) {
      try {
        closeConfirmModal();
        await updateBooking({ id: selectId, status: "success" });
        const fetchApi = async () => {
          const result = await getAllBookings({});
          if (Array.isArray(result.data)) {
            setBookingData(result.data);
          } else {
            setBookingData([]);
          }
        };
        fetchApi();
        message.success("Thành công!");
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        message.error("Thất bại.");
      }
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCalendars();
      if (Array.isArray(result.data)) {
        setBookingData(result.data);
      } else {
        setBookingData([]);
      }
    };
    fetchApi();
  }, []);

  // const bookingData = [
  //   {
  //     day: "Monday",
  //     bookings: [
  //       {
  //         id: "1",
  //         createdDate: "20/7/2024",
  //         dateOfBirth: "09/03/2003",
  //         major: "Gan",
  //         gmail: "hoangphamhuy275132@gmail.com",
  //         fullname: "Phạm Huy Hoàng",
  //         gender: "Nam",
  //         note: "Vàng da, tiểu đặc, chán ăn, liệu tôi có phải đã bị ngộ độc gan không hả bác sĩ ơi huhuhu",
  //         phoneNumber: "0985693949",
  //         status: "Chờ xử lý",
  //         timeBooking: "9h - 10h",
  //         dayBooking: "23/7/2024",
  //       },
  //       {
  //         id: "1",
  //         createdDate: "20/7/2024",
  //         dateOfBirth: "09/03/2003",
  //         major: "Gan",
  //         gmail: "hoangphamhuy275132@gmail.com",
  //         fullname: "Cù Ngọc Tuấn Hưng",
  //         gender: "Nam",
  //         note: "Gãy tay cmnr",
  //         phoneNumber: "0985999900",
  //         status: "Chờ xử lý",
  //         timeBooking: "9h - 10h",
  //         dayBooking: "23/7/2024",
  //       },
  //       {
  //         id: "2",
  //         createdDate: "20/7/2024",
  //         dateOfBirth: "09/03/2003",
  //         major: "Gan",
  //         gmail: "hoangphamhuy275132@gmail.com",
  //         fullname: "Lê Hoàng Minh Hà",
  //         gender: "Nữ",
  //         note: "Ngộ độc gan cmnr",
  //         phoneNumber: "0985693949",
  //         status: "Chờ xử lý",
  //         timeBooking: "10h - 11h",
  //         dayBooking: "24/7/2024",
  //       },
  //     ],
  //   },
  //   {
  //     day: "Tuesday",
  //     bookings: [
  //       {
  //         id: "1",
  //         createdDate: "20/7/2024",
  //         dateOfBirth: "09/03/2003",
  //         major: "Gan",
  //         gmail: "hoangphamhuy275132@gmail.com",
  //         fullname: "Phạm Huy Hoàng",
  //         gender: "Nam",
  //         note: "Vàng da, tiểu đặc, chán ăn, liệu tôi có phải đã bị ngộ độc gan không hả bác sĩ ơi huhuhu",
  //         phoneNumber: "0985693949",
  //         status: "Chờ xử lý",
  //         timeBooking: "9h - 10h",
  //         dayBooking: "23/7/2024",
  //       },
  //       {
  //         id: "1",
  //         createdDate: "20/7/2024",
  //         dateOfBirth: "09/03/2003",
  //         major: "Gan",
  //         gmail: "hoangphamhuy275132@gmail.com",
  //         fullname: "Cù Ngọc Tuấn Hưng",
  //         gender: "Nam",
  //         note: "Gãy tay cmnr",
  //         phoneNumber: "0985999900",
  //         status: "Chờ xử lý",
  //         timeBooking: "9h - 10h",
  //         dayBooking: "23/7/2024",
  //       },
  //       {
  //         id: "2",
  //         createdDate: "20/7/2024",
  //         dateOfBirth: "09/03/2003",
  //         major: "Gan",
  //         gmail: "hoangphamhuy275132@gmail.com",
  //         fullname: "Lê Hoàng Minh Hà",
  //         gender: "Nữ",
  //         note: "Ngộ độc gan cmnr",
  //         phoneNumber: "0985693949",
  //         status: "Chờ xử lý",
  //         timeBooking: "10h - 11h",
  //         dayBooking: "24/7/2024",
  //       },
  //     ],
  //   },
  //   // Thêm dữ liệu cho các ngày khác
  // ];

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
                        <Col span={2}>{item.phoneNumber}</Col>
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
                          {item.status === "Chờ xử lý" && (
                            <>
                              <Button
                                type="primary"
                                icon={<FontAwesomeIcon icon={faStethoscope} />}
                                style={{ marginLeft: 8 }}
                                onClick={() => openConfirmModal(item.id)}
                              >
                                Khám
                              </Button>

                              <Button
                                type="primary"
                                icon={<FontAwesomeIcon icon={faUserSlash} />}
                                style={{ marginLeft: 8 }}
                                danger
                                onClick={() => openDenyModal(item.id)}
                              >
                                Không đến
                              </Button>
                            </>
                          )}
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
              <Input value={selectedBooking.phoneNumber} readOnly />
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

      {/* Alert Deny */}
      <Modal
        title={
          <span>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{
                color: "#FF4D4F",
                fontSize: "60px",
                textAlign: "center",
              }}
            />
          </span>
        }
        closable={false}
        open={isModalDeny}
        centered
        width={600}
        footer={[
          <Button type="primary" size="large" ghost onClick={closeDenyModal}>
            Hủy
          </Button>,
          <Button type="primary" size="large" danger onClick={denyBooking}>
            Từ chối
          </Button>,
        ]}
      >
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Xác nhận bệnh nhân không đến khám?
        </p>
      </Modal>

      {/* Alert Confirm */}
      <Modal
        title={
          <span>
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{
                color: "#1677FF",
                fontSize: "60px",
                textAlign: "center",
              }}
            />
          </span>
        }
        closable={false}
        open={isModalConfirm}
        centered
        width={650}
        footer={[
          <Button
            type="primary"
            size="large"
            danger
            ghost
            onClick={closeConfirmModal}
          >
            Hủy
          </Button>,
          <Button type="primary" size="large" onClick={acceptBooking}>
            Đồng ý
          </Button>,
        ]}
      >
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Xác nhận thăm khám thành công?
        </p>
      </Modal>
    </>
  );
}
