/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../CustomAntd.css";
import { Option } from "antd/es/mentions";
import { createUser } from "../../services/UserServices";
import { optionDegree, optionGender, optionMajor } from "../../utils/DefaultData";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddDoctor() {
  const navigate = useNavigate();

  const backToListMajors = () => {
    navigate("/admin/majors");
  };

  const id = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const dobChange = (date, dateString) => {
    setDateOfBirth(dateString);
  };

  const datePickkerStyle = {
    width: "100%",
  };

  //Gọi khi xem trước ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const data = {
    id: "1",
    name: "Phạm Huy Hoàng",
    dateOfBirth: "2003-07-03",
    gmail: "hoangphamhuy275132@gmail.com",
    phoneNumber: "0985693949",
    username: "gacon123",
    experience: 2,
    certification: 3,
    degree: "GS",
    major: "Tim mạch",
    description: "admin tối cao",
    avatar: "https://taoanhdep.com/wp-content/uploads/2023/10/ai-350x265.jpg",
    gender: "Nam",
    address: "Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội",
    ethnicity: "Kinh",
    identity: "001203001218"
  };

  useEffect(() => {
    if (id.id) {
      form.setFieldsValue({
        ...data,
        dateOfBirth: moment(data.dateOfBirth, 'DD-MM-YYYY'),
      });
      setFileList([
        {
          uid: `-1`,
          name: `image.png`,
          status: "done",
          url: data.avatar,
        },
      ]);
    }
  }, [id.id, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const onFinish = async (values) => {
    values.dateOfBirth = dateOfBirth;
    values.avatar =
      "https://th.bing.com/th/id/OIP.Y50bz_Lk7pNqt0yUxHY5XgHaLH?w=119&h=180&c=7&r=0&o=5&pid=1.7";
    let finalValues = {
      id: id.id,
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

  const inputNumberStyle = {
    width: "100%",
  };

  const formAddDoctor = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={60}>
          <Col span={12}>
            <Row gutter={24}>
              {/* Avatar */}
              <Col span={24}>
                <Form.Item
                  name="avatar"
                  label="Ảnh đại diện"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                  >
                    {fileList.length >= 1 ? null : (
                      <>
                        <button
                          style={{
                            border: 0,
                            background: "none",
                          }}
                          type="button"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          <div>Tải ảnh lên</div>
                        </button>
                      </>
                    )}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: "none",
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </Form.Item>
              </Col>

              {/* Tên bác sĩ*/}
              <Col span={12}>
                <Form.Item
                  label="Tên bác sĩ"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập họ và tên của bác sĩ!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên bác sĩ" />
                </Form.Item>
              </Col>

              {/* Ngày sinh */}
              <Col span={12}>
                <Form.Item
                  label="Ngày sinh"
                  name="dateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập ngày sinh của bác sĩ!",
                    },
                  ]}
                >
                  <DatePicker style={datePickkerStyle} onChange={dobChange} />
                </Form.Item>
              </Col>

              {/* Giới tính */}
              <Col span={12}>
                <Form.Item
                  label="Giới tính"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chọn giới tính của bác sĩ!",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn giới tính"
                  >
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

              {/* Số CMT/CCCD */}
              <Col span={12}>
                <Form.Item
                  label="Số CMT/CCCD"
                  name="identity"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mã định danh của bác sĩ!",
                    },
                    {
                      pattern: /^[0-9]{12}$/,
                      message: "Hãy nhập đúng định dạng CMT/CCCD!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã định danh bác sĩ" />
                </Form.Item>
              </Col>

              {/* Dân tộc*/}
              <Col span={12}>
                <Form.Item
                  label="Dân tộc"
                  name="ethnicity"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập dân tộc của bác sĩ!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập dân tộc bác sĩ" />
                </Form.Item>
              </Col>

              {/* SĐT */}
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số điện thoại!",
                    },
                    {
                      pattern: /^[0-9]{0,12}$/,
                      message: "Hãy nhập đúng định dạng số điện thoại!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>

              {/* Gmail */}
              <Col span={24}>
                <Form.Item
                  label="Gmail"
                  name="gmail"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập gmail!",
                    },
                    {
                      type: "email",
                      message: "Hãy nhập đúng định dạng của gmail!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập gmail" />
                </Form.Item>
              </Col>

              {/* Địa chỉ*/}
              <Col span={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập địa chỉ của bác sĩ!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ bác sĩ" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row gutter={24}>
              {/* Tên đăng nhập*/}
              <Col span={24}>
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên đăng nhập của bác sĩ!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên đăng nhập của bác sĩ" />
                </Form.Item>
              </Col>

              {/* Kinh nghiệm*/}
              <Col span={12}>
                <Form.Item
                  label="Kinh nghiệm"
                  name="experience"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số năm kinh nghiệm của bác sĩ!",
                    },
                  ]}
                >
                  <InputNumber min={1} max={40} style={inputNumberStyle} />
                </Form.Item>
              </Col>

              {/* Bằng cấp*/}
              <Col span={12}>
                <Form.Item
                  label="Số bằng cấp"
                  name="certification"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số bằng cấp của bác sĩ!",
                    },
                  ]}
                >
                  <InputNumber min={1} style={inputNumberStyle} />
                </Form.Item>
              </Col>

              {/* Trình độ*/}
              <Col span={12}>
                <Form.Item
                  label="Chọn trình độ"
                  name="degree"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập trình độ bác sĩ!",
                    },
                  ]}
                >
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

              {/* Chuyên khoa */}
              <Col span={12}>
                <Form.Item
                  label="Chọn chuyên khoa"
                  name="majorId"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chuyên khoa của bác sĩ!",
                    },
                  ]}
                >
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

              {/* Mô tả */}
              <Col span={24}>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mô tả của bác sĩ!",
                    },
                  ]}
                >
                  <Input.TextArea rows={6} showCount maxLength={255} />
                </Form.Item>
              </Col>

              {/* Nút */}
              <Col span={24}>
                <Flex justify="center">
                  <Form.Item>
                    <Flex justify="center" gap="large">
                      <Button type="primary" htmlType="submit" size="large">
                        {id.id ? "Cập nhật" : "Thêm"}
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={backToListMajors}
                        size="large"
                      >
                        Quay lại
                      </Button>
                    </Flex>
                  </Form.Item>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h1>{id.id ? "Sửa thông tin bác sĩ" : "Thêm mới bác sĩ"}</h1>
        {formAddDoctor}
      </Space>
    </>
  );
}
