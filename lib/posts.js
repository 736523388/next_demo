import fs from 'fs'
import path, { resolve } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  // const allPostsData = fileNames.map(fileName => {
  //   // Remove ".md" from file name to get id
  //   const id = fileName.replace(/\.md$/, '')

  //   // Read markdown file as string
  //   const fullPath = path.join(postsDirectory, fileName)
  //   const fileContents = fs.readFileSync(fullPath, 'utf8')

  //   // Use gray-matter to parse the post metadata section
  //   const matterResult = matter(fileContents)

  //   // 将markdown转换为HTML
  //   const processedContent = await remark().use(html).process(matterResult.content)
  //   const contentHtml = processedContent.toString()

  //   // Combine the data with the id
  //   return {
  //     id,
  //     contentHtml,
  //     ...matterResult.data
  //   }
  // })

  const allPostsData = await new Promise((resolve) => {
    for (var index in fileNames) {
      (async function (index, fileName) {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')


        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)
        // 将markdown转换为HTML
        const processedContent = await remark().use(html).process(matterResult.content)
        const contentHtml = processedContent.toString()
        fileNames[index] = {
          id,
          contentHtml,
          content: matterResult.content,
          ...matterResult.data
        }
        if (parseInt(index) === fileNames.length - 1) {
          resolve(fileNames)
        }
        // console.log('---',self.activityList)
      })(index, fileNames[index])
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
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