/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Form, Image, Input, message, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../CustomAntd.css";
import { createMajor } from "../../services/MajorServices";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddMajor() {
  const navigate = useNavigate();

  const backToListMajors = () => {
    navigate("/admin/majors");
  };

  const id = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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
    name: "Tim mạch",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxf1FTzCSJeGxDr2ktBGPaipS3yHFywyHHw&s",
    shortDescription: "Khám tim nè",
    description: "Mổ tim nào",
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

  const onFinish = async (values) => {
    values.image =
      "https://th.bing.com/th/id/OIP.Y50bz_Lk7pNqt0yUxHY5XgHaLH?w=119&h=180&c=7&r=0&o=5&pid=1.7";
    let finalValues = {
      id: id.id,
      ...values
    };

    try {
      const response = await createMajor(finalValues);
      message.success(response.data);
      console.log(response)
    } catch (error) {
      message.error("Thất bại");
      console.error("Failed:", error);
    }
    console.log(finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const formAddMajor = (
    <>
      <Form
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        {/* Tên chuyên khoa*/}
        <Form.Item
          label="Tên chuyên khoa"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy điền tên chuyên khoa!",
            },
          ]}
        >
          <Input placeholder="Nhập tên chuyên khoa" />
        </Form.Item>

        {/* Mô tả ngắn */}
        <Form.Item
          label="Mô tả ngắn"
          name="shortDescription"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả ngắn cho chuyên khoa!",
            },
          ]}
        >
          <Input placeholder="Nhập mô tả ngắn"/>
        </Form.Item>

        {/* Mô tả */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả cho chuyên khoa!",
            },
          ]}
        >
          <Input.TextArea rows={6} showCount maxLength={5000} />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // rules={[
          //   {
          //     required: true,
          //     message: "Hãy tải ảnh chuyên khoa!",
          //   },
          // ]}
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
        <h1>{id.id ? "Sửa thông tin chuyên khoa" : "Thêm mới chuyên khoa"}</h1>
        {formAddMajor}
      </Space>
    </>
  );
}
