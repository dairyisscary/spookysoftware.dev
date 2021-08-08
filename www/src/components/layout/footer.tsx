import NewTabLink from "@/components/new-tab-link";

function Footer() {
  const thisYear = new Date().getFullYear();
  const start = 2019;
  const extra = thisYear > start ? `${start}-${thisYear}` : start;
  return (
    <footer className="flex items-center mb-8">
      <div className="flex-1 text-sm pr-4">
        <div>&copy; Eric Kim-Butler {extra}</div>
        <div>
          Built with{" "}
          <NewTabLink href="https://github.com/dairyisscary/spookysoftware.dev">
            open-source
          </NewTabLink>{" "}
          and love.
        </div>
      </div>
      <div className="flex items-center w-32">
        <NewTabLink href="/rss.xml" className="flex-1 mr-4">
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle className="fill-current" cx="3.429" cy="20.571" r="3.429" />
            <path
              className="fill-current"
              d="m11.429 24h4.57c0-8.821-7.178-15.999-15.999-16v4.572c6.302.001 11.429 5.126 11.429 11.428z"
            />
            <path
              className="fill-current"
              d="m24 24c0-13.234-10.766-24-24-24v4.571c10.714 0 19.43 8.714 19.43 19.429z"
            />
          </svg>
        </NewTabLink>
        <NewTabLink
          href="https://github.com/dairyisscary"
          className="flex-1 mr-4"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path
              className="fill-current"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </NewTabLink>
        <NewTabLink
          href="https://www.youtube.com/channel/UCuRHr-1aqro-UWcz36hkdoQ/"
          className="flex-1 mr-4"
        >
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>YouTube</title>
            <path
              className="fill-current"
              d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"
            />
          </svg>
        </NewTabLink>
      </div>
    </footer>
  );
}

export default Footer;
