import React from 'react';
import { Link } from 'react-router-dom';
import './NotionRenderer.css';

// Helper to determine route for a page title (e.g. for child_page blocks)
const getRouteForTitle = (title) => {
  const t = title.toLowerCase();
  if (t.includes('taking action')) return '/guide/taking-action';
  if (t.includes('discipline')) return '/guide/discipline';
  if (t.includes('mental health')) return '/guide/mental-health';
  if (t.includes('mindset')) return '/pillars/mindset';
  if (t.includes('body')) return '/pillars/body';
  if (t.includes('work & career') || t.includes('work life')) return '/pillars/work';
  if (t.includes('money') || t.includes('financial freedom')) return '/pillars/money';
  if (t.includes('social life') || t.includes('brotherhood')) return '/pillars/social';
  if (t.includes('relationships')) return '/pillars/relationships';
  if (t.includes('religion') || t.includes('deen')) return '/pillars/religion';
  if (t.includes('islamic knowledge')) return '/pillars/islamic-knowledge';
  if (t.includes('weekly review')) return '/tools/weekly-review';
  if (t.includes('relapse protocol')) return '/tools/relapse-protocol';
  return null;
};

// Helper to map Notion URLs or IDs to local routes
const getRouteForUrl = (url) => {
  if (!url) return null;
  const lowercaseUrl = url.toLowerCase();
  
  // Weekly Review ID: 30cd5db5891f814fa57fd383d9e8dc03
  if (lowercaseUrl.includes('30cd5db5891f814fa57fd383d9e8dc03') || lowercaseUrl.includes('weekly-review')) {
    return '/tools/weekly-review';
  }
  // Relapse Protocol ID: 30cd5db5891f81628123e1b3d1294af8
  if (lowercaseUrl.includes('30cd5db5891f81628123e1b3d1294af8') || lowercaseUrl.includes('relapse-protocol')) {
    return '/tools/relapse-protocol';
  }
  // Taking Action: 30cd5db5-891f-8134-8d49-fe4c03b827cb
  if (lowercaseUrl.includes('30cd5db5891f81348d49fe4c03b827cb') || lowercaseUrl.includes('taking-action')) {
    return '/guide/taking-action';
  }
  // Discipline: 30cd5db5-891f-81c9-9305-d3d892cd2973
  if (lowercaseUrl.includes('30cd5db5891f81c99305d3d892cd2973') || lowercaseUrl.includes('discipline')) {
    return '/guide/discipline';
  }
  // Mental Health: 30cd5db5-891f-815d-a555-cc97454015c0
  if (lowercaseUrl.includes('30cd5db5891f815da555cc97454015c0') || lowercaseUrl.includes('mental-health')) {
    return '/guide/mental-health';
  }

  return null;
};

// Helper to map a pillar name to its slug
const getPillarSlug = (name) => {
  const n = name.trim().toLowerCase();
  if (n === 'mind') return 'mindset';
  if (n === 'body') return 'body';
  if (n === 'work & career' || n === 'work life & career') return 'work';
  if (n === 'money & financial freedom' || n === 'money') return 'money';
  if (n === 'social life & brotherhood' || n === 'social life') return 'social';
  if (n === 'relationships') return 'relationships';
  if (n === 'religion & purpose' || n === 'religion') return 'religion';
  if (n === 'islamic knowledge') return 'islamic-knowledge';
  return null;
};

