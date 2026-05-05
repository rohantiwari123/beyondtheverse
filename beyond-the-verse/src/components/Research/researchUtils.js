export const getResearchTimestamp = (research) => {
  const value = research?.createdAt;
  if (!value) return 0;
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (typeof value.toDate === 'function') return value.toDate().getTime();
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const formatResearchDate = (research) => {
  const timestamp = getResearchTimestamp(research);
  if (!timestamp) return 'Draft era';

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(timestamp));
};

export const getResearchWordCount = (research) => {
  const text = `${research?.abstract || ''} ${research?.body || ''}`.trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
};

export const getResearchReadTime = (research) => {
  const words = getResearchWordCount(research);
  return Math.max(1, Math.ceil(words / 180));
};

export const getResearchSources = (research) => {
  return Array.isArray(research?.sources)
    ? research.sources.filter(source => source && source.trim() !== '')
    : [];
};

export const getResearchTags = (research) => {
  if (Array.isArray(research?.tags)) return research.tags.filter(Boolean);
  if (typeof research?.tags === 'string') {
    return research.tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return [];
};

export const getResearchExcerpt = (research, limit = 190) => {
  const text = (research?.abstract || research?.body || '').replace(/\s+/g, ' ').trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trim()}…`;
};
