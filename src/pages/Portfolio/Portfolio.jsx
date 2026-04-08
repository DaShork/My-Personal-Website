import { useEffect, useMemo, useState } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import Header from '../../components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import ProductSection from './components/ProductSection/ProductSection'
import AboutSection from './components/AboutSection/AboutSection'
import FAQSection from './components/FAQSection/FAQSection'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from '../../components/Footer/Footer'
import './Portfolio.css'

function Portfolio() {
  const [language, setLanguage] = useState('vi')
  const [themeMode, setThemeMode] = useState('light')

  // Navigation items
  const navItems = {
    vi: ['Trang chủ', 'Sản phẩm', 'Về chúng tôi', 'FAQ', 'Liên hệ'],
    en: ['Home', 'Products', 'About us', 'FAQ', 'Contact'],
  }

  const themeConfig = useMemo(
    () => ({
      algorithm:
        themeMode === 'dark'
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: '#0f6b58',
        colorInfo: '#223148',
        borderRadius: 12,
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
      },
    }),
    [themeMode],
  )

  useEffect(() => {
    document.body.setAttribute('data-theme', themeMode)
  }, [themeMode])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [language])

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={`app ${themeMode}`}>
        <Header
          nav={navItems[language]}
          language={language}
          themeMode={themeMode}
          onLanguageChange={setLanguage}
          onThemeChange={setThemeMode}
        />
        <main>
          <HeroSection language={language} />
          <ProductSection language={language} username="DaShork" />
          <AboutSection language={language} />
          <FAQSection language={language} />
          <ContactSection language={language} />
        </main>
        <Footer language={language} />
      </div>
    </ConfigProvider>
  )
}

export default Portfolio
