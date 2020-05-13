import React from 'react';
import { Input, Button, Row, Col, Form, Table, Card, Typography, Layout, Select, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import API from './API';
import './App.css';

const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const Paragraph = Typography.Paragraph;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const STOCK_TYPES = ['online', 'province', 'district', 'area', 'store'];

export default class O2ODemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      safetyStockMinusFactor: 1,
      safetyStockPercentFactor: 77,
      availableStockPercentFactor: 76,
      stockType: STOCK_TYPES[0]
    }
  }

  handleSearch = () => {
    this.setState({loading: true});
    const {stockType, skuId, unit} = this.state;
    API.getStock(stockType, skuId, unit).then(res => {
      this.setState({loading: false});
      if (res.success === true && res.result !== null) {
        this.setState({ dataSource: res.result })
      }
    })
  };

  renewSafetyStock = () => {
    this.setState({loading: true});
    const {safetyStockMinusFactor, safetyStockPercentFactor} = this.state;
    return fetch(`http://localhost:8000/v1/policy/safety-stock`, {
      method: "PUT",
      headers: API.getJsonTypeHeader(),
      body: JSON.stringify({
        "stockType": this.state.stockType,
        "minusFactor": parseInt(safetyStockMinusFactor),
        "percentFactor": parseFloat(safetyStockPercentFactor) / 100,
        "performBy": "donghoon.lee",
      })
    }).then(res => res.json()).then(res => {
      this.setState({loading: false})
      if (res.success === true) {
        alert("Success renewing safety stock policy");
      }
    });
  };

  renewAvailableStock = () => {
    this.setState({loading: true});
    const {availableStockPercentFactor} = this.state;
    return fetch(`http://localhost:8000/v1/policy/available-stock`, {
      method: "PUT",
      headers: API.getJsonTypeHeader(),
      body: JSON.stringify({
        "stockType": this.state.stockType,
        "percentFactor": parseFloat(availableStockPercentFactor) / 100,
        "performBy": "donghoon.lee",
      })
    }).then(res => res.json()).then(res => {
      this.setState({loading: false})
      if (res.success === true) {
        alert("Success renewing available stock policy");
      }
    });
  };

  render() {
    const {dataSource} = this.state;
    return (
        <Layout>
          <Header className="header">
            <div className={'logo'}/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">O2O Demo</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <Layout className={'site-layout-background'} style={{ padding: '24px 0' }}>
              <Sider className={'site-layout-background'} width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Stock">
                    <Menu.Item key="1">Search</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content>
                <Card title="Setting SafetyStock Policy" bordered={false} style={{marginTop: 5}}>
                  <Row>
                    <Col span={12}>
                      <Card title="Form"  style={{height: 220}} bordered={false}>
                        <Form>
                          <Row>
                            <Col span={12}>
                              <Row>
                                <Col span={8}>
                                  <FormItem {...formItemLayout} label="MF">
                                    <Input placeholder="MinusFactor" value={this.state.safetyStockMinusFactor}
                                           onChange={e => this.setState({ safetyStockMinusFactor: e.target.value })}/>
                                  </FormItem>
                                </Col>
                                <Col span={8}>
                                  <FormItem {...formItemLayout} label="PF">
                                    <Input placeholder="PercentFactor" value={this.state.safetyStockPercentFactor}
                                           onChange={e => this.setState({ safetyStockPercentFactor: e.target.value })}/>
                                  </FormItem>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={3} style={{ paddingTop: 4, textAlign: "right" }}>
                              <Button type="primary" onClick={this.renewSafetyStock} loading={this.state.loading}>Renew</Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="Formula"  style={{height: 220}} bordered={false}>
                        <Paragraph style={{marginLeft: 120, backgroundColor: "#eee", width: 160, borderRadius: "10px 10px 10px 10px"}}>
                          <div style={{padding: 5}}>
                            <p style={{fontSize:12}}>{`if (qty <= 1) { return 0; }`}</p>
                            <p style={{fontSize:12}}>{`v = qty * PF - MF;`}</p>
                            <p style={{fontSize:12}}>{`if (v <= 1) { return 0; }`}</p>
                            <p style={{fontSize:12}}>{`return Floor(v);`}</p>
                          </div>
                        </Paragraph>
                      </Card>
                    </Col>
                  </Row>
                </Card>
                <Card title="Setting AvailableStock Policy" bordered={false} style={{marginTop: 5}}>
                  <Row>
                    <Col span={12}>
                      <Card title="Form"  style={{height: 160}} bordered={false}>
                        <Form>
                          <Row>
                            <Col span={12}>
                              <Col span={8}>
                                <FormItem {...formItemLayout} label="PF">
                                  <Input placeholder="PercentFactor" value={this.state.availableStockPercentFactor}
                                         onChange={e => this.setState({ availableStockPercentFactor: e.target.value })}/>
                                </FormItem>
                              </Col>
                            </Col>
                            <Col span={3} style={{ paddingTop: 4, textAlign: "right" }}>
                              <Button type="primary" onClick={this.renewAvailableStock} loading={this.state.loading}>Renew</Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="Formula" style={{height: 160}} bordered={false}>
                        <Paragraph style={{marginLeft: 120, backgroundColor: "#eee", width: 160, borderRadius: "10px 10px 10px 10px"}}>
                          <div style={{padding: 5}}>
                            <p style={{fontSize:12}}>{`Floor(safetyStock * PF)`}</p>
                          </div>
                        </Paragraph>
                      </Card>
                    </Col>
                  </Row>
                </Card>
                <Card title="Search" bordered={false} style={{marginTop: 5}}>
                  <Row>
                    <Col span={16}>
                      <Card title="Form" bordered={false}>
                        <Form>
                          <Row>
                            <Col span={21}>
                              <Row>
                                <Col span={8}>
                                  <FormItem {...formItemLayout} label={"StockType"}>
                                    <Select
                                        showSearch
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        onChange={(val) => { this.setState({ stockType: val }) }}
                                    >
                                      {STOCK_TYPES.map((val, index) => {
                                        return <Option key={index} value={val}>{val}</Option>
                                      })}
                                    </Select>
                                  </FormItem>
                                </Col>
                                <Col span={8} style={{display: this.state.stockType === 'province' || this.state.stockType === 'district' || this.state.stockType === 'area' ? "block" : "none"}}>
                                  <FormItem {...formItemLayout} label="Unit">
                                    <Input placeholder="Unit" value={this.state.unit} onChange={e => this.setState({ unit: e.target.value })}/>
                                  </FormItem>
                                </Col>
                                <Col span={8}>
                                  <FormItem {...formItemLayout} label={"SkuId"}>
                                    <Input required placeholder="SkuId" value={this.state.skuId} onChange={e => this.setState({ skuId: e.target.value })}/>
                                  </FormItem>
                                </Col>
                              </Row>
                            </Col>
                            <Col span={3} style={{ paddingTop: 4, textAlign: "right"}}>
                              <Button type="primary" onClick={this.handleSearch} loading={this.state.loading}>Search</Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Row>
                          <Col span={8}>
                            <Card bordered={false} title="OriginalStock">
                              <Table
                                  dataSource={dataSource}
                                  rowKey={row => row.storeId + row.skuId}
                                  pagination={{ pageSize: 10 }}
                                  columns={[
                                    {
                                      title: 'storeId',
                                      dataIndex: 'storeId',
                                      key: 'storeId',
                                    },
                                    {
                                      title: 'skuId',
                                      dataIndex: 'skuId',
                                      key: 'skuId',
                                    },
                                    {
                                      title: 'qty',
                                      dataIndex: 'qty',
                                      key: 'qty',
                                    },
                                  ]}
                              />
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card bordered={false} title="SafetyStock">
                              <Table
                                  dataSource={dataSource}
                                  rowKey={row => row.storeId + row.skuId}
                                  pagination={{ pageSize: 10 }}
                                  columns={[
                                    {
                                      title: 'storeId',
                                      dataIndex: 'storeId',
                                      key: 'storeId',
                                    },
                                    {
                                      title: 'skuId',
                                      dataIndex: 'skuId',
                                      key: 'skuId',
                                    },
                                    {
                                      title: 'safetyQty',
                                      dataIndex: 'safetyQty',
                                      key: 'safetyQty',
                                    },
                                  ]}
                              />
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card bordered={false} title="AvailableStock">
                              <Table
                                  dataSource={dataSource}
                                  rowKey={row => row.storeId + row.skuId}
                                  pagination={{ pageSize: 10 }}
                                  columns={[
                                    {
                                      title: 'storeId',
                                      dataIndex: 'storeId',
                                      key: 'storeId',
                                    },
                                    {
                                      title: 'skuId',
                                      dataIndex: 'skuId',
                                      key: 'skuId',
                                    },
                                    {
                                      title: 'availableQty',
                                      dataIndex: 'availableQty',
                                      key: 'availableQty',
                                    },
                                  ]}
                              />
                            </Card>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Content>
            </Layout>
          </Content>
        </Layout>
    )
  }
}