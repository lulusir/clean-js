import React from 'react'
import { Layout, Card, Col, Row } from 'antd';
import { history } from 'umi';

const { Header, Content } = Layout;

const Index = () => {
  return (
    <Layout>
      <Header>Examples</Header>
      <Content>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Base usage" onClick={() => {
              history.push('/base')
            }} bordered={false}>
              Base usage
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Table" onClick={() => {
              history.push('/table')
            }} bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Index
