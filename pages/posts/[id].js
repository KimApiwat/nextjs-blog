import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostsID,getPostDataContent } from '../../lib/posts';
import Head from 'next/head';

/**  Generates `/posts/[id]` for use dynamic routes
 * 
 * $paths contains the array of known paths return by getAllPostsID()
 * which include the params key defined by pages/posts/[id].js
 * @return : A List of post id
 *
 **/
export async function getStaticPaths() {
    const paths = getAllPostsID();
    console.log(paths);
    return {
        paths,
        fallback :false, // can also be true or 'blocking'
    }
}


// `getStaticPaths` require using `getStaticProps`
export async function getStaticProps({params}) {
    const postDataContent = await getPostDataContent(params.id)
    // console.log(postDataContent)
    return {
        //Passed to the page component as props
        props: postDataContent,
    }
}

export default function Post(postDataContent) {
    // Render Post ... 
    // console.log(postDataContent)
    return (
        <>
            <Layout>
                <Head>
                    <title>{postDataContent.title}</title>
                </Head>
                <br/>
                Title : {postDataContent.title}
                <br/>
                Date : 
                <Date dateString={postDataContent.date} />
                <br/>
                Content :
                <br/>
                <div dangerouslySetInnerHTML={{__html: postDataContent.contentHtml}}/>
            </Layout>

        </>
    )
}