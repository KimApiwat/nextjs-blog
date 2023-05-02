import fs from 'fs';
import path from 'path';

/*Gray matter let us parse the metadata in each markdown file */
import matter from  'gray-matter';

import { remark } from 'remark';
import html from 'remark-html';

/** 
   * process.cwd() return the current working directory
*/
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // console.log(postsDirectory)
    // Get file names under /posts
    const filenamesList = fs.readdirSync(postsDirectory);
    // console.log(filenamesList)

    const allPostsData = filenamesList.map((filename) => {
        // get file id from filename
        const id = filename.replace(/\.md$/, '');
        // console.log(id);

        const fullpath = path.join(postsDirectory, filename);
        // console.log(fullpath)

        const fileContents = fs.readFileSync(fullpath, 'utf8');

        const matterResult = matter(fileContents)
        // console.log(matterResult)

        return {
            id,
            ...matterResult.data,
        }
    })
    // console.log(allPostsData);
    return allPostsData.sort((a, b) => {
        if(a.date < b.date) {
            return 1;
        }else {
            return -1;
        }
    })
}
/**
 * 
 * @return array of objects. Each object must have $params:key and object with $id:key
 * (because we're using [id] in the filename [id].js /posts/[id]) 
 */
export function getAllPostsID() {
    const postFilenameList = fs.readdirSync(postsDirectory);
    const allPostsID = postFilenameList.map((filename) => {
        const id = filename.replace(/\.md$/, '')
        return {
            params : {
                id,
            }
        }
    })
    // console.log(allPostsID)
    return allPostsID
}

export async function getPostDataContent(id) {
    const fullPath = path.join(postsDirectory,`${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedPostContent = await remark().use(html).process(matterResult.content);
    // console.log(processedPostContent)
    const contentHtml = processedPostContent.toString();
    return {
        id,
        contentHtml,
      ...matterResult.data,
    }
}
