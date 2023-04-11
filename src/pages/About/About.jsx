import './about.css';

const About = ({ children }) => {
    return (
        <>
            <div className="content">
                <h1 className="content-title">Giới thiệu</h1>

                <p className="content-desc">
                    Chúng mình xuất hiện để đem tới mọi người một chất lượng áo tốt nhất,
                    với giá thành hấp dẫn nhất để đưa Outerity đến với tất cả lứa tuổi và
                    khắp mọi vùng miền đất nước
                </p>
            </div>
        </>
    );
};

export default About;
