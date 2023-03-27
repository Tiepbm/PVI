import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Col, Row, Card} from 'antd';
import DocumentTitle from "react-document-title";
import {Loading3QuartersOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {userRepository} from "../../repositories/UserRepository";
import M24ErrorUtils from "../../utils/M24ErrorUtils";
import {useSessionStorage} from "../../hooks/useSessionStorage";
import M24Notification from "../../utils/M24Notification";
import lodash from "lodash";
function Login(){
    const navigate = useNavigate();
    const [loading, setLoading]= useState<boolean>(false);
    const [profile, setProfile] = useSessionStorage('profile', false);
    const [webCode, setWebCode] = useSessionStorage('web_code', '');
    const [marketCode, setMarketCode] = useSessionStorage('ma_sieuthi', '');

    const onFinish = (values: any) => {
        setLoading(true);
        userRepository.login(values.username, values.password).then(res=>{
            M24Notification.messageSuccess('Đăng nhập thành công');
            setProfile(res.DataUser);
            setMarketCode(res.DataUser.ma_sieuthi);
            setWebCode(lodash.get(res,'DataUser.web_code'));
            navigate('/categories/asset?productId=baohanhmorong');
        }).catch(err=>{
            console.log(err);
            M24ErrorUtils.showError(err.data.Message);
        }).finally(()=> setLoading(false))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <DocumentTitle title={`Đăng nhập`}>
        <div className="scroll-wrapper">
            <div className="wrapper login-wrapper width100 min-width-page position-re dpl-flex ">
                <div className="boxform bg-color-white">
                    <h1 className="txt-center mgbt20">
                        <img style={{maxWidth:80,height:'auto'}} src={require('../../resources/images/logo.png')} />
                    </h1>
                    {/*<h2 className="txt-size-48 robotobold txt-color-blue txt-center">*/}
                    {/*    {'Đăng nhập'}*/}
                    {/*</h2>*/}
                    <span className="txt-size-h7 txt-color-black robotoregular dpl-block mgt20">
                                {'Chào mừng bạn đã quay trở lại! Đăng nhập ngay dưới đây!'}
                            </span>
                    <div className="boxform__content mgt25">
                        <Form
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label=""
                                name="username"
                                className={'login-form'}
                                rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
                            >
                                <Input style={{height: 45}} prefix={<UserOutlined/>} className={'width100'} placeholder={'Tên đăng nhập'} />
                            </Form.Item>

                            <Form.Item
                                label=""
                                name="password"
                                className={'mgt10'}
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password  style={{height: 45}} prefix={<LockOutlined/>} placeholder={'Mật khẩu'} />
                            </Form.Item>

                            <Form.Item className={'mgt10'} wrapperCol={{ offset: 8, span: 16 }}>
                                <Button loading={loading} disabled={loading} shape={'round'} size={'large'} type="primary" htmlType="submit">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </DocumentTitle>
};
export default Login;
