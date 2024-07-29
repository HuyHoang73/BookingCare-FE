import {
  Button,
  Col,
  Collapse,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../CustomAntd.css";
import { Link, useNavigate } from "react-router-dom";

export default function ListMajor() {
  const navigate = useNavigate();

  const goToAddMajor = () => {
    navigate("/admin/majors/create"); 
  }

  const inputNumberStyle = {
    width: "100%",
  };

  const columns = [
    {
      title: "Tên chuyên khoa",
      dataIndex: "name",
      width: "25%",
      align: "center",
      headerClassName: "custom-header",
      headerStyle: { backgroundColor: "#f0f0f0", color: "#1677FF" },
    },
    {
      title: "Số lượng bác sĩ",
      dataIndex: "numberOfDoctor",
      sorter: {
        compare: (a, b) => a.numberOfDoctor - b.numberOfDoctor,
        multiple: 3,
      },
      width: "20%",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "shortDescription",
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
      width: "20%",
      align: "center",
    },
  ];

  const data = [
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

  const dataWithKey = data.map((item) => ({ ...item, key: item.id }));

  var onFinish = (values) => {
    let finalValues = {};
    finalValues.name = values.name;
    finalValues.numberOfDoctorFrom = values.numberOfDoctorFrom;
    finalValues.numberOfDoctorTo = values.numberOfDoctorTo;
    console.log("sucess", finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const [form] = Form.useForm();

  const formSearchMajor = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          {/* Tên chuyên khoa */}
          <Col span={10}>
            <Form.Item label="Tên chuyên khoa" name="name">
              <Input placeholder="Nhập tên chuyên khoa" />
            </Form.Item>
          </Col>

          {/* Số bác sĩ từ */}
          <Col span={7}>
            <Form.Item label="Số lượng bác sĩ từ" name="numberOfDoctorFrom">
              <InputNumber min={1} max={40} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số bác sĩ đến */}
          <Col span={7}>
            <Form.Item label="Số lượng bác sĩ đến" name="numberOfDoctorTo">
              <InputNumber min={1} max={40} style={inputNumberStyle} />
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
      children: formSearchMajor,
    },
  ];

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h1>Thông tin chuyên khoa</h1>
        <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />
        <Flex justify="flex-end">
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              size="large"
              onClick={goToAddMajor}
            >
              Thêm mới
            </Button>
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
