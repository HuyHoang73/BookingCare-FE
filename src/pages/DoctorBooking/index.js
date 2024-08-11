import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import "../../CustomAntd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Option } from "antd/es/mentions";

export default function DoctorBooking() {
  // eslint-disable-next-line no-unused-vars
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

  const [isModalDeny, setIsModalDeny] = useState(false);
  const closeDenyModal = () => {
    setIsModalDeny(false);
  };
  const openDenyModal = () => {
    setIsModalDeny(true);
  };

  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const closeConfirmModal = () => {
    setIsModalConfirm(false);
  };

  const openConfirmModal = () => {
    setIsModalConfirm(true);
  };

  const datePickkerStyle = {
    width: "100%",
  };

  const isFormBookingOpen = (record) => {
    setIsModalOpen(true);
    setSelectedBooking(record);
  };
  const handleOkFormBooking = () => {
    setIsModalOpen(false);
  };
  const handleCancelFormBooking = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      align: "center",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      align: "center",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "Khoa khám",
      dataIndex: "major",
      align: "center",
    },
    {
      title: "Bác sĩ khám",
      dataIndex: "doctor",
      align: "center",
    },
    {
      title: "Thời gian khám",
      dataIndex: "timeBooking",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faEye} />}
            onClick={() => isFormBookingOpen(record)}
            title="Xem"
            size="large"
          ></Button>

          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faCircleCheck} />}
            onClick={openConfirmModal}
            title="Chấp nhận"
            size="large"
          ></Button>

          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faCircleXmark} />}
            onClick={openDenyModal}
            title="Từ chối"
            danger
            size="large"
          ></Button>
        </Space>
      ),
      width: "14%",
      align: "center",
    },
  ];

  const data = [
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
      dayBooking: "23/7/2024"
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
      status: "Chờ xử lý",
      timeBooking: "21/7/2024",
    },
  ];

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

  const dataWithKey = data.map((item) => ({ ...item, key: item.id }));

  var onFinish = (values) => {
    values.dayBookingFrom = dayBookingFrom;
    values.dayBookingTo = dayBookingTo;
    let finalValues = { ...values };
    console.log("sucess", finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
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
        <h1>Danh sách đặt lịch</h1>
        <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />
        <Table
          columns={columns}
          dataSource={dataWithKey}
          pagination={{ pageSize: 5 }}
          bordered="true"
        />
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
            <Form.Item label="Bác sĩ khám">
              <Input value={selectedBooking.doctor} readOnly />
            </Form.Item>
            <Form.Item label="Thời gian khám">
              <Input value={selectedBooking.dayBooking + " : " + selectedBooking.timeBooking} readOnly />
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
          <Button type="primary" size="large" danger onClick={closeDenyModal}>
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
          Bạn có chắc chắn muốn từ chối lịch hẹn này?
        </p>
      </Modal>

      {/* Alert Confirm Password */}
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
          <Button type="primary" size="large" danger ghost onClick={closeConfirmModal}>
            Hủy
          </Button>,
          <Button type="primary" size="large" onClick={closeConfirmModal}>
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
          Bạn có chắc chắn muốn khám bệnh cho lịch hẹn này?
        </p>
      </Modal>
    </>
  );
}