export default function NotionRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  const renderBlocks = [];
  let currentList = null;

  const renderRichText = (richText, isListItem = false) => {
    if (!richText || !Array.isArray(richText)) return null;
    
    return richText.map((item, idx) => {
      let content = item.text;
      
      // If this is a list item and the text fragment is bold, check if it's a pillar name.
      // E.g. "Mind" in Step 4 list items. If so, make it link to the pillar page!
      if (isListItem && item.bold) {
        const pillarSlug = getPillarSlug(item.text);
        if (pillarSlug) {
          return (
            <Link
              key={idx}
              to={`/pillars/${pillarSlug}`}
              className="notion-bold-pillar-link"
            >
              <strong>{content}</strong>
            </Link>
          );
        }
      }

      if (item.bold) content = <strong key={idx}>{content}</strong>;
      if (item.italic) content = <em key={idx}>{content}</em>;
      if (item.underline) content = <u key={idx}>{content}</u>;
      if (item.code) content = <code className="notion-inline-code" key={idx}>{content}</code>;
      
      if (item.href) {
        const localRoute = getRouteForUrl(item.href);
        if (localRoute) {
          return (
            <Link key={idx} to={localRoute} className="notion-link">
              {content}
            </Link>
          );
        }

        return (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="notion-link"
          >
            {content}
          </a>
        );
      }
      
      return <React.Fragment key={idx}>{content}</React.Fragment>;
    });
  };

  blocks.forEach((block, idx) => {
    const { type, richText, icon, title } = block;

    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const listType = type === 'bulleted_list_item' ? 'ul' : 'ol';
      if (!currentList || currentList.type !== listType) {
        if (currentList) {
          renderBlocks.push(currentList.element);
        }
        currentList = {
          type: listType,
          items: [],
          element: null
        };
      }
      currentList.items.push(
        <li key={idx} className="notion-list-item">
          {renderRichText(richText, true)}
        </li>
      );
    } else {
      if (currentList) {
        const ListTag = currentList.type;
        const items = [...currentList.items];
        renderBlocks.push(
          <ListTag key={`list-${idx}`} className={`notion-list notion-${currentList.type}`}>
            {items}
          </ListTag>
        );
        currentList = null;
      }

      switch (type) {
        case 'paragraph':
          if (richText && richText.length > 0 && richText.some(r => r.text.trim() !== '')) {
            renderBlocks.push(
              <p key={idx} className="notion-paragraph">
                {renderRichText(richText)}
              </p>
            );
          }
          break;
        case 'heading_1':
          renderBlocks.push(
            <h1 key={idx} className="notion-h1">
              {renderRichText(richText)}
            </h1>
          );
          break;
        case 'heading_2':
          renderBlocks.push(
            <h2 key={idx} className="notion-h2">
              {renderRichText(richText)}
            </h2>
          );
          break;
        case 'heading_3':
          renderBlocks.push(
            <h3 key={idx} className="notion-h3">
              {renderRichText(richText)}
            </h3>
          );
          break;
        case 'quote':
          renderBlocks.push(
            <blockquote key={idx} className="notion-quote">
              {renderRichText(richText)}
            </blockquote>
          );
          break;
        case 'callout':
          renderBlocks.push(
            <div key={idx} className="notion-callout">
              {icon && <span className="notion-callout-icon">{icon}</span>}
              <div className="notion-callout-content">
                {renderRichText(richText)}
              </div>
            </div>
          );
          break;
        case 'divider':
          renderBlocks.push(<hr key={idx} className="notion-divider" />);
          break;
        case 'child_page':
          const targetRoute = getRouteForTitle(title);
          if (targetRoute) {
            // Determine emoji based on slug
            let pageEmoji = '📄';
            if (targetRoute.includes('taking-action')) pageEmoji = '⚡';
            if (targetRoute.includes('discipline')) pageEmoji = '⚔️';
            if (targetRoute.includes('mental-health')) pageEmoji = '🪩';
            
            renderBlocks.push(
              <Link key={idx} to={targetRoute} className="notion-child-page-card">
                <span className="notion-child-page-emoji">{pageEmoji}</span>
                <div className="notion-child-page-info">
                  <h3>{title}</h3>
                  <p>Deep dive into this section →</p>
                </div>
                <div className="notion-child-page-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          }
          break;
        default:
          break;
      }
    }
  });

  if (currentList) {
    const ListTag = currentList.type;
    renderBlocks.push(
      <ListTag key="list-final" className={`notion-list notion-${currentList.type}`}>
        {currentList.items}
      </ListTag>
    );
  }

  return <div className="notion-renderer">{renderBlocks}</div>;
}
