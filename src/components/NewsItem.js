import React, { Component } from 'react'

export class NewsItem extends Component {
  formatPublishedTime = (publishedAt) => {
    if (!publishedAt) {
      return 'Time unavailable';
    }

    const publishedDate = new Date(publishedAt);

    if (Number.isNaN(publishedDate.getTime())) {
      return 'Time unavailable';
    }

    return publishedDate.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  getTopicFallbackImage = (headline, summary, theme) => {
    const content = `${headline} ${summary}`.toLowerCase();

    const topics = [
      { name: 'technology', keywords: ['tech', 'ai', 'software', 'app', 'digital', 'internet', 'phone', 'apple', 'google', 'startup'] },
      { name: 'business', keywords: ['business', 'market', 'economy', 'finance', 'stock', 'money', 'trade', 'company'] },
      { name: 'sports', keywords: ['sport', 'cricket', 'football', 'match', 'player', 'tournament', 'olympic'] },
      { name: 'health', keywords: ['health', 'medical', 'hospital', 'doctor', 'covid', 'wellness', 'disease'] },
      { name: 'politics', keywords: ['election', 'government', 'minister', 'policy', 'president', 'parliament', 'politics'] },
      { name: 'science', keywords: ['science', 'space', 'research', 'climate', 'nasa', 'planet', 'energy'] },
      { name: 'entertainment', keywords: ['movie', 'film', 'music', 'actor', 'celebrity', 'show', 'netflix'] }
    ];

    const selectedTopic = topics.find((topic) =>
      topic.keywords.some((keyword) => content.includes(keyword))
    ) || { name: 'world', keywords: [] };

    const topicStyles = {
      technology: {
        bg: theme === 'dark' ? '#081a2d' : '#dff1ff',
        accent: theme === 'dark' ? '#49b3ff' : '#0d6efd',
        detail: theme === 'dark' ? '#143453' : '#8cc7ff',
        title: 'Technology Update',
        icon: '<rect x="72" y="70" width="132" height="92" rx="18" fill="%23ffffff" opacity="0.95"/><rect x="90" y="92" width="96" height="48" rx="8" fill="%230d6efd" opacity="0.85"/><rect x="118" y="170" width="40" height="10" rx="5" fill="%2349b3ff"/>'
      },
      business: {
        bg: theme === 'dark' ? '#101c26' : '#e7f5ea',
        accent: theme === 'dark' ? '#4fd18b' : '#198754',
        detail: theme === 'dark' ? '#22393b' : '#9fddae',
        title: 'Business Brief',
        icon: '<rect x="76" y="86" width="26" height="84" rx="8" fill="%234fd18b"/><rect x="114" y="58" width="26" height="112" rx="8" fill="%23198754"/><rect x="152" y="102" width="26" height="68" rx="8" fill="%2388e5b6"/><path d="M78 196H194" stroke="%234fd18b" stroke-width="10" stroke-linecap="round"/>'
      },
      sports: {
        bg: theme === 'dark' ? '#1a1628' : '#f5ecff',
        accent: theme === 'dark' ? '#9f7aea' : '#6f42c1',
        detail: theme === 'dark' ? '#302544' : '#d3b6ff',
        title: 'Sports Story',
        icon: '<circle cx="136" cy="118" r="54" fill="%236f42c1" opacity="0.95"/><path d="M102 92c14 10 30 10 44 0M96 124c16-8 32-8 48 0M108 154c10-12 26-12 36 0" stroke="%23ffffff" stroke-width="8" stroke-linecap="round" fill="none"/>'
      },
      health: {
        bg: theme === 'dark' ? '#1d1820' : '#ffeef3',
        accent: theme === 'dark' ? '#ff7aa5' : '#d63384',
        detail: theme === 'dark' ? '#3b2231' : '#ffc0d4',
        title: 'Health Report',
        icon: '<rect x="110" y="70" width="52" height="100" rx="12" fill="%23d63384"/><rect x="86" y="94" width="100" height="52" rx="12" fill="%23ff7aa5"/><rect x="127" y="86" width="18" height="68" rx="9" fill="%23ffffff"/><rect x="102" y="111" width="68" height="18" rx="9" fill="%23ffffff"/>'
      },
      politics: {
        bg: theme === 'dark' ? '#1d1b16' : '#fff5e2',
        accent: theme === 'dark' ? '#f0c36a' : '#b78103',
        detail: theme === 'dark' ? '#3c3320' : '#f1d391',
        title: 'Politics Update',
        icon: '<path d="M78 164h116" stroke="%23b78103" stroke-width="10" stroke-linecap="round"/><path d="M90 158V96M116 158V96M142 158V96M168 158V96" stroke="%23f0c36a" stroke-width="10" stroke-linecap="round"/><path d="M74 96l62-34 62 34" fill="%23f0c36a"/>'
      },
      science: {
        bg: theme === 'dark' ? '#12192b' : '#e8eeff',
        accent: theme === 'dark' ? '#82aaff' : '#3d5afe',
        detail: theme === 'dark' ? '#24345f' : '#a9b9ff',
        title: 'Science Watch',
        icon: '<circle cx="136" cy="118" r="26" fill="%233d5afe"/><ellipse cx="136" cy="118" rx="68" ry="24" fill="none" stroke="%2382aaff" stroke-width="8"/><ellipse cx="136" cy="118" rx="24" ry="68" fill="none" stroke="%2382aaff" stroke-width="8"/>'
      },
      entertainment: {
        bg: theme === 'dark' ? '#26151f' : '#ffedf6',
        accent: theme === 'dark' ? '#ff79c6' : '#e83e8c',
        detail: theme === 'dark' ? '#45253b' : '#ffb4d5',
        title: 'Entertainment Buzz',
        icon: '<rect x="84" y="72" width="104" height="92" rx="16" fill="%23e83e8c"/><polygon points="124,98 124,138 160,118" fill="%23ffffff"/><circle cx="96" cy="84" r="6" fill="%23ffffff"/><circle cx="176" cy="84" r="6" fill="%23ffffff"/>'
      },
      world: {
        bg: theme === 'dark' ? '#13212c' : '#e8f4ff',
        accent: theme === 'dark' ? '#48c0ff' : '#0b7ed0',
        detail: theme === 'dark' ? '#274154' : '#a8d7f6',
        title: 'World News',
        icon: '<circle cx="136" cy="118" r="54" fill="%230b7ed0" opacity="0.92"/><path d="M82 118h108M136 64c-18 16-28 34-28 54s10 38 28 54M136 64c18 16 28 34 28 54s-10 38-28 54" stroke="%23ffffff" stroke-width="6" fill="none"/>'
      }
    };

    const selectedStyle = topicStyles[selectedTopic.name];

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
        <rect width="600" height="340" fill="${selectedStyle.bg}"/>
        <rect x="0" y="0" width="600" height="340" fill="${selectedStyle.detail}" opacity="0.18"/>
        <rect x="62" y="214" width="474" height="18" rx="9" fill="${selectedStyle.detail}"/>
        <rect x="62" y="248" width="318" height="18" rx="9" fill="${selectedStyle.detail}" opacity="0.82"/>
        <text x="62" y="195" fill="${theme === 'dark' ? '#f4f8fc' : '#17324d'}" font-family="Arial, sans-serif" font-size="34" font-weight="700">
          ${selectedStyle.title}
        </text>
        ${selectedStyle.icon}
      </svg>
    `)}`;
  }

  render() {
    let {title, description, rawTitle, rawDescription, imageUrl, newsUrl, theme, author, publishedAt} = this.props;
    const fallbackImage = this.getTopicFallbackImage(rawTitle || title, rawDescription || description, theme);
    const imageSource = imageUrl || fallbackImage;
    const displayAuthor = author.length > 45 ? `${author.slice(0, 42)}...` : author;
    const displayTime = this.formatPublishedTime(publishedAt);

    return (
      <div className="news-card-shell">
        <div className={`card news-card ${theme === 'dark' ? 'news-card-dark' : 'news-card-light'}`}>
          <img
            src={imageSource}
            className="card-img-top news-card-image"
            alt="..."
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }}
          />
          <div className="card-body news-card-body">
            <div className={`news-card-meta ${theme === 'dark' ? 'news-card-meta-dark' : 'news-card-meta-light'}`}>
              <span className="news-card-author">By {displayAuthor}</span>
              <span className="news-card-time">{displayTime}</span>
            </div>
            <h5 className="card-title news-card-title">{title}...</h5>
            <p className="card-text news-card-description">{description}...</p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className={`btn btn-sm news-card-btn ${theme === 'dark' ? 'news-card-btn-dark' : 'news-card-btn-light'}`}>
              View details
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem
