import './Footer.css'

function Footer({ language = 'vi' }) {
  const footerContent = {
    vi: {
      contact: 'Lien he: dashork.design@gmail.com | +84 912 345 678',
      social: 'Facebook | Instagram | LinkedIn | GitHub',
      copyright: 'Copyright 2026 - Tinh Tien Giang',
    },
    en: {
      contact: 'Contact: dashork.design@gmail.com | +84 912 345 678',
      social: 'Facebook | Instagram | LinkedIn | GitHub',
      copyright: 'Copyright 2026 - Tien Giang Province',
    },
  }

  const currentContent = footerContent[language]

  return (
    <footer className="footer">
      <p>{currentContent.contact}</p>
      <p>{currentContent.social}</p>
      <small>{currentContent.copyright}</small>
    </footer>
  )
}

export default Footer
