import Head from 'next/head';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import Date from '../components/date'
import Layout, {siteTitle} from '../components/layout'

import { getSortedPostsData} from '../lib/posts';
/*
  @params {props}: allPostsData
*/
export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>this is sample website building by Next.js</p>
      </section>
      <main>
        <h1 className={styles.title}>
          <Link href="/posts/first-post">My Post</Link>
        </h1>
        <section>
            <div className='text-center'>
              <h2 className="text-red-700 text-3xl">My Blog</h2>
            </div>
            <div>
              <ul>
                {allPostsData.map(({id,title,date}) =>(
                  <>
                    <li key={id}>
                      <Link href={`/posts/${id}`}>{title}</Link>
                      <br/>
                      <Date dateString={date}/>
                      <br/>
                    </li>
                    <br/>
                  </>
                ))}
              </ul>
            </div>
        </section>
      </main>
    </Layout>
  )
}
/*
  * this function tell Next.js "Hey, this page has some data dependencies"
  * getStaticProps run at buld time in production.
  * Inside this function, you can fetch external data and send it as props to the page
  @return props : 
*/
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = getSortedPostsData();
  // const allPostsID = getAllPostsID();
  // console.log(allPostsID)
  // The value of the `props` key will be Passed to the `Home` Component
  return {
    props: {
      allPostsData,
    }
  }
}
