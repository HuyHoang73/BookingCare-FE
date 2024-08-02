import { Button, Col, Flex, Form, Input, message, Row, Select } from "antd";
import "../../base.css";
import "./ClientDoctor.css";
import { Link } from "react-router-dom";
import Carosel from "../../components/Carosel";
import "../ClientMajor/ClientMajor.css";
import { Option } from "antd/es/mentions";
import { optionDegree, optionMajor } from "../../utils/DefaultData";
import { createUser } from "../../services/UserServices";

export default function ListDoctorClient() {

  const [form] = Form.useForm();

  const onFinish = async (values) => {
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

  const data = [
    {
      id: "1",
      name: "Nguyễn Thị Liên Hương",
      description: "BS Nguyễn Thị Liên Hương đã có hơn 20 năm kinh nghiệm trong lĩnh vực Mô phôi học. Bên cạnh công tác chuyên môn, bác sĩ Liên Hương còn dành nhiều thời gian cho hoạt động nghiên cứu khoa học và đóng góp nhiều công trình nghiên cứu, bài báo khoa học trong lĩnh vực Mô phôi học.",
      degree: "GS",
      experience: 10,
      certification: 16,
      major: "Trung tâm hỗ trợ sinh sản",
      avatar: "https://tamanhhospital.vn/wp-content/uploads/2011/01/bac-si-nguyen-thi-lien-huong-avt.png",
      gender: "Nữ"
    },
    {
      id: "2",
      name: "Vũ Thị Mai Anh",
      description: "ThS.BS Vũ Thị Mai Anh là một bác sĩ trẻ giàu nhiệt huyết, bác sĩ Mai Anh luôn tích cực nghiên cứu và tiếp thu kiến thức mới ngay từ khi còn học tập tại Đại học Y Dược, Đại học Quốc gia Hà Nội.",
      degree: "TS",
      experience: 10,
      certification: 16,
      major: "Trung tâm mắt công nghệ cao",
      avatar: "https://tamanhhospital.vn/wp-content/uploads/2021/02/vu-thi-mai-anh-avt.png",
      gender: "Nữ"
    },
  ];

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <>
      <Carosel />
      <div className="major">
        <h2 className=" section_title_center">Chuyên gia - Bác sĩ</h2>
        <Row className="search_bar_client">
          <Col span={24}>
            <Row>
              {/* Tìm theo tên */}
              <Col
                xxl={{ span: 16, offset: 4 }}
                sm={{ span: 22, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Row gutter={24}>
                    {/* Họ tên */}
                    <Col xl={{span: 7}} sm={{span: 12}} xs={{span: 24}}>
                      <Form.Item label="Họ và tên" name="name">
                        <Input placeholder="Nhập họ và tên" size="large"/>
                      </Form.Item>
                    </Col>

                    {/*Trình độ */}
                    <Col xl={{span: 7}} sm={{span: 12}} xs={{span: 24}}>
                      <Form.Item label="Chọn trình độ" name="degree">
                        <Select
                          showSearch
                          size="large"
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
                    <Col xl={{span: 7}} sm={{span: 12}} xs={{span: 24}}>
                      <Form.Item label="Chọn chuyên khoa" name="major">
                        <Select
                          showSearch
                          size="large"
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
                            <Option
                              key={option.id}
                              value={option.id}
                              label={option.name}
                            >
                              {option.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Nút */}
                    <Flex align="end">
                      <Col span={3}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" size="large">
                            Tìm kiếm
                          </Button>
                        </Form.Item>
                      </Col>
                    </Flex>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            xxl={{ span: 18, offset: 3}}
            lg={{ span: 20, offset: 2 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[24, 66]}>
              {data.map((doctor) => (
                <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="doctor_item">
                  <div className="doctor_image">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                    />
                  </div>
                  <Link className="major_name" to={`/doctors/${doctor.id}`}>
                    {doctor.degree}.{doctor.name}
                  </Link>
                  <p className="major_intro doctor_major">
                    {doctor.major}
                  </p>
                  <p className="major_intro">
                    {truncateDescription(doctor.description, 200)}
                  </p>
                  <Link className="link_with_line major_link" to={`/doctors/${doctor.id}`}>
                    + Xem chi tiết
                  </Link>
                </div>
              </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
