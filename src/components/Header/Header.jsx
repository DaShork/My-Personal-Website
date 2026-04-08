import { BulbOutlined, GlobalOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import Logo from "../../../public/DaShork.svg"
import './Header.css'

function Header({ nav, language, themeMode, onLanguageChange, onThemeChange }) {
  const sectionMap = ['home', 'products', 'about', 'faq', 'contact']
  const settingsItems = [
    {
      key: 'lang',
      label: (
        <div className="setting-row">
          <GlobalOutlined />
          <span>{language === 'vi' ? 'Ngôn ngữ' : 'Language'}</span>
          <Button size="small" onClick={() => onLanguageChange(language === 'vi' ? 'en' : 'vi')}>
            {language === 'vi' ? 'VI/EN' : 'EN/VI'}
          </Button>
        </div>
      ),
    },
    {
      key: 'theme',
      label: (
        <div className="setting-row">
          <BulbOutlined />
          <span>{language === 'vi' ? 'Chủ đề' : 'Theme'}</span>
          <Button size="small" onClick={() => onThemeChange(themeMode === 'light' ? 'dark' : 'light')}>
            {themeMode === 'light' ? (language === 'vi' ? 'Tối' : 'Dark') : language === 'vi' ? 'Sáng' : 'Light'}
          </Button>
        </div>
      ),
    },
  ]

  return (
    <header className="header">
      <div className="brand">
        <img src={Logo} alt="DaShork Logo" className="logo" />
        <span>DaShork</span>
      </div>
      <nav className="nav-menu">
        {nav.map((item, index) => (
          <a key={item} href={`#${sectionMap[index]}`}>
            {item}
          </a>
        ))}
      </nav>
      <Dropdown menu={{ items: settingsItems }} trigger={['click']} placement="bottomRight">
        <button className="settings-btn" aria-label="settings">
          <SettingOutlined />
        </button>
      </Dropdown>
    </header>
  )
}

export default Header
