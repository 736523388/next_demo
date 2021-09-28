import fs from 'fs'
import path, { resolve } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
const pageSize = 2;
export function getSortedPostsPages() {
  const fileNames = fs.readdirSync(postsDirectory)
  let pages = [1];
  if (fileNames.length > pageSize) {
    let total = Math.ceil(fileNames.length / pageSize)
    for (let i = 2; i <= total; i++) {
      pages.push(i)
    }
  }
  return pages.map(id => {
    return {
      params: {
        id: id + ''
      }
    }
  })
}
export async function getSortedPostsData(page) {
  console.log(page)
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      content: matterResult.content,
      ...matterResult.data
    }
  })
  let start = (page - 1) * pageSize
  let end = page * pageSize
  const postList = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  }).slice(start, end)
  return await new Promise((resolve) => {
    for (var index in postList) {
      (async function (index, item) {
        // 将markdown转换为HTML
        const processedContent = await remark().use(html).process(item.content)
        const contentHtml = processedContent.toString()

        postList[index] = Object.assign(postList[index], { contentHtml })
        if (parseInt(index) === postList.length - 1) {
          resolve(postList)
        }
        // console.log('---',self.activityList)
      })(index, postList[index])
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 解析post元数据部分
  const matterResult = matter(fileContents)

  // 将markdown转换为HTML
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}