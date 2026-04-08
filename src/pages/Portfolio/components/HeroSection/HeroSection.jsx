import { Tag } from 'antd'
import Avt from '../../../../assets/DaShork_Avatar.jpg'
import './HeroSection.css'

function HeroSection({ language = 'vi' }) {
  const content = {
    vi: {
      title: 'DaShork - UX/UI Designer',
      subtitle: 'Thiết kế trải nghiệm số tinh gọn, hiện đại và tập trung vào con người.',
      intro: 'Tôi kết hợp tư duy thiết kế, phân tích nghiệp vụ và kỹ năng tư vấn để chuyển hóa ý tưởng thành sản phẩm hiệu quả.',
      highlights: ['UX/UI Designer', 'Business Analyst', 'Tư vấn giải pháp', 'Hỗ trợ triển khai'],
    },
    en: {
      title: 'DaShork - UX/UI Designer',
      subtitle: 'Crafting clean digital experiences with measurable business value.',
      intro: 'I blend design thinking, business analysis, and consulting skills to turn ideas into effective products.',
      highlights: ['UX/UI Designer', 'Business Analyst', 'Consulting', 'Delivery Support'],
    },
  }

  const currentContent = content[language]

  return (
    <section id="home" className="hero section reveal">
      <div className="hero-content">
        <p className="eyebrow">DaShork</p>
        <h1>{currentContent.title}</h1>
        <h3>{currentContent.subtitle}</h3>
        <p>{currentContent.intro}</p>
        <div className="hero-metrics">
          {currentContent.highlights.map((item) => (
            <Tag key={item} color="green">
              {item}
            </Tag>
          ))}
        </div>
      </div>
      <div className="hero-image-wrap">
        <img className="hero-avatar" src={Avt} alt="DaShork avatar" />
      </div>
    </section>
  )
}

export default HeroSection
