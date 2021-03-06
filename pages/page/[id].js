import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import Paginate from '../../components/paginate'
import Date from '../../components/date'
import { getSortedPostsData, getSortedPostsPages } from '../../lib/posts'

export default function Page({ allPostsData, postsPages, page }) {
    return (
        <Layout home>
            <div>

                <Head>
                    <title>测试demo</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <section>
                    <ul>
                        {allPostsData.map(({ id, date, title, thumb, contentHtml }) => (
                            <li className="mt-2" key={id}>
                                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                                    <div className="md:flex">
                                        <div className="md:flex-shrink-0">
                                            <img className="h-48 w-full object-cover md:w-48" src={thumb} alt="Man looking at item at a store" />
                                        </div>
                                        <div className="pl-8 pr-8 pt-4 pb-4 max-h-48 overflow-hidden">
                                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"><Date dateString={date} /></div>
                                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                                <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
                                            </Link>
                                            <div className="mt-2 text-gray-500 overflow-ellipsis overflow-hidden max-h-20 text-sm" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                                            {/* <p className="mt-2 text-gray-500 overflow-ellipsis overflow-hidden max-h-20 text-sm">{content}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Paginate prev={postsPages.prev} next={postsPages.next} page={page}></Paginate>
                </section>
            </div>
        </Layout>
    )
}
export async function getStaticPaths() {
    const paths = getSortedPostsPages()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const allPostsData = await getSortedPostsData(params.id)
    const postsPages = {prev: true, next: false}
    return {
        props: {
            allPostsData,
            postsPages,
            page: params.id
        }
    }
}