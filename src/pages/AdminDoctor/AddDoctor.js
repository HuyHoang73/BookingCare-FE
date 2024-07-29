/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../CustomAntd.css";
import { Option } from "antd/es/mentions";
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

  var optionDegree = [
    {
      value: "1",
      label: "Giáo sư",
    },
    {
      value: "2",
      label: "Tiến sĩ",
    },
    {
      value: "3",
      label: "Thạc sĩ",
    },
    {
      value: "4",
      label: "Bác sĩ chuyên khoa",
    },
    {
      value: "5",
      label: "Bác sĩ",
    },
  ];

  var optionMajor = [
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

  //Gọi khi xem trước ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const data = {
    id: "1",
    gmail: "hoangphamhuy275132@gmail.com",
    name: "Phạm Huy Hoàng",
    phoneNumber: "0985693949",
    username: "gacon123",
    dateOfBirth: "07/03/2003",
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2dlIj6cKvUV7rgiBMxVKcNnIDV_xWUBgoysWfkz2sJwic6Chv"
  };

  useEffect(() => {
    if (id.id) {
      form.setFieldsValue(data);
      setFileList([
        {
          uid: `-1`,
          name: `image.png`,
          status: "done",
          url: data.image,
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

  const onFinish = (values) => {
    values.dateOfBirth = dateOfBirth;
    let finalValues = {
      id: id.id,
      ...values,
    };
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
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        {/* Tên bác sĩ*/}
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

        {/* Ngày sinh */}
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

        {/* Gmail*/}
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

        {/* SĐT */}
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

        {/* Tên đăng nhập*/}
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

        {/* Kinh nghiệm*/}
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

        {/* Bằng cấp*/}
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

        {/* Trình độ*/}
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
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
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

        {/* Chuyên khoa */}
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
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
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

        {/* Mô tả */}
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

        <Form.Item
          name="image"
          label="Hình ảnh"
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
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

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
