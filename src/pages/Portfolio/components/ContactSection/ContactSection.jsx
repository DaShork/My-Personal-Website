import { FacebookFilled, GithubFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import './ContactSection.css'

function ContactSection({ language = 'vi' }) {
  const [api, contextHolder] = message.useMessage()

  const content = {
    vi: {
      title: 'Lien he',
      submit: 'Gui thong tin',
      placeholders: {
        name: 'Ho va ten',
        phone: 'So dien thoai',
        email: 'Email',
        company: 'Ten cong ty',
        message: 'Noi dung can tu van',
      },
      info: [
        'Email: nhatminhvo2311@gmail.com',
        'Hotline: +84 906 204 988',
        'Dia chi: HCM, Viet Nam',
      ],
      successMessage: 'Thong tin da duoc gui (mock).',
    },
    en: {
      title: 'Contact',
      submit: 'Send request',
      placeholders: {
        name: 'Full name',
        phone: 'Phone number',
        email: 'Email',
        company: 'Company name',
        message: 'Your consultation needs',
      },
      info: [
        'Email: nhatminhvo2311@gmail.com',
        'Hotline: +84 906 204 988',
        'Address: HCM, Vietnam',
      ],
      successMessage: 'Information sent successfully (mock).',
    },
  }

  const currentContent = content[language]

  const onFinish = () => {
    api.success(currentContent.successMessage)
  }

  return (
    <section id="contact" className="section reveal section-shell">
      {contextHolder}
      <h2 className="section-title">{currentContent.title}</h2>
      <div className="contact-layout">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder={currentContent.placeholders.name} />
          </Form.Item>
          <Form.Item name="phone" rules={[{ required: true }]}>
            <Input placeholder={currentContent.placeholders.phone} />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder={currentContent.placeholders.email} />
          </Form.Item>
          <Form.Item name="company">
            <Input placeholder={currentContent.placeholders.company} />
          </Form.Item>
          <Form.Item name="message" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder={currentContent.placeholders.message} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {currentContent.submit}
          </Button>
        </Form>
        <div className="contact-info">
          {currentContent.info.map((row) => (
            <div className="pill" key={row}>
              {row}
            </div>
          ))}
          <div className="social-icons">
            <FacebookFilled />
            <InstagramFilled />
            <LinkedinFilled />
            <GithubFilled />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
