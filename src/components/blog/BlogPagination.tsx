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
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={`${localePath}/posts?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium text-blue bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple transition-colors"
        >
          {locale === 'de' ? 'Zurück' : 'Previous'}
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
          {locale === 'de' ? 'Zurück' : 'Previous'}
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
            className="px-4 py-2 text-sm font-medium bg-purple text-white rounded-lg shadow-md"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`${localePath}/posts?page=${page}`}
            className="px-4 py-2 text-sm font-medium text-blue bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple transition-colors"
          >
            {page}
          </Link>
        )
      ))}

      {/* Last page + ellipsis if needed */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
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
          className="px-4 py-2 text-sm font-medium text-blue bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple transition-colors"
        >
          {locale === 'de' ? 'Weiter' : 'Next'}
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
          {locale === 'de' ? 'Weiter' : 'Next'}
        </span>
      )}
    </div>
  );
}
