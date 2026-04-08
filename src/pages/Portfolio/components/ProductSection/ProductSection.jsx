import { useEffect, useState } from 'react'
import { GithubOutlined, StarOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Card, Row, Col, Spin, Empty, Tag } from 'antd'
import { getAllRepos, formatRepoData, formatStars, getLanguageColor, formatRelativeDate } from '../../../../services/githubService'
import './ProductSection.css'

function ProductSection({ language = 'vi', username = 'DaShork' }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const content = {
    vi: {
      title: 'Các Repository của Tôi',
      slogan: 'Các dự án được lấy trực tiếp từ GitHub',
    },
    en: {
      title: 'My Repositories',
      slogan: 'Projects and contributions from GitHub',
    },
  }

  const currentContent = content[language]

  useEffect(() => {
    fetchRepos()
  }, [retryCount])

  const fetchRepos = async () => {
    try {
      setLoading(true)
      setError(null)
      const allRepos = await getAllRepos(username)
      setRepos(allRepos)
    } catch (err) {
      console.error('Failed to fetch repos:', err)
      setError(err.message || 'Failed to load repositories')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  if (loading) {
    return (
      <section id="products" className="product-section reveal section-shell">
        <h2 className="section-title">{currentContent.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="products" className="product-section reveal section-shell">
        <h2 className="section-title">{currentContent.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ff4d4f', marginBottom: '20px' }}>
              Error: {error}
            </p>
            <Button onClick={handleRetry} type="primary">
              Retry
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (repos.length === 0) {
    return (
      <section id="products" className="product-section reveal section-shell">
        <h2 className="section-title">{currentContent.title}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
          <Empty description="No repositories found" />
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="product-section reveal section-shell">
      <h2 className="section-title">{currentContent.title}</h2>
      <p className="section-subtitle">{currentContent.slogan}</p>
      <Row gutter={[24, 24]} className="repos-grid">
        {repos.map((repo) => {
          const formattedData = formatRepoData(repo)
          const starsFormatted = formatStars(formattedData.stars)
          const languageColor = getLanguageColor(formattedData.language)
          const updatedDate = formatRelativeDate(formattedData.updatedAt)

          return (
            <Col key={formattedData.id} xs={24} sm={24} md={12} lg={8} xl={8}>
              <Card
                className="repo-card"
                hoverable
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '8px', color: '#0f6b58' }}>
                    {formattedData.name}
                  </h3>
                  <p style={{
                    marginBottom: '12px',
                    color: '#666',
                    fontSize: '14px',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {formattedData.description}
                  </p>

                  <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                      style={{
                        backgroundColor: languageColor,
                        color: '#fff',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    >
                      {formattedData.language}
                    </Tag>
                    <Tag
                      icon={<StarOutlined />}
                      style={{
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        border: '1px solid #ffc107',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    >
                      {starsFormatted} stars
                    </Tag>
                  </div>

                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: '16px',
                  }}>
                    Updated {updatedDate}
                  </p>

                  <Button
                    type="primary"
                    icon={<GithubOutlined />}
                    href={formattedData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: 'auto' }}
                  >
                    View on GitHub
                  </Button>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </section>
  )
}

export default ProductSection
