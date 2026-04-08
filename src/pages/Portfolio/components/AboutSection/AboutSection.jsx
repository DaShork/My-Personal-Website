import { Card } from 'antd'
import Avt from '../../../../assets/DaShork_Avatar.JPG'
import './AboutSection.css'

function AboutSection({ language = 'vi' }) {
  const content = {
    vi: {
      title: 'Về tôi',
      paragraph:
        'Tôi theo đuổi thiết kế UX/UI với nền tảng phân tích nghiệp vụ và kinh nghiệm tư vấn trong nhiều dự án chuyển đổi số. Trọng tâm của tôi là tạo ra giao diện rõ ràng, trực quan, thân thiện, giúp người dùng đạt mục tiêu nhanh hơn. Tôi luôn học hỏi liên tục về hệ thống thiết kế, nghiên cứu hành vi và xu hướng trải nghiệm số để mang lại giá trị thực tế cho doanh nghiệp.',
      socials: [
        { label: 'Facebook', link: 'https://facebook.com' },
        { label: 'Instagram', link: 'https://instagram.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' },
        { label: 'GitHub', link: 'https://github.com/DaShork' },
      ],
    },
    en: {
      title: 'About me',
      paragraph:
        'I focus on UX/UI design with a strong business analysis mindset and consulting experience across digital transformation projects. My goal is to build interfaces that are clear, intuitive, and user-friendly while helping teams deliver outcomes faster. I continuously improve in design systems, behavioral research, and practical product strategy.',
      socials: [
        { label: 'Facebook', link: 'https://facebook.com' },
        { label: 'Instagram', link: 'https://instagram.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' },
        { label: 'GitHub', link: 'https://github.com/DaShork' },
      ],
    },
  }

  const currentContent = content[language]

  const stats = ['05+ years', '20+ projects', 'BA + UX/UI', 'Consulting']

  return (
    <section id="about" className="section reveal section-shell">
      <h2 className="section-title">{currentContent.title}</h2>
      <div className="about-layout">
        <div className="about-left">
          <img src={Avt} alt="Profile" className="profile"/>
          <div className="story-stats">
            {stats.map((stat) => (
              <Card key={stat} size="small">
                {stat}
              </Card>
            ))}
          </div>
        </div>
        <Card className="about-text-card">
          <p>{currentContent.paragraph}</p>
        </Card>
      </div>
      <div className="social-grid">
        {currentContent.socials.map((social) => (
          <Card key={social.label} hoverable>
            <a href={social.link} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
