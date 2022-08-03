import React from "react";
import MainLayout from "../../components/Layout";

function About(){

    return <MainLayout title={'Giới thiệu'}>
        <div>
            <div className="banner">
                <img src={require('../../resources/images/bannergioithieu.png')} style={{width: '100%'}} />
            </div>
            <div className="content">
                <div className="content-gt">
                    <div className="container">
                        <h2 style={{textAlign: 'justify'}}><strong>Tổng Công ty Bảo hiểm PVI (Bảo hiểm PVI)</strong></h2>
                        <p style={{textAlign: 'justify'}} />
                        <h3 style={{textAlign: 'justify'}}><strong>1. Giới thiệu: </strong></h3>
                        <p style={{textAlign: 'justify'}}><strong>Bảo hiểm PVI</strong> là thành viên của <strong>Công ty cổ phần PVI </strong>(PVI Holdings), hoạt động trên lĩnh vực kinh doanh Bảo hiểm phi nhân thọ. Trong đó, <strong>PVI Holdings</strong> - đơn vị thành viên của Tập đoàn Dầu khí Việt Nam là định chế Tài chính - Bảo hiểm hàng đầu tại Việt Nam, tổ chức duy nhất hoạt động đầy đủ trong lĩnh vực Bảo hiểm trên thị trường.</p>
                        <p style={{textAlign: 'justify'}}><strong>Bảo hiểm PVI đã khẳng định vị thế của mình trong nhiều năm:</strong></p>
                        <ul style={{textAlign: 'justify'}}>
                            <li className="list-strikethrough">Doanh nghiệp Bảo hiểm số 1 Việt Nam từ 2014</li>
                            <li className="list-strikethrough">Doanh nghiệp Bảo hiểm Công nghiệp số 1 Việt Nam, chiếm thị phần lớn nhất trong lĩnh vực Bảo hiểm Năng lượng, Bảo hiểm Hàng không, Bảo hiểm Thiệt hại - Tài sản, Bảo hiểm Tàu thuyền, Bảo hiểm Kỹ thuật</li>
                            <li className="list-strikethrough">Nhà Bảo hiểm cung cấp sản phẩm Cá nhân hàng đầu với các dịch vụ tiện ích hoàn hảo: Bảo hiểm trực tuyến, Trung tâm chăm sóc Khách hàng, Giám định trực tuyến, Hotline 24/7: 1900 545458</li>
                            <li className="list-strikethrough">Doanh nghiệp Bảo hiểm duy nhất được trao tặng danh hiệu Anh hùng Lao động</li>
                            <li className="list-strikethrough">Xếp hạng năng lực tài chính B++ (Tốt) từ A.M. Best</li>
                            <li className="list-strikethrough">Doanh nghiệp Bảo hiểm duy nhất được thị trường Bảo hiểm London (Lloyd Syndicates) lựa chọn là đối tác cung cấp dịch vụ Bảo hiểm công nghiệp, năng lượng tại Việt Nam</li>
                            <li className="list-strikethrough">Nơi hội tụ các thương hiệu hàng đầu khu vực và Thế giới:
                                <ul className="subtext" style={{textAlign: 'left'}}>
                                    <li><em>PetroVietnam - Tập đoàn kinh tế số một Việt Nam</em></li>
                                    <li><em>Talanx - Tập đoàn Tài chính Bảo hiểm hàng đầu CHLB Đức (hoạt động từ năm 1903, có mặt tại hơn 150 Quốc gia)</em></li>
                                    <li><em>IFC - </em><em>một thành viên thuộc nhóm Ngân hàng Thế giới là </em><em>nhà đầu tư chiến lược</em><em> mới nhất của PVI</em></li>
                                </ul>
                            </li>
                        </ul>
                        <p style={{textAlign: 'justify'}} />
                        <h3 style={{textAlign: 'justify'}}><strong>2. Tầm nhìn và sứ mệnh:</strong></h3>
                        <ul style={{textAlign: 'justify'}}>
                            <li className="list-strikethrough">Tầm nhìn: Giữ vững vai trò là Nhà bảo hiểm hàng đầu Việt Nam với thương hiệu mang tầm Quốc tế.</li>
                            <li className="list-strikethrough">Sứ mệnh<strong>:</strong></li>
                        </ul>
                        <ul style={{textAlign: 'justify'}}>
                            <li style={{listStyleType: 'none'}}>
                                <ul className="subtext" style={{textAlign: 'left'}}>
                                    <li>Trở thành Nhà Bảo hiểm có hệ thống bán lẻ chuyên nghiệp với chất lượng dịch vụ vượt trội mang lại lợi ích và sự an tâm cao nhất cho Khách hàng</li>
                                    <li>Khẳng định vị thế nhà bảo hiểm công nghiệp số 1 thị trường, dẫn đầu trong các lĩnh vực Bảo hiểm Năng lượng, Bảo hiểm Hàng không, Bảo hiểm Thiệt hại - Tài sản, Bảo hiểm Tàu thuyền,&nbsp;Bảo hiểm Kỹ thuật; là đối tác lớn, tin cậy của các Tập đoàn trong và ngoài nước</li>
                                    <li>Xây dựng môi trường làm việc tốt nhất để phát huy tối đa nguồn nhân lực vững mạnh, tạo dựng sự thành đạt cho từng cá nhân và đóng góp cho sự phát triển chung của Ngành cũng như của Quốc gia.</li>
                                </ul>
                            </li>
                        </ul>
                        <p style={{textAlign: 'justify'}} />
                        <h3 style={{textAlign: 'justify'}}><strong>3. Xếp hạng tín nhiệm</strong></h3>
                        <ul style={{textAlign: 'justify'}}>
                            <li>AM. Best xác nhận kết quả xếp hạng năng lực tài chính (FSR) ở mức “B++” (Tốt) đồng thời nâng xếp hạng năng lực tín dụng dài hạn của tổ chức phát hành (Long-Term ICR) từ mức “bbb” lên mức "bbb+" đối với Tổng công ty Bảo hiểm PVI. Triển vọng nâng hạng của cả hai chỉ số này là ổn định.</li>
                        </ul>
                        <p style={{textAlign: 'justify'}} />
                        <h3 style={{textAlign: 'justify'}}><strong>4. Giải thưởng và danh hiệu:</strong></h3>
                        <ul>
                            <li style={{textAlign: 'justify'}} className="list-strikethrough">Huân chương Độc lập Hạng Ba năm 2013</li>
                            <li style={{textAlign: 'justify'}} className="list-strikethrough">Huân chương Lao động hạng nhất năm 2010</li>
                            <li style={{textAlign: 'justify'}} className="list-strikethrough">Anh hùng lao động năm 2011</li>
                            <li style={{textAlign: 'justify'}} className="list-strikethrough">Top 10 Doanh nghiệp Bảo hiểm phi nhân thọ uy tín 7 năm liên tiếp 2016 - 2022</li>
                            <li style={{textAlign: 'justify'}} className="list-strikethrough">Top 500 Doanh nghiệp lớn nhất Việt Nam 8 năm liên tiếp 2015 - 2022</li>
                            <li style={{textAlign: 'justify'}} className="list-strikethrough">Top 50 Doanh nghiệp lợi nhuận tốt nhất Việt Nam năm 2021</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
}
export default About;
