import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import "../../CustomAntd.css";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createUser } from "../../services/UserServices";
import { optionDegree, optionGender, optionMajor } from "../../utils/DefaultData";

export default function ListDoctor() {
  const [dateOfBirthFrom, setDateOfBirthFrom] = useState(null);
  const [dateOfBirthTo, setDateOfBirthTo] = useState(null);

  const inputNumberStyle = {
    width: "100%",
  };

  const dobFromChange = (date, dateString) => {
    setDateOfBirthFrom(dateString);
  };

  const dobToChange = (date, dateString) => {
    setDateOfBirthTo(dateString);
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      align: "center",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      align: "center",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      sorter: {
        compare: (a, b) => a.experience - b.experience,
        multiple: 3,
      },
      align: "center",
    },
    {
      title: "Bằng cấp",
      dataIndex: "certification",
      sorter: {
        compare: (a, b) => a.certification - b.certification,
        multiple: 2,
      },
      align: "center",
    },
    {
      title: "Trình độ",
      dataIndex: "degree",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`${record.id}/edit`}>
            <Button type="primary" icon={<FontAwesomeIcon icon={faPen} />}>
              Sửa
            </Button>
          </Link>
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faTrash} />}
            danger
          >
            Xóa
          </Button>
        </Space>
      ),
      width: "15%",
      align: "center",
    },
  ];

  const data = [
    {
      id: "abc",
      gmail: "hoangphamhuy275132@gmail.com",
      name: "Phạm Huy Hoàng",
      phoneNumber: "0985693949",
      experience: 15,
      certification: 25,
      degree: "GS",
      gender: "Nam"
    },
    {
      id: "2",
      name: "Cù Ngọc Tuấn Hưng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam"
    },
  ];

  const dataWithKey = data.map((item) => ({ ...item, key: item.id }));

  const onFinish = async (values) => {
    values.dateOfBirthFrom = dateOfBirthFrom;
    values.dateOfBirthTo = dateOfBirthTo;
    values.avatar =
      "https://th.bing.com/th/id/OIP.Y50bz_Lk7pNqt0yUxHY5XgHaLH?w=119&h=180&c=7&r=0&o=5&pid=1.7";
    let finalValues = {
      ...values,
    };
    try {
      const response = await createUser(finalValues);
      message.success(response.message);
    } catch (error) {
      message.error("Thất bại");
      console.error("Failed:", error);
    }
    console.log(finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const [form] = Form.useForm();

  const formSearchDoctor = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          {/* Họ tên */}
          <Col span={6}>
            <Form.Item label="Họ và tên" name="name">
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>

          {/* Địa chỉ */}
          <Col span={6}>
            <Form.Item label="Địa chỉ" name="address">
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>

          {/*Gmail*/}
          <Col span={6}>
            <Form.Item
              label="Gmail"
              name="gmail"
              rules={[
                {
                  type: "email",
                  message: "Hãy nhập đúng định dạng của gmail!",
                },
              ]}
            >
              <Input placeholder="Nhập gmail" />
            </Form.Item>
          </Col>

          {/* SĐT */}
          <Col span={6}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  pattern: /^[0-9]{0,12}$/,
                  message: "Hãy nhập đúng định dạng số điện thoại!",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>

          {/* Ngày sinh từ*/}
          <Col span={6}>
            <Form.Item label="Ngày sinh từ" name="dateOfBirthFrom">
              <DatePicker style={inputNumberStyle} onChange={dobFromChange} />
            </Form.Item>
          </Col>

          {/* Ngày sinh đến */}
          <Col span={6}>
            <Form.Item label="Ngày sinh đến" name="dateOfBirthTo">
              <DatePicker style={inputNumberStyle} onChange={dobToChange} />
            </Form.Item>
          </Col>

          {/* Giới tính */}
          <Col span={6}>
            <Form.Item label="Giới tính" name="gender">
              <Select style={{ width: "100%" }} placeholder="Chọn giới tính">
                {optionGender.map((option) => (
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

          {/* Dân tộc */}
          <Col span={6}>
            <Form.Item label="Dân tộc" name="ethnicity">
              <Input placeholder="Nhập dân tộc bác sĩ" />
            </Form.Item>
          </Col>

          {/* Số năm kinh nghiệm từ */}
          <Col span={6}>
            <Form.Item label="Số năm kinh nghiệm từ" name="experienceFrom">
              <InputNumber min={1} max={40} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số năm kinh nghiệm đến */}
          <Col span={6}>
            <Form.Item label="Số năm kinh nghiệm đến" name="experienceTo">
              <InputNumber min={1} max={40} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số bằng cấp từ */}
          <Col span={6}>
            <Form.Item label="Số bằng cấp từ" name="certificationFrom">
              <InputNumber min={1} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số bằng cấp đến */}
          <Col span={6}>
            <Form.Item label="Số bằng cấp đến" name="certificationTo">
              <InputNumber min={1} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/*Trình độ */}
          <Col span={6}>
            <Form.Item label="Chọn trình độ" name="degree">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chon trình độ"
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
                {optionDegree.map((option) => (
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

          {/*Chuyên khoa */}
          <Col span={6}>
            <Form.Item label="Chọn chuyên khoa" name="major">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chọn chuyên khoa"
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
                  <Option key={option.id} value={option.id} label={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
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
      children: formSearchDoctor,
    },
  ];

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h1>Thông tin bác sĩ</h1>
        <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />
        <Flex justify="flex-end">
          <Link to="/admin/doctors/create">
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              size="large"
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
        <Table
          columns={columns}
          dataSource={dataWithKey}
          pagination={{ pageSize: 5 }}
          bordered="true"
        />
      </Space>
    </>
  );
}
