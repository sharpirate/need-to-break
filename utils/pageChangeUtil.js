import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DIRECTIONS, PRE_LOGIN_PAGES, PROTECTED_PAGES } from "./constants";

export function isProtectedPage(url) {
  return Boolean(PROTECTED_PAGES.find(page => page.url === url))
}

export function isPreLoginPage(url) {
  return Boolean(PRE_LOGIN_PAGES.find(page => page.url === url))
}

function getPagesByUrl(url) {
  if (isProtectedPage(url)) {
    return PROTECTED_PAGES;
  } else if (isPreLoginPage(url)) {
    return PRE_LOGIN_PAGES;
  } else {
    return null;
  }
}

function isSameContext(prevUrl, nextUrl) {
  return isProtectedPage(prevUrl) === isProtectedPage(nextUrl) || isPreLoginPage(prevUrl) === isPreLoginPage(nextUrl);
}

export function usePageChange() {
  const router = useRouter();
  const currentUrl = router.pathname;
  const [page, setPage] = useState({ direction: DIRECTIONS.none, url: '' });

  useEffect(() => {
    if (page.url) {
      router.push(page.url);
    }
  }, [page]);

  function pushPage(url, slideDirection) {
    let direction;

    if (slideDirection) {
      direction = slideDirection;
    } else if (!isSameContext(currentUrl, url)) {
      direction = DIRECTIONS.none;
    } else {
      const pages = getPagesByUrl(url);

      const currentIndex = pages.findIndex(page => page.url === currentUrl);
      const nextIndex = pages.findIndex(page => page.url === url);

      direction = (nextIndex - currentIndex) > 0 ? DIRECTIONS.right : DIRECTIONS.left;  
    }

    setPage({
      url,
      direction
    });
  }

  return { page, pushPage };
}