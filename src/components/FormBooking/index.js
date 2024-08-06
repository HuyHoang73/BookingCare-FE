import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import "./FormBooking.css";
import { Option } from "antd/es/mentions";
import { optionMajor } from "../../utils/DefaultData";

export default function FormBooking({
  isFormBookingOpen,
  handleOkFormBooking,
  handleCancelFormBooking,
}) {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  var optionDoctor = [
    {
      value: "1",
      label: "Phạm Huy Hoàng",
    },
    {
      value: "2",
      label: "Lê Hoàng Minh Hà",
    },
    {
      value: "3",
      label: "Trần Phương Lan",
    },
    {
      value: "4",
      label: "Lê Minh Phương",
    },
    {
      value: "5",
      label: "Vũ Phương Thảo",
    },
    {
      value: "6",
      label: "Nguyễn Hồng Nhung",
    },
  ];

  var optionTime = [
    {
      value: "1",
      label: "7h - 8h",
    },
    {
      value: "2",
      label: "8h - 9h",
    },
    {
      value: "3",
      label: "9h - 10h",
    },
    {
      value: "4",
      label: "10h - 11h",
    },
    {
      value: "5",
      label: "13h - 14h",
    },
    {
      value: "6",
      label: "16h - 17h",
    },
  ];

  var onFinish = (values) => {
    let finalValues = {};
    finalValues.name = values.name;
    finalValues.birthOfDate = values.birthOfDate.format("MM-DD-YYYY");
    finalValues.gmail = values.gmail;
    finalValues.phoneNumber = values.phoneNumber;
    finalValues.address = values.address;
    finalValues.majorId = values.majorId;
    finalValues.doctorId = values.doctorId;
    finalValues.dateBooking = values.dateBooking.format("MM-DD-YYYY");
    finalValues.timeBookingId = values.timeBookingId;
    console.log("sucess", finalValues);
    handleOkFormBooking();
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };
  return (
    <>
      <>
        <Modal
          title={<p className="ant-modal-title">Đặt lịch khám</p>}
          open={isFormBookingOpen}
          // onOk={handleOkFormBooking}
          onCancel={handleCancelFormBooking}
          footer={[]}
          zIndex={10}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/*Họ tên */}
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy điền họ và tên của bạn!",
                },
              ]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>

            {/*Ngày sinh */}
            <Form.Item
              label="Ngày sinh"
              name="birthOfDate"
              rules={[
                {
                  required: true,
                  message: "Hãy điền ngày sinh của bạn!",
                },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                format="MM/DD/YYYY"
                onChange={onChange}
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/*Gmail */}
            <Form.Item
              label="Gmail"
              name="gmail"
              rules={[
                {
                  required: true,
                  message: "Hãy điền địa chỉ gmail của bạn!",
                },
                {
                  type: "email",
                  message: "Hãy nhập đúng định dạng của gmail!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ Gmail" />
            </Form.Item>

            {/*Số điện thoại */}
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Hãy điền số điện thoại của bạn!",
                },
                {
                  pattern: /^[0-9]{0,12}$/,
                  message: "Hãy nhập đúng định dạng số điện thoại!",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>

            {/*Địa chỉ */}
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Hãy điền địa chỉ của bạn!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>

            {/*Chuyên khoa */}
            <Form.Item
              label="Chọn chuyên khoa"
              name="majorId"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn chuyên khoa bạn muốn khám!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chon chuyên khoa"
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
                {optionMajor.map((option) => (
                  <Option
                    key={option.id}
                    value={option.id}
                    label={option.label}
                  >
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/*Bác sĩ */}
            <Form.Item
              label="Chọn bác sĩ"
              name="doctorId"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn bác sĩ bạn muốn!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chon bác sĩ"
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
                {optionDoctor.map((option) => (
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

            {/*Ngày khám */}
            <Form.Item
              label="Chọn ngày khám"
              name="dateBooking"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn ngày bạn muốn thăm khám!",
                },
              ]}
            >
              <DatePicker
                placeholder="Chọn ngày khám"
                format="MM/DD/YYYY"
                onChange={onChange}
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/*Khung giờ khám */}
            <Form.Item
              label="Chọn khung giờ khám"
              name="timeBookingId"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn khung giờ bạn muốn khám!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chọn khung giờ khám"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.key ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.key ?? "").toLowerCase())
                }
              >
                {optionTime.map((option) => (
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

            <Form.Item className="submitArea">
              <Row>
                <Col sm={{ span: 8, offset: 8 }} xs={{ span: 14, offset: 5 }}>
                  <Row gutter={[20, 24]}>
                    <Col span={12}>
                      <Button key="back" onClick={handleCancelFormBooking}>
                        Quay lại
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button type="primary" htmlType="submit">
                        Đặt lịch
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </>
  );
}
