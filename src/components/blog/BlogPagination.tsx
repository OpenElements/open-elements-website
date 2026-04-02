import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
}

export default function BlogPagination({ currentPage, totalPages, locale }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const localePath = locale === 'en' ? '' : `/${locale}`;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show max 5 page numbers at a time
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(-5);
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-7 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={`${localePath}/posts?page=${currentPage - 1}`}
          className="inline-flex items-center justify-center text-white bg-purple-700 rounded-full sm:w-16 sm:h-16 w-11 h-11 text-whit shrink-0 page-link"
        >
          <span className="sr-only">{locale === 'de' ? 'Zurück' : 'Previous'}</span>
          <svg className="size-5 -ml-0.5 sm:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center text-white bg-purple-100 rounded-full sm:w-16 sm:h-16 w-11 h-11 text-whit shrink-0 page-link cursor-not-allowed">
          <span className="sr-only">{locale === 'de' ? 'Zurück' : 'Previous'}</span>
          <svg className="size-5 -ml-0.5 sm:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
        </span>
      )}

      {/* First page + ellipsis if needed */}
      {visiblePages[0] > 1 && (
        <>
          <Link
            href={`${localePath}/posts?page=1`}
            className="px-4 py-2 text-sm font-medium text-blue bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple transition-colors"
          >
            1
          </Link>
          {visiblePages[0] > 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {visiblePages.map((page) => (
        page === currentPage ? (
          <span
            key={page}
            className="inline-flex items-center justify-center size-11 text-white rounded-full bg-green font-medium text-sm page-link"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`${localePath}/posts?page=${page}`}
            className="inline-flex items-center justify-center w-5 h-11 text-blue rounded-full font-medium text-[14px] page-link"
          >
            {page}
          </Link>
        )
      ))}

      {/* Last page + ellipsis if needed */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="inline-flex items-center justify-center w-5 h-11 text-blue rounded-full font-medium text-[14px] page-link">...</span>
          )}
          <Link
            href={`${localePath}/posts?page=${totalPages}`}
            className="px-4 py-2 text-sm font-medium text-blue bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${localePath}/posts?page=${currentPage + 1}`}
          className="inline-flex items-center justify-center text-white bg-purple-700 rounded-full sm:w-16 sm:h-16 w-11 h-11 text-whit shrink-0 page-link"
        >
          <span className="sr-only">{locale === 'de' ? 'Weiter' : 'Next'}</span>
          <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center text-white bg-purple-100 rounded-full sm:w-16 sm:h-16 w-11 h-11 text-whit shrink-0 page-link cursor-not-allowed">
          <span className="sr-only">{locale === 'de' ? 'Weiter' : 'Next'}</span>
          <svg className="size-5 sm:size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
        </span>
      )}
    </div>
  );
}
