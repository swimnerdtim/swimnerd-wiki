import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const wikiDir = '../wiki';
const outputFile = './src/wikiData.json';

const categoryMap = {
  'coaches/bob-bowman': 'Bob Bowman',
  'technique': 'Technique',
  'workouts': 'Workouts',
  'coaching': 'Coaching',
  'mental': 'Mental',
  'racing': 'Racing',
  'methodology': 'Methodology'
};

function getCategory(filePath) {
  for (const [key, value] of Object.entries(categoryMap)) {
    if (filePath.includes(key)) return value;
  }
  return 'General';
}

function getFileSize(content) {
  const kb = Math.round(content.length / 1024);
  return `${kb}KB`;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : 'Untitled';
}

function extractDescription(content) {
  // Get first paragraph after title
  const lines = content.split('\n');
  let foundTitle = false;
  for (const line of lines) {
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('**') && !line.startsWith('-')) {
      return line.trim().substring(0, 150) + (line.length > 150 ? '...' : '');
    }
  }
  return 'No description available';
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (file.endsWith('.md') && !file.startsWith('INDEX') && !file.startsWith('DOC_') && !file.startsWith('WIKI_')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function buildWikiData() {
  const wikiPath = path.resolve(wikiDir);
  const markdownFiles = walkDir(wikiPath);
  
  const articles = markdownFiles.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(wikiPath, filePath);
    
    return {
      path: relativePath,
      category: getCategory(relativePath),
      title: extractTitle(content),
      description: extractDescription(content),
      size: getFileSize(content),
      content: content,
      contentHtml: marked(content)
    };
  });

  const wikiData = {
    lastUpdated: new Date().toISOString().split('T')[0],
    stats: {
      totalPages: articles.length,
      totalSize: '188KB'
    },
    articles: articles
  };

  fs.writeFileSync(outputFile, JSON.stringify(wikiData, null, 2));
  console.log(`✅ Built wiki data: ${articles.length} articles`);
  articles.forEach(a => console.log(`   - ${a.category}: ${a.title}`));
}

buildWikiData();
