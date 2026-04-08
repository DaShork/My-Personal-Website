import { Collapse } from 'antd'
import './FAQSection.css'

function FAQSection({ language = 'vi' }) {
  const content = {
    vi: {
      title: 'Frequently asked question',
      items: [
        {
          q: 'Thoi gian thuc hien mot du an la bao lau?',
          a: 'Trung binh 2-6 tuan tuy quy mo va do phuc tap.',
        },
        {
          q: 'Ban co nhan du an theo tung giai doan khong?',
          a: 'Co. Toi nhan theo phase de doanh nghiep de dang kiem soat ngan sach.',
        },
        {
          q: 'Co ho tro nghien cuu nguoi dung khong?',
          a: 'Co. Bao gom interview nhanh, journey map va de xuat cai tien.',
        },
        {
          q: 'Toi co the yeu cau bao tri sau ban giao?',
          a: 'Co, goi bao tri linh hoat theo thang hoac theo quy.',
        },
        {
          q: 'Co ket hop voi dev team hien tai duoc khong?',
          a: 'Hoan toan duoc. Toi co kinh nghiem phoi hop Agile voi designer va dev.',
        },
      ],
    },
    en: {
      title: 'Frequently asked question',
      items: [
        { q: 'How long does a project take?', a: 'Most projects take around 2-6 weeks.' },
        { q: 'Can you work in phases?', a: 'Yes, phased delivery is available for better budgeting.' },
        { q: 'Do you support user research?', a: 'Yes, including quick interviews and journey mapping.' },
        { q: 'Do you offer post-launch maintenance?', a: 'Yes, monthly and quarterly options are available.' },
        {
          q: 'Can I work with your team on existing products?',
          a: 'Absolutely. I have experience working in Agile environments with designers and developers.',
        },
      ],
    },
  }

  const currentContent = content[language]

  const items = currentContent.items.map((item, index) => ({
    key: `${index}`,
    label: item.q,
    children: <p>{item.a}</p>,
  }))

  return (
    <section id="faq" className="section faq-section reveal section-shell">
      <h2 className="section-title">{currentContent.title}</h2>
      <Collapse accordion items={items} />
    </section>
  )
}

export default FAQSection
