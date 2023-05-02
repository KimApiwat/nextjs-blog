// Next component : Link
// Layout Component
import Head from 'next/head';
// Adding Third Party JavaScript

// Import Layout
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
        <Layout firstpost>
                <Head>
                    <title>First Post</title>
                </Head>
                <div>
                    <h1 className="text-sky-400 text-5xl">
                        My First Post Page
                    </h1>
                </div>
        </Layout>
    )
}