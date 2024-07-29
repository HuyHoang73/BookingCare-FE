import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./ClientMajor.css";
import "../../base.css";
import Carosel from "../../components/Carosel";
import Search from "antd/es/input/Search";

export default function ClientMajor() {
  const onSearch = (value, _e, info) => console.log(value);
  return (
    <>
      <Carosel />
      <div className="major">
        <h2 className=" section_title_center">Chuyên khoa</h2>
        <Row>
          <Col xxl={{span: 8, offset: 8}} xl={{span: 10, offset: 7}} md={{span: 12, offset: 6}} sm={{span: 14, offset: 5}} xs={{span: 18, offset: 3}}>
            <Search
              placeholder="Nhập tên chuyên khoa"
              onSearch={onSearch}
              enterButton
              className="major_search"
              size="large"
            />
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 18, offset: 3 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[24, 66]}>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="major_item">
                  <div className="major_image">
                    <img
                      src="https://tamanhhospital.vn/wp-content/uploads/2020/12/khoa_ivf.png"
                      alt="major logo"
                    />
                  </div>
                  <Link className="major_name">TRUNG TÂM HỖ TRỢ SINH SẢN</Link>
                  <p className="major_intro">
                    Trang thiết bị hiện đại, chẩn đoán chính xác, đem đến kết
                    quả điều trị tốt, trong thời gian sớm nhất.
                  </p>
                  <Link className="link_with_line major_link">
                    + Xem chi tiết
                  </Link>
                </div>
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="major_item">
                  <div className="major_image">
                    <img
                      src="https://tamanhhospital.vn/wp-content/uploads/2020/12/khoa_ivf.png"
                      alt="major logo"
                    />
                  </div>
                  <Link className="major_name">TRUNG TÂM HỖ TRỢ SINH SẢN</Link>
                  <p className="major_intro">
                    Chẩn đoán chính xác, đem đến kết quả điều trị tốt, trong
                    thời gian sớm nhất.
                  </p>
                  <Link className="link_with_line major_link">
                    + Xem chi tiết
                  </Link>
                </div>
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="major_item">
                  <div className="major_image">
                    <img
                      src="https://tamanhhospital.vn/wp-content/uploads/2020/12/khoa_ivf.png"
                      alt="major logo"
                    />
                  </div>
                  <Link className="major_name">TRUNG TÂM HỖ TRỢ SINH SẢN</Link>
                  <p className="major_intro">
                    Chẩn đoán chính xác, đem đến kết quả điều trị tốt, trong
                    thời gian sớm nhất.
                  </p>
                  <Link className="link_with_line major_link">
                    + Xem chi tiết
                  </Link>
                </div>
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="major_item">
                  <div className="major_image">
                    <img
                      src="https://tamanhhospital.vn/wp-content/uploads/2020/12/khoa_ivf.png"
                      alt="major logo"
                    />
                  </div>
                  <Link className="major_name">TRUNG TÂM HỖ TRỢ SINH SẢN</Link>
                  <p className="major_intro">
                    Chẩn đoán chính xác, đem đến kết quả điều trị tốt, trong
                    thời gian sớm nhất.
                  </p>
                  <Link className="link_with_line major_link">
                    + Xem chi tiết
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
