import Link from 'next/link'
import Head from 'next/head'

const name = 'Forska'
export const siteTitle = 'Next.js Sample Website'

function Layout({ children, home }) {
  return (
    <div className="container mx-auto px-3 box-border">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        {home ? (
          <>
            <figure className="mdbg-gray-100 rounded-xl p-8">
              <img className="w-32 h-32 rounded-full mx-auto" src="/images/1352856_forska_1578949570.png" alt="" width="384" height="512" />
              <div className="pt-6 text-center space-y-4">
                <blockquote>
                  <p className="text-lg font-semibold">
                    “Tailwind CSS is the only framework that I've seen scale
                    on large teams.It’s easy to customize, adapts to any design,
                    and the build size is tiny.”
                  </p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-cyan-600">
                    {name}
                  </div>
                  <div className="text-gray-500">
                    Staff Engineer, Algolia
                  </div>
                </figcaption>
              </div>
            </figure>
          </>
        ) : (
          <>
            <figure className="mdbg-gray-100 rounded-xl p-8">
              <Link href="/">
                <a>
                  <img className="w-32 h-32 rounded-full mx-auto" src="/images/1352856_forska_1578949570.png" alt="" width="384" height="512" />
                </a>
              </Link>

              <div className="pt-6 text-center space-y-4">
                <blockquote>
                  <p className="text-lg font-semibold">
                    “Tailwind CSS is the only framework that I've seen scale
                    on large teams.It’s easy to customize, adapts to any design,
                    and the build size is tiny.”
                  </p>
                </blockquote>
                <figcaption className="font-medium">
                  <Link href="/">
                    <a className="text-cyan-600">
                      {name}
                    </a>
                  </Link>

                  <div className="text-gray-500">
                    Staff Engineer, Algolia
                  </div>
                </figcaption>
              </div>
            </figure>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout