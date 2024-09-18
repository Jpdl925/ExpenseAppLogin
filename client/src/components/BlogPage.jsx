import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { getPublishedBlogItems } from "../Services/DataService";



const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() => {
    getThePublishedItems();
  }, [])

  const getThePublishedItems = async () => {
    let publishedItems = await getPublishedBlogItems();
    setBlogItems(publishedItems);
  }
  

  return (
    <>
      <h1 className="text-center">View Post Page</h1>
      <Container className="p-5">
        <Row>
          <Col>
            {blogItems.map((item, index) => (
              <Container key={index}>
                {
                index % 2 == 0 ? 
                
                  <Row key={index}>
                    <Col md={6}>
                      <Row style={{ border: "solid" }}>
                        <Col
                          style={{ border: "solid" }}
                          className="d-flex justify-content-center"
                          md={12}
                        >
                          {item.title}
                        </Col>
                        <Col md={12}>
                          <Row>
                            <Col
                              className="d-flex justify-content-center"
                              md={6}
                            ></Col>
                            <Col style={{ border: "solid" }} md={6}>
                            {item.date}
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          style={{ border: "solid" }}
                          className="d-flex justify-content-center"
                          md={12}
                        >
                          <Image src={item.image} width={"400px"} height={"200px"}/>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      style={{ border: "solid" }}
                      className="d-flex justify-content-center"
                      md={6}
                    >
                      {item.description}
                    </Col>
                  </Row>
                 : 
                  <Row key={index}>
                    <Col
                      style={{ border: "solid" }}
                      className="d-flex justify-content-center"
                      md={6}
                    >
                      {item.description}
                    </Col>
                    <Col md={6}>
                      <Row style={{ border: "solid" }}>
                        <Col
                          style={{ border: "solid" }}
                          className="d-flex justify-content-center"
                          md={12}
                        >
                          {item.title}
                        </Col>
                        <Col md={12}>
                          <Row>
                            <Col
                              className="d-flex justify-content-center"
                              md={6}
                            >
                              {item.publisherName}
                            </Col>
                            <Col
                              className="text-center"
                              style={{ border: "solid" }}
                              md={6}
                            >
                              {item.date}
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          style={{ border: "solid" }}
                          className="d-flex justify-content-center"
                          md={12}
                        >
                          <Image src={item.image} width={"400px"} height={"200px"}/>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                }
              </Container>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogPage;
